import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { C, CAP, SAFE_TOP, SIDE } from "../theme";
import { Cta, DemoClip, Disclaimer, LivingCream, Phone, Pill, Progress, Rise, useSpringIn } from "../ui";

const T = 8;
export const CHEAP_FRAMES = 80 + 110 + 130 + 100 + 100 - 4 * T;

const Hook: React.FC = () => (
  <AbsoluteFill style={{ background: C.ink }}>
    <div style={{ position: "absolute", top: SAFE_TOP + 40, left: SIDE, right: SIDE }}>
      <Rise text={"Nobody orders\nfrom a website\nthat looks *cheap.*"} size={118} color={C.cream} accent="#FF5148" stagger={3} />
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
  const s = useSpringIn(4, 18);
  const stamp = useSpringIn(52, 10);
  return (
    <AbsoluteFill>
      <LivingCream />
      <div style={{ position: "absolute", top: SAFE_TOP - 20, left: SIDE, right: SIDE }}>
        <Rise text={"Most takeaway sites\nlook like this."} size={96} />
      </div>
      <div style={{ position: "absolute", left: "50%", top: 640, transform: `translateX(-50%) translateY(${interpolate(s, [0, 1], [220, 0])}px) rotate(2deg)` }}>
        <Phone width={620}>
          <TiredSite />
        </Phone>
      </div>
      <div
        style={{
          position: "absolute",
          top: 980,
          left: 250,
          border: `10px solid ${C.red}`,
          color: C.red,
          fontFamily: "Inter Display",
          fontWeight: 900,
          fontSize: 110,
          letterSpacing: "-0.03em",
          padding: "6px 34px",
          borderRadius: 24,
          background: "rgba(244,241,234,.86)",
          transform: `rotate(-12deg) scale(${interpolate(stamp, [0, 1], [2.2, 1])})`,
          opacity: stamp,
        }}
      >
        LOOKS CHEAP
      </div>
    </AbsoluteFill>
  );
};

const Yours: React.FC = () => {
  const s = useSpringIn(4, 18);
  return (
    <AbsoluteFill>
      <LivingCream tint="#f2a516" />
      <div style={{ position: "absolute", top: SAFE_TOP - 20, left: SIDE, right: SIDE }}>
        <Rise text={"Yours could look\nlike *this.*"} size={104} />
        <Disclaimer name="Saffron Lane" style={{ marginTop: 20, fontSize: 28 }} />
      </div>
      <div style={{ position: "absolute", left: "50%", top: 660, transform: `translateX(-50%) translateY(${interpolate(s, [0, 1], [220, 0])}px) rotate(-1.5deg)` }}>
        <Phone width={630}>
          <DemoClip slug="saffron-lane" from={CAP.heroStart} rate={1} />
        </Phone>
      </div>
    </AbsoluteFill>
  );
};

const Offer: React.FC = () => {
  const f = useCurrentFrame();
  const foods = ["cinder-and-bun", "forno-nero", "saffron-lane", "sugar-and-steam"];
  return (
    <AbsoluteFill>
      <LivingCream />
      <div style={{ position: "absolute", top: SAFE_TOP - 20, left: SIDE, right: SIDE }}>
        <Rise text={"A free demo with\nyour name, menu\nand *food.*"} size={100} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 18, marginTop: 50 }}>
          <Pill delay={18}>Ready in 48 hours</Pill>
          <Pill delay={24}>No card</Pill>
          <Pill delay={30} bg={C.red}>Pay only if you love it</Pill>
        </div>
      </div>
      {foods.map((slug, i) => {
        const x = 60 + i * 250;
        const y = 1010 + Math.sin(f / 18 + i) * 14 + (i % 2) * 70;
        const s = interpolate(f, [10 + i * 5, 26 + i * 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <Img
            key={slug}
            src={staticFile(`food/${slug}.webp`)}
            style={{ position: "absolute", left: x, top: y, width: 230, transform: `scale(${s}) rotate(${(i - 1.5) * 6}deg)`, filter: "drop-shadow(0 24px 22px rgba(20,20,20,.35))" }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const CheapSite: React.FC = () => (
  <AbsoluteFill style={{ background: C.cream }}>
    <TransitionSeries>
      <TransitionSeries.Sequence name="Hook" durationInFrames={80}>
        <Hook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence name="Most sites" durationInFrames={110}>
        <Cheap />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence name="Yours" durationInFrames={130}>
        <Yours />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence name="Offer" durationInFrames={100}>
        <Offer />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence name="CTA" durationInFrames={100}>
        <Cta />
      </TransitionSeries.Sequence>
    </TransitionSeries>
    <Progress total={CHEAP_FRAMES} />
  </AbsoluteFill>
);
