import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { C, CAP, DEMOS, SAFE_TOP, SIDE } from "../theme";
import { Body, Cta, DemoClip, Disclaimer, LivingCream, OrderCard, Phone, Progress, Rise, useSpringIn } from "../ui";

export type DemoReelProps = { slug: string; hook: string };

const T = 8; // crossfade frames
export const DEMO_REEL_FRAMES = 75 + 105 + 120 + 120 + 90 + 100 - 5 * T;

const isLight = (bg: string) => parseInt(bg.slice(1, 3), 16) > 160;

/* Hook: the breakdown, full screen, with the line over it. */
const Hook: React.FC<{ slug: string; hook: string }> = ({ slug, hook }) => {
  const d = DEMOS[slug];
  const light = isLight(d.bg);
  const f = useCurrentFrame();
  const zoom = interpolate(f, [0, 75], [1.08, 1.0]);
  return (
    <AbsoluteFill style={{ background: d.bg }}>
      <AbsoluteFill style={{ transform: `translateY(170px) scale(${zoom})` }}>
        <DemoClip slug={slug} from={CAP.bdPeak - 1.2} />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background: light
            ? "linear-gradient(180deg, rgba(244,236,220,1) 0%, rgba(244,236,220,1) 33%, rgba(244,236,220,0) 50%)"
            : "linear-gradient(180deg, rgba(10,8,6,1) 0%, rgba(10,8,6,1) 33%, rgba(10,8,6,0) 50%)",
        }}
      />
      <div style={{ position: "absolute", top: SAFE_TOP - 30, left: SIDE, right: SIDE }}>
        <Rise text={hook} size={110} color={light ? C.ink : C.cream} accent={d.accent} stagger={3} />
      </div>
    </AbsoluteFill>
  );
};

/* A phone scene: a headline on cream, the demo playing in the phone. */
const PhoneScene: React.FC<{ slug: string; line: string; from: number; rate: number; note?: boolean }> = ({ slug, line, from, rate, note }) => {
  const d = DEMOS[slug];
  const s = useSpringIn(4, 18);
  const f = useCurrentFrame();
  const drift = Math.sin(f / 22) * 6;
  return (
    <AbsoluteFill>
      <LivingCream tint={d.accent} />
      <div style={{ position: "absolute", top: SAFE_TOP - 20, left: SIDE, right: SIDE }}>
        <Rise text={line} size={104} accent={C.red} />
        {note ? <Disclaimer name={d.name} style={{ marginTop: 22, fontSize: 28 }} /> : null}
      </div>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 630,
          transform: `translateX(-50%) translateY(${interpolate(s, [0, 1], [220, 0]) + drift}px) rotate(${interpolate(s, [0, 1], [4, -1.5])}deg)`,
        }}
      >
        <Phone width={650}>
          <DemoClip slug={slug} from={from} rate={rate} />
        </Phone>
      </div>
    </AbsoluteFill>
  );
};

/* The order arrives: notification card over the phone. */
const OrderLands: React.FC<{ slug: string }> = ({ slug }) => {
  const d = DEMOS[slug];
  return (
    <AbsoluteFill>
      <LivingCream tint={C.wa} />
      <div style={{ position: "absolute", left: "50%", top: 1060, transform: "translateX(-50%) rotate(-1.5deg)" }}>
        <Phone width={600}>
          <DemoClip slug={slug} from={CAP.end - 0.9} rate={0.25} />
        </Phone>
      </div>
      <div style={{ position: "absolute", top: SAFE_TOP - 20, left: SIDE, right: SIDE }}>
        <Rise text={"The order lands\non *your* WhatsApp."} size={100} />
        <Body delay={12} size={44} style={{ marginTop: 24 }}>
          No app commission. Paid when they collect.
        </Body>
      </div>
      <div style={{ position: "absolute", top: 700, left: 100 }}>
        <OrderCard name={d.name} lines={d.order.lines} total={d.order.total} delay={10} />
      </div>
    </AbsoluteFill>
  );
};

export const DemoReel: React.FC<DemoReelProps> = ({ slug, hook }) => {
  return (
    <AbsoluteFill style={{ background: C.cream }}>
      <TransitionSeries>
        <TransitionSeries.Sequence name="Hook" durationInFrames={75}>
          <Hook slug={slug} hook={hook} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Opens like a film" durationInFrames={105}>
          <PhoneScene slug={slug} line={"It opens like\na *film.*"} from={CAP.heroStart} rate={1.3} note />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Broken down" durationInFrames={120}>
          <PhoneScene slug={slug} line={"Every dish,\n*broken down.*"} from={CAP.bdStart + 0.2} rate={1.5} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Tap and order" durationInFrames={120}>
          <PhoneScene slug={slug} line={"Customers tap,\norder and *send.*"} from={CAP.menu} rate={1.3} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Order lands" durationInFrames={90}>
          <OrderLands slug={slug} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="CTA" durationInFrames={100}>
          <Cta />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Progress total={DEMO_REEL_FRAMES} />
    </AbsoluteFill>
  );
};
