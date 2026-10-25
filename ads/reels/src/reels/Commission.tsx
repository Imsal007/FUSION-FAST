import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { C, CAP, CX, DEMOS, FONT, FONT_DISPLAY, SAFE_TOP, SIDE, SIDE_R } from "../theme";
import { Body, DemoClip, Disclaimer, EndCard, Progress, Rise, useSpringIn } from "../ui";
import { CREAM_SOFT, FloatFood, Finish, HOT, Phone3D, Stage, push } from "../premium";
import { SoundTrack, CUES } from "../sound";
import { VO } from "../vo-data";

const T = 8;
export const COMMISSION_FRAMES = 80 + 150 + 140 + 120 + 108 - 4 * T;

const gbp = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");

/* Number that counts up between two frames, with a soft glow while it runs. */
const Count: React.FC<{ to: number; start: number; dur?: number; size?: number; color?: string }> = ({ to, start, dur = 28, size = 200, color = C.cream }) => {
  const f = useCurrentFrame();
  const v = interpolate(f, [start, start + dur], [0, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const o = interpolate(f, [start - 6, start], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pop = interpolate(f, [start + dur - 2, start + dur + 4, start + dur + 12], [1, 1.06, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        fontFamily: FONT_DISPLAY,
        fontWeight: 900,
        fontSize: size,
        letterSpacing: "-0.045em",
        lineHeight: 0.9,
        color,
        opacity: o,
        transform: `scale(${pop})`,
        transformOrigin: "left center",
        textShadow: `0 0 60px ${color}44`,
      }}
    >
      {gbp(v)}
    </div>
  );
};

const Receipt: React.FC = () => {
  const s = useSpringIn(6, 16);
  const fee = useSpringIn(26, 12);
  const f = useCurrentFrame();
  const row = (a: string, b: string, style?: React.CSSProperties) => (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 44, padding: "18px 0", borderBottom: `2px dashed ${C.line}`, ...style }}>
      <span>{a}</span>
      <span style={{ fontWeight: 700 }}>{b}</span>
    </div>
  );
  return (
    <div style={{ perspective: 1600 }}>
      <div
        style={{
          width: 800,
          background: C.white,
          borderRadius: 36,
          padding: "40px 50px",
          fontFamily: FONT,
          color: C.ink,
          boxShadow: "0 60px 100px -30px rgba(0,0,0,.75)",
          transform: `translateY(${interpolate(s, [0, 1], [320, 0])}px) rotateX(${interpolate(s, [0, 1], [30, 8]) + Math.sin(f / 30) * 1.5}deg) rotateZ(${interpolate(s, [0, 1], [6, -2])}deg)`,
          opacity: s,
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 32, color: C.mute, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Delivery app order</div>
        {row("Customer paid", "£36.00")}
        <div style={{ transform: `scale(${interpolate(fee, [0, 1], [1.5, 1])})`, opacity: fee, transformOrigin: "left center" }}>{row("App commission (30%)", "−£10.80", { color: C.red })}</div>
        {row("You keep", "£25.20", { borderBottom: "none", fontWeight: 700 })}
      </div>
    </div>
  );
};

const Hook: React.FC = () => (
  <AbsoluteFill>
    <Stage accent={HOT} />
    <div style={{ position: "absolute", top: SAFE_TOP, left: SIDE, right: SIDE_R }}>
      <Rise text={"Still paying\nthe apps *30%*\nof every order?"} size={108} color={C.cream} accent={HOT} stagger={3} />
    </div>
    <div style={{ position: "absolute", top: 700, left: SIDE + 5 }}>
      <Receipt />
    </div>
  </AbsoluteFill>
);

const Maths: React.FC = () => (
  <AbsoluteFill>
    <Stage accent="#b5150f" />
    <div style={{ position: "absolute", top: SAFE_TOP, left: SIDE, right: SIDE_R }}>
      <Body color={CREAM_SOFT} size={46}>
        Say you take £2,000 a week on the apps.
      </Body>
      <div style={{ marginTop: 50 }}>
        <Count to={600} start={14} size={190} />
        <Body delay={20} color={C.cream} size={50} style={{ marginTop: 10, fontWeight: 600 }}>
          goes to the apps every week.
        </Body>
      </div>
      <div style={{ marginTop: 60 }}>
        <Count to={31200} start={62} dur={36} color={HOT} size={176} />
        <Body delay={68} color={C.cream} size={50} style={{ marginTop: 10, fontWeight: 600 }}>
          a year. Gone.
        </Body>
      </div>
      <Body delay={90} color="rgba(244,241,234,.5)" size={28} style={{ marginTop: 50 }}>
        Example at 30% commission. UK delivery apps typically charge 15% to 35%.
      </Body>
    </div>
  </AbsoluteFill>
);

const Turn: React.FC = () => (
  <AbsoluteFill>
    <Stage accent={C.wa} />
    <div style={{ position: "absolute", top: SAFE_TOP, left: SIDE, right: SIDE_R }}>
      <Rise text={"Move *1 in 4* orders\nto your own site."} size={104} color={C.cream} accent={C.wa} />
      <div style={{ marginTop: 80 }}>
        <Count to={7800} start={26} dur={34} size={200} color={C.cream} />
        <Body delay={34} size={52} color={C.cream} style={{ marginTop: 10, fontWeight: 600 }}>
          back in your pocket each year.
        </Body>
      </div>
      <Body delay={50} size={28} color="rgba(244,241,234,.5)" style={{ marginTop: 50 }}>
        Same example, before card fees.
      </Body>
    </div>
  </AbsoluteFill>
);

const Proof: React.FC = () => {
  const d = DEMOS["cinder-and-bun"];
  return (
    <AbsoluteFill>
      <Stage accent={d.accent} plate="cinder-and-bun" />
      <FloatFood slug="cinder-and-bun" x={540} y={720} w={480} depth={0.8} rot={-8} delay={10} />
      <div style={{ position: "absolute", top: SAFE_TOP, left: SIDE, right: SIDE_R }}>
        <Rise text={"Your own site.\nOrders straight\nto *WhatsApp.*"} size={96} color={C.cream} accent={C.wa} />
        <Disclaimer name={d.name} color="rgba(244,241,234,.55)" style={{ marginTop: 20, fontSize: 28 }} />
      </div>
      <div style={{ position: "absolute", left: CX - 240, top: 640 }}>
        <Phone3D width={400}>
          <DemoClip slug="cinder-and-bun" from={CAP.menu} rate={1.3} />
        </Phone3D>
      </div>
    </AbsoluteFill>
  );
};

export const Commission: React.FC = () => (
  <AbsoluteFill style={{ background: "#0d0b0a" }}>
    <TransitionSeries>
      <TransitionSeries.Sequence name="Hook" durationInFrames={80}>
        <Hook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={push()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence name="The cost" durationInFrames={150}>
        <Maths />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={push()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence name="The turn" durationInFrames={140}>
        <Turn />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={push()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence name="Proof" durationInFrames={120}>
        <Proof />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={push()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence name="End card (HyperFrames)" durationInFrames={108}>
        <EndCard />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    <Finish />
    <Progress total={COMMISSION_FRAMES} />
    <SoundTrack vo={VO.commission} sfx={CUES.commission} music="bed-b" total={COMMISSION_FRAMES} />
  </AbsoluteFill>
);
