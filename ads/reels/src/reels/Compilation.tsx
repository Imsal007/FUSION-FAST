import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { C, CAP, DEMOS, SAFE_TOP, SIDE, SIDE_R } from "../theme";
import { Body, DemoClip, EndCard, Progress, Rise } from "../ui";
import { FloatFood, Finish, HOT, Stage, push } from "../premium";
import { SoundTrack, CUES } from "../sound";
import { VO } from "../vo-data";

const T = 8;
const ORDER = ["cinder-and-bun", "forno-nero", "saffron-lane", "sugar-and-steam"];
export const COMPILATION_FRAMES = 75 + 4 * 62 + 90 + 108 - 6 * T;

const Hook: React.FC = () => (
  <AbsoluteFill>
    <Stage accent={HOT} />
    <div style={{ position: "absolute", top: SAFE_TOP, left: SIDE, right: SIDE_R }}>
      <Rise text={"4 restaurants.\n4 *websites.*"} size={124} color={C.cream} accent={HOT} stagger={4} />
      <Body delay={14} size={28} color="rgba(244,241,234,.55)" style={{ marginTop: 26, fontWeight: 600 }}>
        Concept demos by SAL Digital. The restaurants are fictional.
      </Body>
    </div>
    {ORDER.map((slug, i) => (
      <FloatFood key={slug} slug={slug} x={SIDE - 10 + (i % 2) * 420} y={640 + Math.floor(i / 2) * 330} w={380} depth={0.6 + (i % 2) * 0.4} rot={(i - 1.5) * 5} delay={12 + i * 6} />
    ))}
  </AbsoluteFill>
);

const Cut: React.FC<{ slug: string }> = ({ slug }) => {
  const d = DEMOS[slug];
  const f = useCurrentFrame();
  const zoom = interpolate(f, [0, 62], [1.12, 1.0]);
  const light = parseInt(d.bg.slice(1, 3), 16) > 160;
  const band = light ? "244,236,220" : "10,8,6";
  return (
    <AbsoluteFill style={{ background: d.bg }}>
      <AbsoluteFill style={{ transform: `translateY(190px) scale(${zoom})` }}>
        <DemoClip slug={slug} from={CAP.bdPeak - 0.5} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: `linear-gradient(180deg, rgba(${band},1) 0%, rgba(${band},1) 30%, rgba(${band},0) 44%)` }} />
      <div style={{ position: "absolute", top: SAFE_TOP - 10, left: SIDE, right: SIDE_R }}>
        <Rise text={d.cuisine} size={112} color={light ? C.ink : C.cream} stagger={3} />
        <Body delay={6} size={44} color={light ? C.soft : "rgba(244,241,234,.75)"} style={{ marginTop: 14, fontWeight: 600 }}>
          {d.name}
        </Body>
      </div>
    </AbsoluteFill>
  );
};

const Yours: React.FC = () => (
  <AbsoluteFill>
    <Stage accent={HOT} />
    <div style={{ position: "absolute", top: SAFE_TOP + 30, left: SIDE, right: SIDE_R }}>
      <Rise text={"Grill. Pizza.\nCurry. Chinese.\nCafé. What's\n*yours?*"} size={112} color={C.cream} accent={HOT} stagger={4} />
    </div>
  </AbsoluteFill>
);

export const Compilation: React.FC = () => (
  <AbsoluteFill style={{ background: "#0d0b0a" }}>
    <TransitionSeries>
      <TransitionSeries.Sequence name="Hook" durationInFrames={75}>
        <Hook />
      </TransitionSeries.Sequence>
      {ORDER.map((slug) => (
        <React.Fragment key={slug}>
          <TransitionSeries.Transition presentation={push()} timing={linearTiming({ durationInFrames: T })} />
          <TransitionSeries.Sequence name={DEMOS[slug].name} durationInFrames={62}>
            <Cut slug={slug} />
          </TransitionSeries.Sequence>
        </React.Fragment>
      ))}
      <TransitionSeries.Transition presentation={push()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence name="What's yours" durationInFrames={90}>
        <Yours />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={push()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence name="End card (HyperFrames)" durationInFrames={108}>
        <EndCard />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    <Finish />
    <Progress total={COMPILATION_FRAMES} />
    <SoundTrack vo={VO.four} sfx={CUES.four} music="bed-a" total={COMPILATION_FRAMES} />
  </AbsoluteFill>
);
