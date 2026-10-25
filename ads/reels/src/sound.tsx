import React from "react";
import { Audio } from "@remotion/media";
import { Sequence, interpolate, staticFile } from "remotion";

export type Cue = [frame: number, sfx: string, volume?: number];

/* Voice, sound effects and a music bed for one reel. The music sits low so the voice always reads. */
export const SoundTrack: React.FC<{ vo: [number, string][]; sfx: Cue[]; music: string; total: number; musicVolume?: number }> = ({
  vo,
  sfx,
  music,
  total,
  musicVolume = 0.16,
}) => (
  <>
    <Audio
      src={staticFile(`music/${music}.wav`)}
      durationInFrames={total}
      volume={(f) => interpolate(f, [0, 12, total - 30, total], [0, musicVolume, musicVolume, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
    />
    {vo.map(([at, file]) => (
      <Sequence key={file} from={at} layout="none" name={`VO ${file}`}>
        <Audio src={staticFile(`vo/${file}.wav`)} volume={1} />
      </Sequence>
    ))}
    {sfx.map(([at, name, volume = 0.4], i) => (
      <Sequence key={`${name}-${i}`} from={at} layout="none" name={`SFX ${name}`}>
        <Audio src={staticFile(`sfx/${name}.mp3`)} volume={volume} />
      </Sequence>
    ))}
  </>
);

/* Cue sheets (frames). Cuts are 8-frame crossfades, so a whoosh lands 3 frames before each scene starts. */
const cuts = (starts: number[], vol = 0.32): Cue[] => starts.map((s) => [s - 3, "whoosh-short", vol]);
const taps = (sceneStart: number): Cue[] => [14, 30, 44, 58, 104].map((o) => [sceneStart + o, "click-soft", 0.55]);

export const CUES = {
  demo: [[2, "impact-bass-1", 0.3], ...cuts([67, 164, 276, 388]), ...taps(276), [398, "notification", 0.6], [476, "chime", 0.4]] as Cue[],
  commission: [[2, "impact-bass-1", 0.28], [26, "pop", 0.5], ...cuts([72, 214, 346, 458]), [134, "impact-bass-2", 0.42], ...taps(346), [464, "chime", 0.4]] as Cue[],
  cheap: [[2, "impact-bass-1", 0.28], ...cuts([72, 174, 296, 388]), [124, "impact-bass-2", 0.45], [314, "pop", 0.35], [320, "pop", 0.35], [326, "pop", 0.35], [394, "chime", 0.4]] as Cue[],
  four: [[2, "impact-bass-1", 0.28], [12, "pop", 0.3], [18, "pop", 0.3], [24, "pop", 0.3], [30, "pop", 0.3], ...cuts([67, 121, 175, 229, 283, 365]), [371, "chime", 0.4]] as Cue[],
};
