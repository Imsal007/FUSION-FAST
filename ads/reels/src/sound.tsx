import React from "react";
import { Audio } from "@remotion/media";
import { Sequence, interpolate, staticFile } from "remotion";

// [start frame, sfx file, volume, skip frames from the start of the file, play length in frames]
export type Cue = [frame: number, sfx: string, volume?: number, trim?: number, length?: number];

/* Voice, sound effects and a music bed for one reel. The music dips under the voice and sits low so every line reads. */
export const SoundTrack: React.FC<{ vo: [number, string][]; sfx: Cue[]; music: string; total: number; musicVolume?: number }> = ({
  vo,
  sfx,
  music,
  total,
  musicVolume = 0.18,
}) => (
  <>
    <Audio
      src={staticFile(`music/${music}.wav`)}
      durationInFrames={total}
      volume={(f) => interpolate(f, [0, 10, total - 30, total], [0, musicVolume, musicVolume, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
    />
    {vo.map(([at, file]) => (
      <Sequence key={file} from={at} layout="none" name={`VO ${file}`}>
        <Audio src={staticFile(`vo/${file}.wav`)} volume={1} />
      </Sequence>
    ))}
    {sfx.map(([at, name, volume = 0.4, trim = 0, length], i) => (
      <Sequence key={`${name}-${i}`} from={Math.max(0, at)} layout="none" name={`SFX ${name}`}>
        <Audio
          src={staticFile(`sfx/${name}.mp3`)}
          trimBefore={trim || undefined}
          durationInFrames={length}
          volume={length ? (f) => interpolate(f, [0, length - 8, length], [volume, volume, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : volume}
        />
      </Sequence>
    ))}
  </>
);

/* Building blocks for cue sheets. Scene cuts are 8-frame pushes, so cut sounds start 3 frames early. */
const cuts = (starts: number[], vol = 0.3): Cue[] => starts.map((s) => [s - 3, "whoosh-short", vol]);
const taps = (sceneStart: number): Cue[] => [14, 30, 44, 58, 104].map((o) => [sceneStart + o, "click-soft", 0.55]);
const open: Cue[] = [
  [0, "impact-bass-1", 0.32],
  [0, "whoosh-cinematic", 0.22, 0, 45],
];
// riser peaks as the end card lands, a low hit on the card, sparkle on the light sweep, chime on the URL pill
const endCard = (at: number): Cue[] => [
  [at - 34, "riser", 0.2, 266, 36],
  [at, "impact-bass-2", 0.32],
  [at + 33, "sparkle", 0.22],
  [at + 38, "chime", 0.38],
];
const phoneIn = (at: number): Cue[] => [[at + 2, "whoosh", 0.26]];
const foodFloat = (at: number): Cue[] => [[at, "sparkle", 0.14]];

export const CUES = {
  demo: [
    ...open,
    ...cuts([67, 164, 276, 388]),
    ...phoneIn(67),
    ...foodFloat(78),
    ...phoneIn(164),
    [176, "whoosh", 0.22], // layers fly apart inside the phone
    [204, "pop", 0.2], [212, "pop", 0.2], [220, "pop", 0.2], [228, "pop", 0.2], // labels appear
    ...phoneIn(276),
    ...taps(276),
    [398, "notification", 0.6],
    ...endCard(470),
  ] as Cue[],
  commission: [
    ...open,
    [8, "whoosh", 0.28], // receipt slides up
    [26, "pop", 0.45], [26, "impact-bass-2", 0.25], // commission line stamps in
    ...cuts([72, 214, 346, 458]),
    [86, "typing", 0.22, 0, 28], // £600 counts up
    [134, "typing", 0.22, 0, 36], // £31,200 counts up
    [170, "impact-bass-2", 0.4],
    [240, "typing", 0.2, 0, 34], // £7,800 counts up
    [274, "sparkle", 0.2],
    ...phoneIn(346),
    ...foodFloat(356),
    ...taps(346),
    ...endCard(458),
  ] as Cue[],
  cheap: [
    ...open,
    ...cuts([72, 174, 296, 388]),
    ...phoneIn(72),
    [124, "impact-bass-2", 0.42], [124, "error", 0.26], // LOOKS CHEAP stamp
    ...phoneIn(174),
    ...foodFloat(186),
    [306, "sparkle", 0.16], // dishes float in
    [314, "pop", 0.35], [320, "pop", 0.35], [326, "pop", 0.35], // offer pills
    ...endCard(388),
  ] as Cue[],
  four: [
    ...open,
    [12, "pop", 0.28], [18, "pop", 0.28], [24, "pop", 0.28], [30, "pop", 0.28], // four dishes pop in
    [20, "sparkle", 0.16],
    ...cuts([67, 121, 175, 229, 283]),
    [70, "pop", 0.22], [124, "pop", 0.22], [178, "pop", 0.22], [232, "pop", 0.22], // cuisine titles
    ...endCard(365),
  ] as Cue[],
};
