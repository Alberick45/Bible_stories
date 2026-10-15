# The Biblical Experience Engine

An interactive, immersive 3D web-based experience illustrating the scriptural accounts of the Holy Bible. Players can walk through key historical narratives, interact with biblical characters, and experience key historical event sequences accompanied by full voiceovers and scriptures.

---

## 🎮 Interactive Chapters

1. **Chapter 1: Genesis 1 &mdash; Creation**
   * Experience the Six Days of Creation in 3D.
   * Watch the formation of light, atmosphere, land, vegetation, celestial bodies, marine life, land beasts, and the final formation of Adam.
   * **Creation Creature Discovery Quest**: Walk across the newly created Earth as Adam on the Sabbath to seek out and discover 5 creatures (Lion 🦁, Sheep 🐑, Cow 🐂, Deer 🦌, Dove 🕊️). Click, tap, or approach them to record their names with sacred chime chords and 3D tags, seamlessly advancing into the Garden of Eden 2 seconds after completion.

2. **Chapter 2: Genesis 2-3 &mdash; Eden & The Fall**
   * **Genesis 2:19-20 Creature Naming Quest**: Walk through the lush garden as Adam alone before Eve is created. Seek out and name 5 distinct creatures (Lion 🦁, Lamb 🐑, Ox 🐂, Stag 🦌, Dove 🕊️) by clicking (laptop/mouse), tapping (mobile touch), or approaching them in close proximity. Watch Adam gesture, hear his proclamation, see 3D golden name tag pill badges appear above each animal to sacred chime chords, and watch the story flow 2 seconds later into Adam's deep sleep and Eve's creation.
   * **The Great Tree of Knowledge**: Journey to the center of Eden to locate the towering Tree of Knowledge with pulsing forbidden fruit and the coiled serpent to initiate the Fall.
   * Witness Adam and Eve's realization, their flight to physical hiding trees, the sequential cursing (Serpent, Eve, then Adam), and their expulsion past the golden Cherubims and spinning flaming sword.

3. **Chapter 3: Genesis 4 &mdash; Cain & Abel**
   * Experience the post-Eden lifestyle, the birth and growth of Cain and Abel, and their respective callings.
   * Witness the two altars of sacrifice (Abel's accepted with golden heavenly fire, Cain's smoldering with sideways smoke).
   * Follow the confrontation in the crop fields, the slaying of Abel, the divine interrogation, the Mark of Cain, and his exile to the land of Nod.

4. **Chapter 4: Genesis 6-9 &mdash; Noah's Ark**
   * Experience the gathering of animals, the construction of the Ark, dynamic flood rain and rising water physics, and the rainbow covenant altar atop Mount Ararat.

5. **Chapter 5: Genesis 11 &mdash; Tower of Babel**
   * Walk among the builders of Shinar as the monumental brick ziggurat ascends, witness the confusion of tongues, and discover the abandoned ruins scattered across the earth.

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v16+)
* npm (v8+)

### Installation & Run

1. Clone or copy the project files to your system.
2. In the terminal, install dependencies:
   ```bash
   npm install
   ```
3. Run the local development server:
   ```bash
   npm run dev
   ```
4. Open the displayed local address (e.g. `http://localhost:5173`) in your browser.

---

## 🎮 Controls & Interface

### Desktop Controls
* **Character Movement**: `W`, `A`, `S`, `D` or Arrow keys. Hold `Shift` to run.
* **Character Actions**: 
  * `[T]`: Talk / Speak
  * `[P]`: Pray
  * `[J]`: Jump
  * `[K]`: Kick
  * `[R]`: Express frustration / Angry
  * `[V]`: Toggle POV perspective
* **Creature Interaction (Questing)**: Click directly on creatures with the mouse or walk within 3.8m to record their names and advance objectives.
* **Camera Look**: Click and drag across the screen to orbit the camera 360°.
* **Dialogue Progression**: Click the **`Next ➔`** on-screen button or press `Space` to skip to the next narration line.
* **Scripture Scroll**: Click the scripture label at the bottom center to open the unabridged KJV scriptural scroll for the current chapter.

### Mobile & Touch Controls
* **Creature Tap Interaction**: Tap directly on creatures on touch screens to record and name them in Eden.
* **Orientation Guidance**: On phones, an orientation guidance prompt recommends rotating sideways to **Landscape** for maximum cinematic widescreen immersion, with a **Continue in Portrait** option.
* **Orientation Toggle**: Tap `📱 Portrait` / `🔄 Landscape` on the top bar at any time to seamlessly toggle between layouts.
* **Virtual Joystick**: Drag the bottom-left joystick knob to move characters smoothly in any direction.
* **Touch Camera Look**: Swipe with a single finger across the 3D scene to pan and look around.
* **Touch Action Bar**: Tap the bottom on-screen action buttons (`🗣️ Talk`, `🙏 Pray`, `⬆️ Jump`, `🦶 Kick`, `⚡ Angry`).
* **Next Dialogue**: Tap the **`Next ➔`** gold button to advance spoken voiceovers and subtitles.

---

## ⚡ Narrative Speed & Dynamic HUD

* **Narrative Speed Multiplier (1x / 2x)**:
  * Toggles spoken narrative speed between standard (1x) and accelerated (2x).
  * Automatically scales both the text-to-speech voice rate and GSAP cinematic camera/animation transitions simultaneously.
  * Real-time Web Audio API playback rate adjustments synchronize active speech buffers on the fly.
  * **High-Contrast Active State**: When set to `2x`, the button illuminates with a deep obsidian-bronze background, radiant amber border, and glowing gold badge for pristine readability across both deep cosmic void and bright daytime scenes. Toggling back to `1x` cleanly restores the original HUD glassmorphic style.
* **Context-Aware Adaptive Controls**:
  * **Narrative Scenes**: Subtitles, speech bubbles, `Next ➔` dialogue button, intro skip, and narration speed controls (`1x`/`2x`) are active.
  * **Interactive Scenes**: During free-roam character gameplay (e.g. Adam exploring Eden, Cain in the crop fields, Noah herding pairs into the Ark), the speed toggle and skip buttons automatically hide to maximize viewport clarity and eliminate clutter.
* **Mobile Overflow Protection**:
  * Top navigation items dynamically collapse on portrait screens (`🏛️ Hub`, `🔄 Land`, `1x`/`2x`, `⏭ Skip`), ensuring zero overflow or clipping regardless of screen size.
