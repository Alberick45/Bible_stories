# The Biblical Experience Engine — Project Documentation

*(Internal codename: Project Threshold. Externally, this is simply "a game project PK's building" — details stay inside the team until public launch.)*

---

## The Vision

An interactive, immersive 3D web experience that walks players through the full arc of scripture — from Genesis to Revelation — one narrative chapter at a time. Not a Bible app, not a reading tool: a *playable world*. Players walk through key historical events, interact with biblical characters, hear full voiced narration and dialogue, and read alongside verbatim KJV scripture as the story unfolds around them in 3D.

The final image: someone opens the Timeline Hub, picks a moment in scripture, and *steps into it* — watches Creation unfold across six days, stands in Eden as judgment falls, walks the ark's construction site in the rain, watches a tower rise and language shatter across a crowd. Scripture experienced, not just read.

---

## Where We Are Now

Five chapters are built and playable, covering the full primeval history of Genesis 1–11:

1. **Creation** (Genesis 1:1–2:7) — the Six Days rendered in 3D: light, sky, land, vegetation, celestial bodies, sea life, land animals, and the formation of Adam. Includes the interactive Sabbath Creature Discovery Quest where Adam explores the newly created Earth, finding and observing 5 creatures (Lion 🦁, Sheep 🐑, Cow 🐂, Deer 🦌, Dove 🕊️) with raycast tap/click interaction and proximity auto-discovery, transitioning into the Garden of Eden 2 seconds upon completion.
2. **Eden & The Fall** (Genesis 2:8–3:24) — the Garden of Eden:
   - **Genesis 2:19-20 Animal Naming Quest**: When Adam is alone before Eve's creation, players are given a clear objective banner (`🎯 GOAL: Walk through Eden and name 5 creatures (0/5)`). Players walk around the garden to discover 5 distinct creatures (Lion 🦁, Lamb 🐑, Ox 🐂, Stag 🦌, Dove 🕊️). Players can click (mouse/laptop) or tap (mobile touch) on an animal using raycasting or approach within 3.8m. Adam faces the creature, gestures, and names it aloud (*"I name thee [creature]!"*), accompanied by a synthesized sacred triad chord chime (Web Audio API) and a 3D golden pill name tag sprite. Exactly 2 seconds after naming all 5 creatures, the narrative flows into the deep sleep of Adam and the miraculous formation of Eve.
   - **Tree of Knowledge Goal**: Later, players receive the goal to locate the Great Tree of Knowledge with pulsing forbidden fruit and the coiled serpent at the heart of Eden, triggering the Fall sequence.
   - **The Fall & Expulsion**: Eve taking the fruit, physical hiding among tree clusters, divine interrogation, sequential cursing, and expulsion past the golden Cherubim and spinning flaming sword.
3. **Cain & Abel** (Genesis 4:1–6:8) — the two altars of sacrifice, the confrontation in the fields, Abel's death, the Mark of Cain, and his exile to Nod.
4. **Noah's Ark** (Genesis 6:13–9:13) — the Ark's construction, gathering of animals, the flood itself with real rain/water physics, and the altar at Ararat.
5. **Tower of Babel** (Genesis 11:1–9) — the tower's construction, the confusion of language, and the silent ruins left behind.

Every chapter is reachable from the Timeline Hub, has full scripture text available in-scene (tap the scripture label to open the KJV scroll), voiced dialogue and narration via distinct character voices, and free player movement (WASD + mouse look) with real collision against scene objects.

**Known holes:** the Tower of Babel chapter is the most recently added and needs the most polish and testing. Beyond that, general bug-fixing and refinement passes are needed across the earlier chapters before we move forward with new content.

---

## How It's Built

