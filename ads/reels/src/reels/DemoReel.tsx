import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { C, CAP, CX, DEMOS, SAFE_TOP, SIDE, SIDE_R } from "../theme";
import { Body, DemoClip, Disclaimer, EndCard, OrderCard, Progress, Rise } from "../ui";
import { CREAM_SOFT, FloatFood, Finish, Phone3D, Stage, push } from "../premium";
import { SoundTrack, CUES } from "../sound";
import { VO } from "../vo-data";

export type DemoReelProps = { slug: string; hook: string };

const T = 8;
export const DEMO_REEL_FRAMES = 75 + 105 + 120 + 120 + 90 + 108 - 5 * T;

const isLight = (bg: string) => parseInt(bg.slice(1, 3), 16) > 160;

/* Hook: the breakdown full screen, a slow push-in, the line over a solid band. */
const Hook: React.FC<{ slug: string; hook: string }> = ({ slug, hook }) => {
  const d = DEMOS[slug];
  const light = isLight(d.bg);
  const f = useCurrentFrame();
  const zoom = interpolate(f, [0, 75], [1.1, 1.0]);
  const band = light ? "244,236,220" : "10,8,6";
  return (
    <AbsoluteFill style={{ background: d.bg }}>
      <AbsoluteFill style={{ transform: `translateY(170px) scale(${zoom})` }}>
        <DemoClip slug={slug} from={CAP.bdPeak - 1.2} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: `linear-gradient(180deg, rgba(${band},1) 0%, rgba(${band},1) 33%, rgba(${band},0) 50%)` }} />
      <div style={{ position: "absolute", top: SAFE_TOP - 10, left: SIDE, right: SIDE_R }}>
        <Rise text={hook} size={112} color={light ? C.ink : C.cream} accent={d.accent} stagger={3} />
      </div>
    </AbsoluteFill>
  );
};

/* Phone scene: dark stage lit in the restaurant's colours, the dish floating behind a 3D phone. */
const PhoneScene: React.FC<{ slug: string; line: string; from: number; rate: number; note?: boolean; flip?: boolean }> = ({ slug, line, from, rate, note, flip }) => {
  const d = DEMOS[slug];
  return (
    <AbsoluteFill>
      <Stage accent={d.accent} plate={slug} />
      <FloatFood slug={slug} x={flip ? -60 : 520} y={flip ? 1010 : 640} w={flip ? 460 : 520} depth={0.8} rot={flip ? 8 : -8} delay={6} />
      <div style={{ position: "absolute", top: SAFE_TOP, left: SIDE, right: SIDE_R }}>
        <Rise text={line} size={104} color={C.cream} accent={d.accent} />
        {note ? <Disclaimer name={d.name} color="rgba(244,241,234,.55)" style={{ marginTop: 22, fontSize: 28 }} /> : null}
      </div>
      <div style={{ position: "absolute", left: CX - 220 + (flip ? 30 : -20), top: 560 }}>
        <Phone3D width={440} from={flip ? 26 : -26} to={flip ? 10 : -10}>
          <DemoClip slug={slug} from={from} rate={rate} />
        </Phone3D>
      </div>
    </AbsoluteFill>
  );
};

/* The order arrives: notification card over the phone. */
const OrderLands: React.FC<{ slug: string }> = ({ slug }) => {
  const d = DEMOS[slug];
  return (
    <AbsoluteFill>
      <Stage accent={C.wa} plate={slug} plateOpacity={0.35} />
      <div style={{ position: "absolute", left: CX - 220, top: 990 }}>
        <Phone3D width={440} from={-18} to={-6} tilt={14}>
          <DemoClip slug={slug} from={CAP.end - 0.9} rate={0.25} />
        </Phone3D>
      </div>
      <div style={{ position: "absolute", top: SAFE_TOP, left: SIDE, right: SIDE_R }}>
        <Rise text={"The order lands\non *your* WhatsApp."} size={100} color={C.cream} accent={C.wa} />
        <Body delay={12} size={44} color={CREAM_SOFT} style={{ marginTop: 24 }}>
          No app commission. Paid when they collect.
        </Body>
      </div>
      <div style={{ position: "absolute", top: 640, left: SIDE }}>
        <OrderCard name={d.name} lines={d.order.lines} total={d.order.total} delay={10} />
      </div>
    </AbsoluteFill>
  );
};

export const DemoReel: React.FC<DemoReelProps> = ({ slug, hook }) => {
  const d = DEMOS[slug];
  return (
    <AbsoluteFill style={{ background: "#0d0b0a" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence name="Hook" durationInFrames={75}>
          <Hook slug={slug} hook={hook} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={push()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Opens like a film" durationInFrames={105}>
          <PhoneScene slug={slug} line={"It opens like\na *film.*"} from={CAP.heroStart} rate={1.3} note />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={push()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Broken down" durationInFrames={120}>
          <PhoneScene slug={slug} line={"Every dish,\n*broken down.*"} from={CAP.bdStart + 0.2} rate={1.5} flip />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={push()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Tap and order" durationInFrames={120}>
          <PhoneScene slug={slug} line={"Customers tap,\norder and *send.*"} from={CAP.menu} rate={1.3} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={push()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="Order lands" durationInFrames={90}>
          <OrderLands slug={slug} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={push()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence name="End card (HyperFrames)" durationInFrames={108}>
          <EndCard />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      <Finish />
      <Progress total={DEMO_REEL_FRAMES} color={d.accent} />
      <SoundTrack vo={[...VO[`demo-${slug}`], ...VO.demo]} sfx={CUES.demo} music="bed-a" total={DEMO_REEL_FRAMES} />
    </AbsoluteFill>
  );
};
