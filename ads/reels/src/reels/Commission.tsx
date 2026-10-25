import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { C, CAP, CX, DEMOS, FONT, FONT_DISPLAY, SAFE_TOP, SIDE, SIDE_R } from "../theme";
import { SoundTrack, CUES } from "../sound";
import { VO } from "../vo-data";
import { Body, Cta, DemoClip, Disclaimer, LivingCream, Phone, Progress, Rise, useSpringIn } from "../ui";

const T = 8;
export const COMMISSION_FRAMES = 80 + 150 + 140 + 120 + 100 - 4 * T;

const gbp = (n: number) => "£" + Math.round(n).toLocaleString("en-GB");

/* Number that counts up between two frames. */
const Count: React.FC<{ to: number; from?: number; start: number; dur?: number; size?: number; color?: string }> = ({
  to,
  from = 0,
  start,
  dur = 28,
  size = 200,
  color = C.ink,
}) => {
  const f = useCurrentFrame();
  const v = interpolate(f, [start, start + dur], [from, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const o = interpolate(f, [start - 6, start], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: size, letterSpacing: "-0.045em", lineHeight: 0.9, color, opacity: o }}>{gbp(v)}</div>
  );
};

const Receipt: React.FC = () => {
  const s = useSpringIn(6, 16);
  const fee = useSpringIn(26, 12);
  const row = (a: string, b: string, style?: React.CSSProperties) => (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 46, padding: "18px 0", borderBottom: `2px dashed ${C.line}`, ...style }}>
      <span>{a}</span>
      <span style={{ fontWeight: 700 }}>{b}</span>
    </div>
  );
  return (
    <div
      style={{
        width: 800,
        background: C.white,
        borderRadius: 36,
        padding: "40px 52px",
        fontFamily: FONT,
        color: C.ink,
        boxShadow: "0 50px 90px -30px rgba(20,20,20,.4)",
        transform: `translateY(${interpolate(s, [0, 1], [300, 0])}px) rotate(${interpolate(s, [0, 1], [6, -2])}deg)`,
        opacity: s,
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 34, color: C.mute, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Delivery app order</div>
      {row("Customer paid", "£36.00")}
      <div style={{ transform: `scale(${interpolate(fee, [0, 1], [1.4, 1])})`, opacity: fee, transformOrigin: "left center" }}>
        {row("App commission (30%)", "−£10.80", { color: C.red })}
      </div>
      {row("You keep", "£25.20", { borderBottom: "none", fontWeight: 700 })}
    </div>
  );
};

const Hook: React.FC = () => (
  <AbsoluteFill>
    <LivingCream />
    <div style={{ position: "absolute", top: SAFE_TOP, left: SIDE, right: SIDE_R }}>
      <Rise text={"Still paying\nthe apps *30%*\nof every order?"} size={108} stagger={3} />
    </div>
    <div style={{ position: "absolute", top: 680, left: SIDE + 5 }}>
      <Receipt />
    </div>
  </AbsoluteFill>
);

const Maths: React.FC = () => (
  <AbsoluteFill style={{ background: C.ink }}>
    <div style={{ position: "absolute", top: SAFE_TOP, left: SIDE, right: SIDE_R, color: C.cream }}>
      <Body color="rgba(244,241,234,.75)" size={46}>
        Say you take £2,000 a week on the apps.
      </Body>
      <div style={{ marginTop: 50 }}>
        <Count to={600} start={14} color={C.cream} size={190} />
        <Body delay={20} color={C.cream} size={52} style={{ marginTop: 10, fontWeight: 600 }}>
          goes to the apps every week.
        </Body>
      </div>
      <div style={{ marginTop: 60 }}>
        <Count to={31200} start={62} dur={36} color="#FF5148" size={176} />
        <Body delay={68} color={C.cream} size={52} style={{ marginTop: 10, fontWeight: 600 }}>
          a year. Gone.
        </Body>
      </div>
      <Body delay={90} color="rgba(244,241,234,.55)" size={28} style={{ marginTop: 50, maxWidth: 810 }}>
        Example at 30% commission. UK delivery apps typically charge 15% to 35%.
      </Body>
    </div>
  </AbsoluteFill>
);

const Turn: React.FC = () => (
  <AbsoluteFill>
    <LivingCream tint={C.wa} />
    <div style={{ position: "absolute", top: SAFE_TOP, left: SIDE, right: SIDE_R }}>
      <Rise text={"Move *1 in 4* orders\nto your own site."} size={104} />
      <div style={{ marginTop: 80 }}>
        <Count to={7800} start={26} dur={34} size={200} />
        <Body delay={34} size={54} color={C.ink} style={{ marginTop: 10, fontWeight: 600 }}>
          back in your pocket each year.
        </Body>
      </div>
      <Body delay={50} size={28} color={C.mute} style={{ marginTop: 60 }}>
        Same example, before card fees.
      </Body>
    </div>
  </AbsoluteFill>
);

const Proof: React.FC = () => {
  const s = useSpringIn(4, 18);
  const d = DEMOS["cinder-and-bun"];
  return (
    <AbsoluteFill>
      <LivingCream tint={d.accent} />
      <div style={{ position: "absolute", top: SAFE_TOP, left: SIDE, right: SIDE_R }}>
        <Rise text={"Your own site.\nOrders straight\nto *WhatsApp.*"} size={96} />
        <Disclaimer name={d.name} style={{ marginTop: 20, fontSize: 28 }} />
      </div>
      <div style={{ position: "absolute", left: CX, top: 630, transform: `translateX(-50%) translateY(${interpolate(s, [0, 1], [220, 0])}px) rotate(-1.5deg)` }}>
        <Phone width={390}>
          <DemoClip slug="cinder-and-bun" from={CAP.menu} rate={1.3} />
        </Phone>
      </div>
    </AbsoluteFill>
  );
};

export const Commission: React.FC = () => (
  <AbsoluteFill style={{ background: C.cream }}>
    <TransitionSeries>
      <TransitionSeries.Sequence name="Hook" durationInFrames={80}>
        <Hook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence name="The cost" durationInFrames={150}>
        <Maths />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence name="The turn" durationInFrames={140}>
        <Turn />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence name="Proof" durationInFrames={120}>
        <Proof />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence name="CTA" durationInFrames={100}>
        <Cta />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    <Progress total={COMMISSION_FRAMES} />
    <SoundTrack vo={VO.commission} sfx={CUES.commission} music="bed-b" total={COMMISSION_FRAMES} />
  </AbsoluteFill>
);
