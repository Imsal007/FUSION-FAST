# SAL Digital restaurant ads

Ads that send restaurant owners to the free demo on https://saldigital.co/lp/restaurants/

## What is here

| Path | What |
|---|---|
| `out/R1-CinderAndBun.mp4` ... `out/R7-FourDemos.mp4` | 7 reels, 1080x1920, 30fps, 15 to 19 seconds, with voiceover, music and sound effects |
| `out/stills/C1-*`, `C2-*`, `C3-*` | 3 carousels (6, 7 and 6 slides), 1080x1350 PNG |
| `out/stills/S1-*` ... `S4-*` | 4 single images, 1080x1350 PNG |
| `AD-COPY.md` | Primary text, headlines, descriptions and UTM tag for every ad, plus organic captions |
| `CAMPAIGN.md` | Meta setup for 5 GBP a day UK-wide, launch order, tests and pause rules |
| `reels/` | Remotion source for all of the above |

| Reel | Angle |
|---|---|
| R1 to R4 | One per demo: hook over the dish breakdown, the site in a phone, the order landing on WhatsApp, CTA |
| R5 | Commission maths from the landing page example (£2,000 a week at 30%) |
| R6 | "Nobody orders from a website that looks cheap": a generic tired site against a demo |
| R7 | Four demos in quick cuts, then "What's yours?" |

The demo restaurants are fictional and every creative says so on screen or in the copy.

## Safe zones

Reels are laid out for Meta's UI: key copy stays between 280px and 1250px from the top, 100px from the left and 170px from the right (the like and comment buttons). Headlines measure themselves and shrink to fit that width. The constants are in `reels/src/theme.ts` (`SAFE_TOP`, `SAFE_BOTTOM`, `SIDE`, `SIDE_R`).

## Sound

- **Voiceover:** Kokoro (local, open model), British voice `bf_emma`. Lines and timings in `reels/vo-lines.json`, files in `reels/public/vo/`. Regenerate a line with `npx hyperframes tts "<text>" -v bf_emma -s 1.05 -o reels/public/vo/<file>.wav` (needs `pip install kokoro-onnx soundfile`).
- **Music:** two beds generated locally with MusicGen (`facebook/musicgen-small`), loudness-normalised to -16 LUFS, in `reels/public/music/`. `bed-a` under R1 to R4 and R7, `bed-b` under R5 and R6.
- **Sound effects:** Pixabay Content License (commercial use, no attribution needed), in `reels/public/sfx/`. Cue sheets in `reels/src/sound.tsx`.
- Every reel also works muted: all the voiceover lines are on screen.

## Re-rendering

```bash
cd ads/reels
npm i
npx remotion studio                      # preview and edit
npx remotion render R1-CinderAndBun ../out/R1-CinderAndBun.mp4 --concurrency=2
node render-stills.mjs                   # all stills to ../out/stills (or: node render-stills.mjs C1)
```

`remotion.config.ts` points at the cloud sandbox's headless Chrome. On your own machine, delete the `setBrowserExecutable` line.

Brand: cream `#F4F1EA`, ink `#141414`, red `#E0231B`, Inter Display Black and Inter, logo from saldigital.co. Theme and demo data live in `reels/src/theme.ts`.

## Demo recordings

`reels/public/demos/*.mp4` are deterministic 1080x1920 captures of each demo site (virtual clock, frame by frame), so motion is smooth regardless of machine speed. Re-record with `tools/record-demo.js` (usage at the top of the file) if a demo changes.
