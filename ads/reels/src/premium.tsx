import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import type { TransitionPresentation, TransitionPresentationComponentProps } from "@remotion/transitions";

export const INK = "#0d0b0a";
export const CREAM_SOFT = "rgba(244,241,234,.78)";
export const HOT = "#FF5148"; // SAL red, lifted for dark backgrounds

/* Cinematic stage: near-black, the restaurant's own food photo blurred behind, a drifting pool of its accent colour. */
export const Stage: React.FC<{ accent?: string; plate?: string; plateOpacity?: number }> = ({ accent = HOT, plate, plateOpacity = 0.5 }) => {
  const f = useCurrentFrame();
  const gx = 50 + Math.sin(f / 55) * 14;
  const gy = 58 + Math.cos(f / 70) * 8;
  return (
    <AbsoluteFill style={{ background: INK, overflow: "hidden" }}>
      {plate ? (
        <Img
          src={staticFile(`plates/${plate}.webp`)}
          style={{
            position: "absolute",
            inset: -80,
            width: "calc(100% + 160px)",
            height: "calc(100% + 160px)",
            objectFit: "cover",
            opacity: plateOpacity,
            transform: `scale(${1.1 + f / 3000})`,
            filter: "saturate(1.2)",
          }}
        />
      ) : null}
      <AbsoluteFill style={{ background: `radial-gradient(60% 42% at ${gx}% ${gy}%, ${accent}55, transparent 70%)` }} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(13,11,10,.92) 0%, rgba(13,11,10,.35) 38%, rgba(13,11,10,.25) 62%, rgba(13,11,10,.85) 100%)" }} />
    </AbsoluteFill>
  );
};

/* Animated film grain and a soft vignette over the whole frame. */
export const Finish: React.FC<{ grain?: number }> = ({ grain = 0.09 }) => {
  const f = useCurrentFrame();
  const seed = Math.floor(f / 2) % 50;
  return (
    <>
      <AbsoluteFill style={{ background: "radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(0,0,0,.42) 100%)", pointerEvents: "none" }} />
      <AbsoluteFill style={{ opacity: grain, mixBlendMode: "overlay", pointerEvents: "none" }}>
        <svg width="100%" height="100%">
          <filter id={`g${seed}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={seed} stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#g${seed})`} />
        </svg>
      </AbsoluteFill>
    </>
  );
};

/* A phone in perspective: it settles from a steep angle to a gentle one, with a glass sheen and a floor shadow. */
export const Phone3D: React.FC<{ width?: number; children: React.ReactNode; from?: number; to?: number; tilt?: number; delay?: number }> = ({
  width = 440,
  children,
  from = -26,
  to = -10,
  tilt = 7,
  delay = 2,
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f - delay, fps, config: { damping: 18, mass: 0.9 } });
  const ry = interpolate(s, [0, 1], [from, to]) + Math.sin(f / 40) * 1.5;
  const rx = tilt + Math.cos(f / 50) * 1.2;
  const y = interpolate(s, [0, 1], [260, 0]) + Math.sin(f / 26) * 6;
  const bezel = 14;
  const screenW = width - bezel * 2;
  const screenH = (screenW * 16) / 9;
  return (
    <div style={{ perspective: 1900, width, height: screenH + bezel * 2 }}>
      <div
        style={{
          position: "absolute",
          left: "8%",
          right: "8%",
          bottom: -46,
          height: 70,
          borderRadius: "50%",
          background: "rgba(0,0,0,.55)",
          filter: "blur(26px)",
          transform: `translateY(${y * 0.3}px) scaleX(${0.9 + s * 0.1})`,
          opacity: s,
        }}
      />
      <div
        style={{
          width,
          height: screenH + bezel * 2,
          borderRadius: 70,
          padding: bezel,
          background: "linear-gradient(145deg, #2b2b2b 0%, #0a0a0a 45%, #1c1c1c 100%)",
          boxShadow: "0 0 0 2px rgba(255,255,255,.08) inset, 0 50px 90px -20px rgba(0,0,0,.7)",
          transform: `translateY(${y}px) rotateX(${rx}deg) rotateY(${ry}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div style={{ position: "relative", width: screenW, height: screenH, borderRadius: 56, overflow: "hidden", background: "#000" }}>
          {children}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(${115 + ry}deg, rgba(255,255,255,.16) 0%, rgba(255,255,255,0) 32%, rgba(255,255,255,0) 70%, rgba(255,255,255,.06) 100%)`,
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
};

/* A dish cutout floating in space, drifting at its own depth. */
export const FloatFood: React.FC<{ slug: string; x: number; y: number; w: number; depth?: number; rot?: number; delay?: number; blur?: number }> = ({
  slug,
  x,
  y,
  w,
  depth = 1,
  rot = 0,
  delay = 0,
  blur = 0,
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f - delay, fps, config: { damping: 16, mass: 1 } });
  return (
    <Img
      src={staticFile(`food/${slug}.webp`)}
      style={{
        position: "absolute",
        left: x,
        top: y + Math.sin(f / (24 + depth * 6)) * 10 * depth - f * 0.25 * depth,
        width: w,
        transform: `scale(${interpolate(s, [0, 1], [0.6, 1])}) rotate(${rot + Math.sin(f / 45) * 3}deg)`,
        opacity: s,
        filter: `drop-shadow(0 40px 40px rgba(0,0,0,.55))${blur ? ` blur(${blur}px)` : ""}`,
      }}
    />
  );
};

/* Transition: the next scene pushes in out of a blur while the last one falls back. */
const PushComp: React.FC<TransitionPresentationComponentProps<Record<string, never>>> = ({ children, presentationDirection, presentationProgress: p }) => {
  const entering = presentationDirection === "entering";
  const scale = entering ? interpolate(p, [0, 1], [1.14, 1]) : interpolate(p, [0, 1], [1, 0.92]);
  const blur = entering ? interpolate(p, [0, 1], [16, 0]) : interpolate(p, [0, 1], [0, 12]);
  const opacity = entering ? interpolate(p, [0, 0.6, 1], [0, 1, 1]) : interpolate(p, [0, 1], [1, 0]);
  return <AbsoluteFill style={{ transform: `scale(${scale})`, filter: `blur(${blur}px)`, opacity }}>{children}</AbsoluteFill>;
};
export const push = (): TransitionPresentation<Record<string, never>> => ({ component: PushComp, props: {} });