- **Vite** — dev server and production bundler, with hot reload for fast iteration on scenes.
- **Three.js** — renders every 3D environment: terrain, characters, lighting, and collision.
- **GSAP** — drives cinematic camera movement, scripted transitions, and character animation.
- **Web Audio API** — procedurally generates atmospheric sound (wind, weather) per scene and scales real-time audio playback buffers.
- **Web Speech API & TTS Engine** — powers character voices and narration with character-specific acoustic parameters, cache persistence, and 1x/2x real-time rate scaling.
- **Vanilla CSS & Adaptive Design System** — powers the book opening animations, engraved cross loader, glassmorphic HUD overlays, safe-area-inset top bars, and responsive portrait/landscape reflows.

Repo: https://github.com/Alberick45/Bible_stories.git

---

## Mobile Ergonomics, Touch Architecture & Dynamic HUD

As part of the cross-platform mobile refinement pass:

1. **Orientation Guidance & Seamless Switching**:
   - Mobile users entering in portrait mode receive an orientation recommendation modal prompting them to rotate to **Landscape** for cinematic biblical immersion.
   - A dedicated **Orientation Toggle** (`📱 Portrait` / `🔄 Landscape`) in the top bar allows immediate toggling at any time, dynamically adjusting 3D camera aspect ratios and reflowing UI elements without page reloads.

2. **Context-Aware Control Trees (Narrative vs. Interactive)**:
   - **Narrative Scenes**: Subtitle cards, floating character speech bubbles, the on-screen **`Next ➔`** dialogue button, intro skip, and the voiceover speed multiplier (`1x`/`2x`) are active.
   - **Interactive Gameplay**: During character free-roam (e.g. Adam exploring Eden, herding pairs to the Ark, confronting Cain), narrative speed and skip buttons are automatically hidden. The screen transitions seamlessly to the virtual touch joystick and on-screen action bar (`Talk`, `Pray`, `Jump`, `Kick`, `Angry`).

3. **High-Contrast Speed Multiplier (`1x` / `2x`)**:
   - Speed toggle accelerates both the TTS speech rate and GSAP timeline scale concurrently, with real-time Web Audio API buffer adjustments.
   - When activated on `2x`, the button shifts to a high-contrast obsidian-bronze theme (`#241604` to `#0d0902`) with glowing amber borders and `#ffd700` golden typography (exceeding WCAG AAA contrast ratios across dark void and bright outdoor backgrounds).
   - When toggled back to `1x`, the button smoothly reverts to the standard translucent bronze glassmorphism.

4. **Zero-Overflow Mobile Top Bar**:
   - Navigation button labels automatically collapse on narrow/portrait screens (`🏛️ Hub`, `🔄 Land`, `1x`/`2x`, `⏭ Skip`), ensuring buttons fit neatly within 320px–420px viewports with zero horizontal overflow or clipping.

---

## The Team

- **PK** — lead / direction
- **Jessica** — animation / visual storytelling
- **Antoinette** — coordination / momentum
- **Emma** — web animation / interaction polish
- **Selorm** — technical / engine

Core team is filled. We're past recruiting — this is a shipping phase now.

---

## How We Work

- **Confidential until launch.** What this project is, and who's on it, stays inside the team. "Working on a game project" is fine to say publicly — specifics aren't, yet.
- **Weekly contribution.** Even small — a fix, a scene tweak, a piece of feedback. If nothing else is going on for you that week, put time here.
- **Communication over silence.** Stuck, behind, need to step back for a stretch — say so directly. Going quiet is the one thing that actually erodes trust on a small team.
- **Own your piece.** Everyone here was brought on for a specific strength the project needed — bring judgment and ideas in your area, not just execution.

---

## What's Next

**Immediate focus:** stabilize what's already built. Fix the known holes — starting with Babel, then a polish pass across all five chapters — before adding new narrative content. A working, bug-free five-chapter build is worth more right now than a sixth chapter bolted onto a shaky foundation.

**After that:** continue the narrative forward — the next natural arc moves from primeval history into the patriarchal narratives (Abraham onward).

**Milestone target:** a fully stable, polished build of all five current chapters (Creation through Tower of Babel) by **August 31, 2026**. This is a working target, not fixed in stone — but it gives us something concrete to aim for as a team.

---

*This is a living document — it'll be updated as the project moves forward.*