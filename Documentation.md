# The Biblical Experience Engine — Project Documentation

*(Internal codename: Project Threshold. Externally, this is simply "a game project PK's building" — details stay inside the team until public launch.)*

---

## The Vision

An interactive, immersive 3D web experience that walks players through the full arc of scripture — from Genesis to Revelation — one narrative chapter at a time. Not a Bible app, not a reading tool: a *playable world*. Players walk through key historical events, interact with biblical characters, hear full voiced narration and dialogue, and read alongside verbatim KJV scripture as the story unfolds around them in 3D.

The final image: someone opens the Timeline Hub, picks a moment in scripture, and *steps into it* — watches Creation unfold across six days, stands in Eden as judgment falls, walks the ark's construction site in the rain, watches a tower rise and language shatter across a crowd. Scripture experienced, not just read.

---

## Where We Are Now

Five chapters are built and playable, covering the full primeval history of Genesis 1–11:

1. **Creation** (Genesis 1:1–2:7) — the Six Days rendered in 3D: light, sky, land, vegetation, celestial bodies, sea life, land animals, and the formation of Adam.
2. **Eden & The Fall** (Genesis 3) — the Garden, the Serpent in the Tree of Knowledge, Eve and the fruit, the sequential cursing, and the expulsion past the Cherubim and flaming sword.
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
- **Web Audio API** — procedurally generates atmospheric sound (wind, weather) per scene.
- **Web Speech API** — powers character voices and narration, each with distinct pitch/rate per character (God, Eve, Cain, Abel, Narrator, etc.).
- **Vanilla CSS** — the UI frame: gear-animated loading screen, glassmorphic overlays, timeline navigation.

Repo: https://github.com/Alberick45/Bible_stories.git

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