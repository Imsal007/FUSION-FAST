import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { C, CAP, CX, DEMOS, FONT, FPS, SAFE_TOP, SIDE, SIDE_R } from "../theme";
import { DemoClip, EndCard, OrderCard, Progress, Rise } from "../ui";
import { FloatFood, Finish, HOT, Phone3D, Stage } from "../premium";
import { SoundTrack, type Cue } from "../sound";
import WORDS from "../show-words.json";

/*
  One phone in the middle of the safe area. The four demo recordings play inside it one after another,
  copy above the phone, word-by-word captions below it, then an order lands and the HyperFrames end card closes.
*/

type Seg = { from: number; len: number; slug: string; capFrom: number; rate: number; eyebrow: string; title: string; accent: string };
const SEGS: Seg[] = [
  { from: 0, len: 135, slug: "cinder-and-bun", capFrom: 1.2, rate: 2.4, eyebrow: "Burgers", title: "Cinder & Bun", accent: DEMOS["cinder-and-bun"].accent },
  { from: 135, len: 110, slug: "forno-nero", capFrom: 3.0, rate: 2.4, eyebrow: "Pizza", title: "Forno Nero", accent: DEMOS["forno-nero"].accent },
  { from: 245, len: 110, slug: "saffron-lane", capFrom: 3.0, rate: 2.4, eyebrow: "Indian & Bangladeshi", title: "Saffron Lane", accent: DEMOS["saffron-lane"].accent },
  { from: 355, len: 110, slug: "sugar-and-steam", capFrom: 3.0, rate: 2.4, eyebrow: "Desserts & coffee", title: "Sugar & Steam", accent: DEMOS["sugar-and-steam"].accent },
  { from: 465, len: 135, slug: "cinder-and-bun", capFrom: CAP.menu, rate: 1.1, eyebrow: "Every site", title: "Orders to WhatsApp", accent: C.wa },
];
const SWAP = 8; // frames the next screen slides in over
const END_AT = 600;
export const SHOWCASE_FRAMES = END_AT + 108;

const PHONE_W = 420;
const PHONE_TOP = 452;
const CAPTION_Y = 1186;

/* ---------- inside the phone: each recording slides in over the last ---------- */
const Screen: React.FC<{ seg: Seg; first: boolean }> = ({ seg, first }) => {
  const f = useCurrentFrame();
  const x = first ? 0 : interpolate(f, [0, SWAP], [100, 0], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ transform: `translateX(${x}%)`, boxShadow: first ? undefined : "-30px 0 60px rgba(0,0,0,.5)" }}>
      <DemoClip slug={seg.slug} from={seg.capFrom} rate={seg.rate} />
    </AbsoluteFill>
  );
};

/* ---------- copy above the phone ---------- */
const TopCopy: React.FC<{ eyebrow: string; title: string; accent: string }> = ({ eyebrow, title, accent }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f, fps, config: { damping: 18 } });
  return (
    <div style={{ position: "absolute", top: SAFE_TOP, left: SIDE, right: SIDE_R, textAlign: "center" }}>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 22px",
          borderRadius: 999,
          background: "rgba(244,241,234,.12)",
          border: "1px solid rgba(244,241,234,.18)",
          color: C.cream,
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 30,
          opacity: s,
          transform: `translateY(${interpolate(s, [0, 1], [-14, 0])}px)`,
        }}
      >
        <span style={{ width: 14, height: 14, borderRadius: 7, background: accent }} />
        {eyebrow}
      </div>
      <Rise text={title} size={92} color={C.cream} align="center" stagger={3} delay={2} style={{ marginTop: 14 }} />
    </div>
  );
};

/* ---------- word-by-word captions under the phone ---------- */
type Line = { text: string; words: [string, number, number][]; dur: number };
const LINES = WORDS as unknown as Record<string, Line>;

const pages = (words: string[], max = 24) => {
  const out: number[][] = [];
  let cur: number[] = [];
  let len = 0;
  words.forEach((w, i) => {
    if (cur.length && len + w.length + 1 > max) {
      out.push(cur);
      cur = [];
      len = 0;
    }
    cur.push(i);
    len += w.length + 1;
  });
  if (cur.length) out.push(cur);
  return out;
};

const Caption: React.FC<{ id: string; accent: string }> = ({ id, accent }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const line = LINES[id];
  const shown = line.text.split(" ");
  const timed = line.words.length === shown.length ? line.words.map((w) => [w[1], w[2]]) : shown.map((_, i) => [(i / shown.length) * line.dur, ((i + 1) / shown.length) * line.dur]);
  const groups = pages(shown);
  const g = groups.find((idx) => t < timed[idx[idx.length - 1]][1] + 0.12) ?? groups[groups.length - 1];
  const appear = interpolate(f, [0, 4], [0, 1], { extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", top: CAPTION_Y, left: SIDE, right: SIDE_R, display: "flex", justifyContent: "center", opacity: appear }}>
      <div
        style={{
          padding: "10px 24px",
          borderRadius: 18,
          background: "rgba(10,8,7,.72)",
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 46,
          lineHeight: 1.15,
          letterSpacing: "-0.01em",
          whiteSpace: "nowrap",
        }}
      >
        {g.map((i) => {
          const [a, b] = timed[i];
          const active = t >= a - 0.04 && t < b + 0.04;
          const done = t >= b;
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                marginRight: "0.26em",
                color: active ? accent : done ? C.cream : "rgba(244,241,234,.55)",
                transform: `scale(${active ? 1.08 : 1})`,
              }}
            >
              {shown[i]}
            </span>
          );
        })}
      </div>
    </div>
  );
};

