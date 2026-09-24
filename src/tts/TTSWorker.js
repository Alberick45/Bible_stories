import { KokoroTTS } from 'kokoro-js';

let tts = null;
let isGenerating = false;
let pendingQueue = [];
let currentSceneId = 1;
self.scenes = {};

// --- DB helpers (self-contained inside worker to avoid import issues) ---
const DB_NAME = 'ThresholdAudioCache';
const DB_VERSION = 1;

async function getDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onerror = () => reject(req.error);
    req.onsuccess = () => resolve(req.result);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('audioCache')) {
        db.createObjectStore('audioCache', { keyPath: 'key' });
      }
    };
  });
}

async function idbGet(store, key) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbSet(store, entry) {
  const db = await getDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).put(entry);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

// WAV Duration helper
function measureWavDuration(arrayBuffer) {
  try {
    const view = new DataView(arrayBuffer);
    const riff = String.fromCharCode(view.getUint8(0), view.getUint8(1), view.getUint8(2), view.getUint8(3));
    const wave = String.fromCharCode(view.getUint8(8), view.getUint8(9), view.getUint8(10), view.getUint8(11));
    if (riff !== 'RIFF' || wave !== 'WAVE') {
      return 3000; // fallback default
    }
    
    let pos = 12;
    let byteRate = 44100;
    let dataSize = 0;
    
    while (pos < view.byteLength - 8) {
      const chunkId = String.fromCharCode(view.getUint8(pos), view.getUint8(pos+1), view.getUint8(pos+2), view.getUint8(pos+3));
      const chunkSize = view.getUint32(pos + 4, true);
      
      if (chunkId === 'fmt ') {
        byteRate = view.getUint32(pos + 8 + 8, true);   // bytes 28-31
      } else if (chunkId === 'data') {
        dataSize = chunkSize;
        break;
      }
      pos += 8 + chunkSize;
    }
    
    if (dataSize === 0) {
      dataSize = view.byteLength - 44;
    }
    return Math.round((dataSize / byteRate) * 1000);
  } catch (e) {
    console.warn('[Worker] Failed to parse WAV duration:', e);
    return 3000; // fallback
  }
}

self.onmessage = async (e) => {
  const { type } = e.data;

  if (type === 'INIT') {
    try {
      tts = await KokoroTTS.from_pretrained(
        'onnx-community/Kokoro-82M-v1.0-ONNX',
        {
          dtype: 'q4',
          device: 'webgpu',
          cache_dir: 'biblical-tts-cache'
        }
      );
      // Warmup shader compile inside worker
      await tts.generate('In the beginning.', { voice: 'af_heart', speed: 1.0 });
      self.postMessage({ type: 'INIT_DONE' });
    } catch (err) {
      console.error('[Worker] Init failed:', err);
      self.postMessage({ type: 'INIT_FAILED', error: err.message });
    }
    return;
  }

  if (type === 'SET_SCENE_LIST') {
    self.scenes = e.data.scenes;
    return;
  }

  if (type === 'REPRIORITIZE') {
    currentSceneId = e.data.currentSceneId;
    sortQueue();
    if (!isGenerating) pumpQueue();
    return;
  }

  if (type === 'GENERATE') {
    const idx = pendingQueue.indexOf(e.data.sceneId);
    if (idx > -1) pendingQueue.splice(idx, 1);
    pendingQueue.unshift(e.data.sceneId); // High priority
    if (!isGenerating) pumpQueue();
  }
};

function sortQueue() {
  pendingQueue.sort((a, b) => {
    const da = Math.abs(a - currentSceneId);
    const db = Math.abs(b - currentSceneId);
    return da - db;
  });
}

async function pumpQueue() {
  if (!tts) return;
  if (pendingQueue.length === 0) {
    // Auto-fill from scenes
    const candidates = Object.values(self.scenes)
      .filter(s => s.status === 'idle')
      .sort((a, b) => Math.abs(a.id - currentSceneId) - Math.abs(b.id - currentSceneId));

    if (candidates.length === 0) return;
    pendingQueue = candidates.map(c => c.id);
  }

  const sceneId = pendingQueue.shift();
  const scene = self.scenes[sceneId];
  if (!scene || scene.status !== 'idle') {
    pumpQueue();
    return;
  }

  isGenerating = true;
  scene.status = 'generating';

  try {
    const cached = await idbGet('audioCache', scene.cacheKey);
    if (cached) {
      scene.status = 'ready';
      self.postMessage({ type: 'READY', sceneId, durationMs: cached.durationMs, fromCache: true });
    } else {
      const rawAudio = await tts.generate(scene.text, {
        voice: scene.voice,
        speed: scene.speed || 1.0,
      });

      const wavBlob = await rawAudio.toBlob();
      const buffer = await wavBlob.arrayBuffer();
      const durationMs = measureWavDuration(buffer);

      await idbSet('audioCache', {
        key: scene.cacheKey,
        buffer,
        durationMs,
        generatedAt: Date.now(),
        modelVersion: 'kokoro-q4-v1',
      });

      scene.status = 'ready';
      self.postMessage({ type: 'READY', sceneId, durationMs, fromCache: false });
    }
  } catch (err) {
    console.warn(`[Worker] Error generating scene ${sceneId}:`, err);
    scene.status = 'idle';
    self.postMessage({ type: 'ERROR', sceneId, error: err.message });
    await new Promise(r => setTimeout(r, 2000)); // wait before retrying
  }

  isGenerating = false;
  pumpQueue();
}
