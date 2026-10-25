import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { C, CAP, DEMOS, SAFE_TOP, SIDE, SIDE_R } from "../theme";
import { SoundTrack, CUES } from "../sound";
import { VO } from "../vo-data";
import { Body, Cta, DemoClip, LivingCream, Progress, Rise } from "../ui";

const T = 8;
const ORDER = ["cinder-and-bun", "forno-nero", "saffron-lane", "sugar-and-steam"];
export const COMPILATION_FRAMES = 75 + 4 * 62 + 90 + 100 - 6 * T;

const Hook: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <LivingCream />
      <div style={{ position: "absolute", top: SAFE_TOP, left: SIDE, right: SIDE_R }}>
        <Rise text={"4 restaurants.\n4 *websites.*"} size={124} stagger={4} />
        <Body delay={14} size={28} color={C.mute} style={{ marginTop: 26, fontWeight: 600 }}>
          Concept demos by SAL Digital. The restaurants are fictional.
        </Body>
      </div>
      {ORDER.map((slug, i) => {
        const s = interpolate(f, [12 + i * 6, 28 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const col = i % 2, row = Math.floor(i / 2);
        return (
          <Img
            key={slug}
            src={staticFile(`food/${slug}.webp`)}
            style={{
              position: "absolute",
              left: SIDE + col * 420,
              top: 640 + row * 330 + Math.sin(f / 16 + i) * 10,
              width: 380,
              transform: `scale(${s}) rotate(${(i - 1.5) * 5}deg)`,
              filter: "drop-shadow(0 28px 26px rgba(20,20,20,.35))",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const Cut: React.FC<{ slug: string }> = ({ slug }) => {
  const d = DEMOS[slug];
  const f = useCurrentFrame();
  const zoom = interpolate(f, [0, 62], [1.1, 1.0]);
  const light = parseInt(d.bg.slice(1, 3), 16) > 160;
  const band = light ? "244,236,220" : "10,8,6";
  return (
    <AbsoluteFill style={{ background: d.bg }}>
      <AbsoluteFill style={{ transform: `translateY(190px) scale(${zoom})` }}>
        <DemoClip slug={slug} from={CAP.bdPeak - 0.5} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: `linear-gradient(180deg, rgba(${band},1) 0%, rgba(${band},1) 30%, rgba(${band},0) 44%)` }} />
      <div style={{ position: "absolute", top: SAFE_TOP, left: SIDE, right: SIDE_R }}>
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
    <LivingCream />
    <div style={{ position: "absolute", top: SAFE_TOP + 40, left: SIDE, right: SIDE_R }}>
      <Rise text={"Grill. Pizza.\nCurry. Chinese.\nCafé. What's\n*yours?*"} size={112} stagger={4} />
    </div>
  </AbsoluteFill>
);

export const Compilation: React.FC = () => (
  <AbsoluteFill style={{ background: C.cream }}>
    <TransitionSeries>
      <TransitionSeries.Sequence name="Hook" durationInFrames={75}>
        <Hook />
      </TransitionSeries.Sequence>
      {ORDER.map((slug, i) => (
        <React.Fragment key={slug}>
          <TransitionSeries.Transition
            presentation={i === 0 ? fade() : slide({ direction: "from-right" })}
            timing={linearTiming({ durationInFrames: T })}
          />
          <TransitionSeries.Sequence name={DEMOS[slug].name} durationInFrames={62}>
            <Cut slug={slug} />
          </TransitionSeries.Sequence>
        </React.Fragment>
      ))}
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence name="What's yours" durationInFrames={90}>
        <Yours />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence name="CTA" durationInFrames={100}>
        <Cta />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    <Progress total={COMPILATION_FRAMES} />
    <SoundTrack vo={VO.four} sfx={CUES.four} music="bed-a" total={COMPILATION_FRAMES} />
  </AbsoluteFill>
);