/* ---------- the cue sheet for this reel ---------- */
const VO: [number, string][] = [
  [4, "show-0"],
  [72, "show-1"],
  [142, "show-2"],
  [252, "show-3"],
  [362, "show-4"],
  [472, "show-5"],
  [606, "show-6"],
];
const CUES: Cue[] = [
  [0, "impact-bass-1", 0.3],
  [0, "whoosh-cinematic", 0.2, 0, 40],
  [2, "whoosh", 0.26], // phone rises in
  ...[66, 135, 245, 355, 465].map((a): Cue => [a, "pop", 0.18]), // top copy changes
  ...[127, 237, 347, 457].map((a): Cue => [a - 2, "whoosh-short", 0.32]), // screen swaps
  [65, "whoosh", 0.2], [169, "whoosh", 0.2], [279, "whoosh", 0.2], [389, "whoosh", 0.2], // dishes come apart inside the phone
  ...[473, 492, 509, 525, 580].map((a): Cue => [a, "click-soft", 0.55]), // taps on the menu
  [584, "notification", 0.6],
  [END_AT - 34, "riser", 0.2, 266, 36],
  [END_AT, "impact-bass-2", 0.32],
  [END_AT + 33, "sparkle", 0.22],
  [END_AT + 38, "chime", 0.38],
];

export const Showcase: React.FC = () => {
  const f = useCurrentFrame();
  const seg = [...SEGS].reverse().find((s) => f >= s.from) ?? SEGS[0];
  return (
    <AbsoluteFill style={{ background: "#0d0b0a" }}>
      {/* backgrounds crossfade per demo */}
      {SEGS.map((s, i) => (
        <Sequence key={`bg${i}`} from={s.from} durationInFrames={s.len + (i === SEGS.length - 1 ? 0 : 10)} name={`BG ${s.title}`}>
          <BgFade first={i === 0}>
            <Stage accent={s.accent} plate={s.slug} plateOpacity={0.6} />
            {/* decoration only: sits in Meta's caption zone, nothing here needs to be read */}
            <FloatFood slug={s.slug} x={-70} y={1330} w={s.slug === "saffron-lane" || s.slug === "sugar-and-steam" ? 400 : 560} depth={0.6} rot={-10} delay={4} blur={1} />
          </BgFade>
        </Sequence>
      ))}

      {/* the phone, one for the whole reel */}
      <Sequence from={0} durationInFrames={END_AT} name="Phone">
        <div style={{ position: "absolute", left: CX - PHONE_W / 2, top: PHONE_TOP }}>
          <Phone3D width={PHONE_W} from={-14} to={-4} tilt={3} delay={0}>
            {SEGS.map((s, i) => (
              <Sequence key={`scr${i}`} from={i === 0 ? 0 : s.from - SWAP} durationInFrames={s.len + (i === 0 ? 0 : SWAP)} name={`Screen ${s.title}`}>
                <Screen seg={s} first={i === 0} />
              </Sequence>
            ))}
          </Phone3D>
        </div>
      </Sequence>

      {/* copy above the phone */}
      <Sequence from={0} durationInFrames={66} name="Top: intro">
        <TopCopy eyebrow="Concept demos by SAL Digital" title="4 restaurant websites" accent={HOT} />
      </Sequence>
      {SEGS.map((s, i) => (
        <Sequence key={`top${i}`} from={i === 0 ? 66 : s.from} durationInFrames={i === 0 ? s.len - 66 : s.len} name={`Top: ${s.title}`}>
          <TopCopy eyebrow={s.eyebrow} title={s.title} accent={s.accent} />
        </Sequence>
      ))}

      {/* the order lands */}
      <Sequence from={584} durationInFrames={END_AT - 584} name="Order card">
        <div style={{ position: "absolute", top: 640, left: SIDE + 20, transform: "scale(.94)", transformOrigin: "left top" }}>
          <OrderCard name="Cinder & Bun" lines={DEMOS["cinder-and-bun"].order.lines} total={DEMOS["cinder-and-bun"].order.total} />
        </div>
      </Sequence>

      {/* captions under the phone */}
      {VO.slice(0, 6).map(([at, id]) => (
        <Sequence key={id} from={at} durationInFrames={Math.round(LINES[id].dur * FPS) + 8} name={`Caption ${id}`}>
          <Caption id={id} accent={seg.accent} />
        </Sequence>
      ))}

      {/* HyperFrames end card */}
      <Sequence from={END_AT} durationInFrames={108} name="End card (HyperFrames)">
        <EndCardIn>
          <EndCard />
        </EndCardIn>
      </Sequence>

      <Finish />
      <Progress total={SHOWCASE_FRAMES} color={seg.accent} />
      <SoundTrack vo={VO} sfx={CUES} music="bed-a" total={SHOWCASE_FRAMES} />
    </AbsoluteFill>
  );
};

/* Each background fades in over the one before; the first is there from frame 0. */
const BgFade: React.FC<{ children: React.ReactNode; first?: boolean }> = ({ children, first }) => {
  const f = useCurrentFrame();
  const o = first ? 1 : interpolate(f, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ opacity: o }}>{children}</AbsoluteFill>;
};

const EndCardIn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [0, 8], [1.12, 1], { extrapolateRight: "clamp" });
  const b = interpolate(f, [0, 8], [14, 0], { extrapolateRight: "clamp" });
  const o = interpolate(f, [0, 5], [0, 1], { extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ transform: `scale(${s})`, filter: `blur(${b}px)`, opacity: o }}>{children}</AbsoluteFill>;
};

