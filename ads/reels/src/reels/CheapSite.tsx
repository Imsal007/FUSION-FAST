import React from "react";
import { AbsoluteFill, interpolate } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { C, CAP, CX, SAFE_TOP, SIDE, SIDE_R } from "../theme";
import { DemoClip, Disclaimer, EndCard, Pill, Progress, Rise, useSpringIn } from "../ui";
import { FloatFood, Finish, HOT, Phone3D, Stage, push } from "../premium";
import { SoundTrack, CUES } from "../sound";
import { VO } from "../vo-data";

const T = 8;
export const CHEAP_FRAMES = 80 + 110 + 130 + 100 + 108 - 4 * T;

const Hook: React.FC = () => (
  <AbsoluteFill>
    <Stage accent={HOT} />
    <div style={{ position: "absolute", top: SAFE_TOP + 30, left: SIDE, right: SIDE_R }}>
      <Rise text={"Nobody orders\nfrom a website\nthat looks\n*cheap.*"} size={118} color={C.cream} accent={HOT} stagger={3} />
    </div>
  </AbsoluteFill>
);

/* A deliberately tired, generic takeaway site. Not based on any real business. */
const TiredSite: React.FC = () => (
  <div style={{ width: "100%", height: "100%", background: "#e9e9e9", fontFamily: "Times New Roman, serif", color: "#222", padding: 26 }}>
    <div style={{ background: "#3a5aa8", color: "#fff", padding: "18px 14px", fontSize: 40, fontWeight: 700, textAlign: "center" }}>YOUR TAKEAWAY</div>
    <div style={{ fontSize: 22, color: "#2233aa", textDecoration: "underline", margin: "14px 0", display: "flex", gap: 16, justifyContent: "center" }}>
      <span>Home</span>
      <span>Menu</span>
      <span>Contact</span>
      <span>Gallery</span>
    </div>
    <div style={{ fontSize: 34, textAlign: "center", margin: "22px 0", color: "#b00" }}>Welcome to our website!!!</div>
    <div style={{ height: 260, background: "#cfcfcf", display: "grid", placeItems: "center", fontSize: 26, color: "#777", border: "2px solid #aaa" }}>[ image coming soon ]</div>
    <div style={{ fontSize: 24, lineHeight: 1.5, marginTop: 20 }}>
      We serve tasty food at good prices. Open 7 days. Call us to order. Delivery available in local area. Minimum order applies. Ask staff for details.
    </div>
    <div style={{ fontSize: 26, color: "#2233aa", textDecoration: "underline", marginTop: 20 }}>Click here to download our menu (PDF 4.2MB)</div>
    <div style={{ fontSize: 20, color: "#666", marginTop: 26 }}>Last updated 2017 · Best viewed in Internet Explorer</div>
  </div>
);

const Cheap: React.FC = () => {
  const stamp = useSpringIn(52, 10);
  return (
    <AbsoluteFill>
      <Stage accent="#5d6b8a" />
      <div style={{ position: "absolute", top: SAFE_TOP, left: SIDE, right: SIDE_R }}>
        <Rise text={"Most takeaway\nsites look\nlike this."} size={100} color={C.cream} accent={HOT} />
      </div>
      <div style={{ position: "absolute", left: CX - 200, top: 640 }}>
        <Phone3D width={400} from={24} to={8}>
          <TiredSite />
        </Phone3D>
      </div>
      <div
        style={{
          position: "absolute",
          top: 900,
          left: 150,
          border: `10px solid ${HOT}`,
          color: HOT,
          fontFamily: "Inter Display",
          fontWeight: 900,
          fontSize: 92,
          letterSpacing: "-0.03em",
          padding: "6px 34px",
          borderRadius: 24,
          background: "rgba(13,11,10,.82)",
          transform: `rotate(-12deg) scale(${interpolate(stamp, [0, 1], [2.4, 1])})`,
          opacity: stamp,
          boxShadow: "0 30px 60px -20px rgba(0,0,0,.7)",
        }}
      >
        LOOKS CHEAP
      </div>
    </AbsoluteFill>
  );
};

const Yours: React.FC = () => (
  <AbsoluteFill>
    <Stage accent="#f2a516" plate="saffron-lane" />
    <FloatFood slug="saffron-lane" x={560} y={760} w={440} depth={0.8} rot={-6} delay={8} />
    <div style={{ position: "absolute", top: SAFE_TOP, left: SIDE, right: SIDE_R }}>
      <Rise text={"Yours could\nlook like *this.*"} size={104} color={C.cream} accent="#f2a516" />
      <Disclaimer name="Saffron Lane" color="rgba(244,241,234,.55)" style={{ marginTop: 20, fontSize: 28 }} />
    </div>
    <div style={{ position: "absolute", left: CX - 240, top: 640 }}>
      <Phone3D width={400}>
        <DemoClip slug="saffron-lane" from={CAP.heroStart} rate={1} />
      </Phone3D>
    </div>
  </AbsoluteFill>
);

const Offer: React.FC = () => {
  const foods = ["cinder-and-bun", "forno-nero", "saffron-lane", "sugar-and-steam"];
  return (
    <AbsoluteFill>
      <Stage accent={HOT} />
      <div style={{ position: "absolute", top: SAFE_TOP, left: SIDE, right: SIDE_R }}>
        <Rise text={"A free demo with\nyour name, menu\nand *food.*"} size={100} color={C.cream} accent={HOT} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 18, marginTop: 50 }}>
          <Pill delay={18} bg={C.cream} color={C.ink}>Ready in 48 hours</Pill>
          <Pill delay={24} bg={C.cream} color={C.ink}>No card</Pill>
          <Pill delay={30} bg={C.red}>Pay only if you love it</Pill>
        </div>
      </div>
      {foods.map((slug, i) => (
        <FloatFood key={slug} slug={slug} x={SIDE - 20 + i * 205} y={830 + (i % 2) * 70} w={230} depth={0.5 + (i % 2) * 0.4} rot={(i - 1.5) * 6} delay={8 + i * 4} />
      ))}
    </AbsoluteFill>
  );
};

export const CheapSite: React.FC = () => (
  <AbsoluteFill style={{ background: "#0d0b0a" }}>
    <TransitionSeries>
      <TransitionSeries.Sequence name="Hook" durationInFrames={80}>
        <Hook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={push()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence name="Most sites" durationInFrames={110}>
        <Cheap />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={push()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence name="Yours" durationInFrames={130}>
        <Yours />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={push()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence name="Offer" durationInFrames={100}>
        <Offer />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={push()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence name="End card (HyperFrames)" durationInFrames={108}>
        <EndCard />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    <Finish />
    <Progress total={CHEAP_FRAMES} />
    <SoundTrack vo={VO.cheap} sfx={CUES.cheap} music="bed-b" total={CHEAP_FRAMES} />
  </AbsoluteFill>
);
