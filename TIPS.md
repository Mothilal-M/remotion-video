# Remotion — Tips, Tricks & Hacks

Curated from official docs + community write-ups (April 2026). Reference these while building.

## Setup recap

- Node 16+ (we have v24). Studio: `npm run studio`. Render: `npm run render -- Main out/video.mp4`.
- Skills live in `.claude/skills/` and are pinned via `skills-lock.json`. Update with `npx remotion skills update` (Windows note below).
- **Windows + Node 24 quirk:** `remotion skills add/update` can fail with `spawn EINVAL`. Workaround: invoke `npx -y skills@1.2.0 update remotion-dev/skills` directly.

## Animation rules of thumb

1. **Every animation must derive from `useCurrentFrame()`.** CSS transitions/`@keyframes` cause flicker because the headless renderer takes one snapshot per frame.
2. **`spring()` over `interpolate()` for natural motion.** Tune with `{damping, stiffness, mass}`. `damping: 200` = snappy stop, `12` = bouncy.
3. **`extrapolateLeft/Right: 'clamp'`** on every `interpolate` unless you actually want over/undershoot. Saves a class of bugs.
4. **Delay an animation** by passing `frame - delay` into `spring`/`interpolate`, not by wrapping in setTimeout.
5. **Combine spring + interpolate**: spring → 0..1, then interpolate that to your real range. Cleaner than fighting spring config.
6. **fps-independence**: when using `Sequence`/`spring`, pass `fps` from `useVideoConfig()` so the same code works at 30/60.
7. Inside `<Sequence from={N}>`, `useCurrentFrame()` is **relative** to the sequence start — not the global frame.

## Composition structure

- `<AbsoluteFill>` for full-screen layers; stack them like Photoshop.
- `<Series>` for sequential scenes (auto-offsets `from`). `<Sequence>` for manual control / overlap.
- `<Loop>` to repeat a child `durationInFrames` worth of content.
- Use `defaultProps` on `<Composition>` so Studio shows live-editable controls in the Props panel.
- Type props with `z.object({...})` from `@remotion/zod-types` to get a Studio form UI for free.

## Performance

- **Concurrency is not "more = faster".** Run `npx remotion benchmark` to find the sweet spot (usually ~half your cores).
- **JPEG sequence renders ~2× faster than PNG.** Only use PNG if you need transparency in the intermediate.
- **Avoid VP8/VP9** for previews — slow encoder. Use H.264 unless you specifically need WebM.
- **`<OffthreadVideo>`** for embedded video (renders frame-accurately off the main thread). Native `<video>` will desync.
- **`useMemo`** for expensive per-frame computation (parsing JSON, geometry, etc.). Each frame remounts cheaply but recomputation adds up over thousands of frames.
- **`--scale=0.5`** for draft renders. Quarter the pixels = ~4× faster.
- **`--log=verbose`** prints slowest frames so you can target the hot ones.
- **Cloud / no-GPU machines**: avoid WebGL, heavy filters, big blurs. Pre-render to images and `<Img>` them in.
- **Lambda** (`@remotion/lambda`) for parallel cloud rendering — splits frames across Lambda invocations, ~10× faster than local for long videos.

## Workflow hacks

- **Single-frame sanity check** before a full render:
  `npx remotion still remotion/index.ts Main out.png --frame=30 --scale=0.25`
- **Range render** while iterating: `--frames=0-60` instead of full timeline.
- **Studio "Render" button** uses the same renderer as CLI but lets you tweak props live first.
- **Hot reload** works for everything except `registerRoot` — restart Studio if you touch `index.ts`.
- **Inspect hangs / black frames**: add `<Sequence layout="none">` boundaries to bisect which scene breaks.
- **`delayRender()` / `continueRender()`** to gate the frame on async data (fonts, API). Forgetting `continueRender` = timeout.
- **Fonts**: use `@remotion/google-fonts` — it `delayRender`s for you and avoids font-flash.

## Asset pipeline

- Assets in `public/` are served at `/your-file.png` and rendered deterministically. Don't import binary assets through bundler.
- For audio, use `<Audio>` + `staticFile('song.mp3')`. Trim with `startFrom`/`endAt`. Volume can be a function of frame for fades.
- `@remotion/media-utils` → `getAudioDurationInSeconds`, `visualizeAudio` for waveforms, `getVideoMetadata`.

## Less-known features

- **`@remotion/transitions`** — pre-built scene transitions (slide, fade, wipe, flip, clockWipe).
- **`@remotion/shapes`** — `<Triangle>`, `<Star>`, `<Pie>` with animated paths.
- **`@remotion/paths`** — interpolate between SVG paths, `evolvePath` for write-on effects.
- **`@remotion/noise`** — deterministic Perlin noise, useful for organic motion.
- **`@remotion/three`** — `<ThreeCanvas>` synced to Remotion's frame clock (don't use raw `useFrame` from r3f).
- **`@remotion/lottie`** — drop in After Effects exports.
- **`@remotion/captions`** + Whisper for auto-subtitles.
- **`<Freeze frame={N}>`** to pause time for a child subtree (good for "pause on this frame" beats).
- **Render an MP4 + transparent WebM** in one pass with `--codec=vp8` + alpha for overlays.
- **Parameterized renders**: `--props='{"title":"Hi"}'` or `--props=./props.json` for batch generation.

## Common gotchas

- Studio looks fine but render is black → you used a CSS animation. Convert to frame-driven.
- Audio out of sync → using `<video>` instead of `<OffthreadVideo>` / `<Video>`.
- `Math.random()` differs per frame → use a seeded RNG (e.g. `random()` from `remotion`).
- `Date.now()` / `new Date()` non-deterministic → forbidden inside compositions.
- Missing fonts on render but fine in Studio → didn't `waitUntilDone()` / `delayRender` the font load.

## Sources

- [Remotion docs — Performance](https://www.remotion.dev/docs/performance)
- [Remotion docs — Brownfield install](https://www.remotion.dev/docs/brownfield)
- [Remotion docs — Skills](https://www.remotion.dev/docs/cli/skills)
- [Remotion docs — useCurrentFrame](https://www.remotion.dev/docs/use-current-frame)
- [Remotion docs — interpolate](https://www.remotion.dev/docs/interpolate)
- [Remotion docs — spring](https://www.remotion.dev/docs/spring)
- [Remotion docs — Multiple FPS](https://www.remotion.dev/docs/multiple-fps)
- [skills.sh — remotion-best-practices](https://skills.sh/remotion-dev/skills/remotion-best-practices)
- [dplooy — Claude Code Video with Remotion 2026](https://www.dplooy.com/blog/claude-code-video-with-remotion-best-motion-guide-2026)
- [gaga.art — Remotion Skills 2026](https://gaga.art/blog/remotion-skills/)
