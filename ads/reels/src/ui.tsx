import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  OffthreadVideo,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { measureText } from "@remotion/layout-utils";
import { C, FONT, FONT_DISPLAY, FPS, LP, SAFE_W, SIDE, SIDE_R } from "./theme";

export const useSpringIn = (delay = 0, damping = 200) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - delay, fps, config: { damping } });
};

/* Headline whose words rise in one after another. Use "\n" for line breaks and *word* for the accent colour. */
export const Rise: React.FC<{
  text: string;
  delay?: number;
  size?: number;
  color?: string;
  accent?: string;
  align?: "left" | "center";
  stagger?: number;
  lineHeight?: number;
  maxWidth?: number;
  style?: React.CSSProperties;
}> = ({ text, delay = 0, size: wanted = 120, color = C.ink, accent = C.red, align = "left", stagger = 4, lineHeight = 0.94, maxWidth = SAFE_W, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // shrink until the widest line fits the safe width (spaces drawn as 0.22em margins)
  const widest = Math.max(
    ...text.split("\n").map((line) => {
      const plain = line.replace(/\*/g, "");
      const w = measureText({ text: plain, fontFamily: FONT_DISPLAY, fontWeight: "900", fontSize: 100, letterSpacing: "-0.04em" }).width;
      return w + (plain.split(" ").length - 1) * 0.22 * 100;
    }),
  );
  const size = Math.min(wanted, Math.floor((maxWidth / widest) * 100 * 0.97));
  let i = 0;
  let hotOn = false;
  return (
    <div
      style={{
        fontFamily: FONT_DISPLAY,
        fontWeight: 900,
        fontSize: size,
        lineHeight,
        letterSpacing: "-0.04em",
        color,
        textAlign: align,
        ...style,
      }}
    >
      {text.split("\n").map((line, li) => (
        <div key={li} style={{ display: "block", whiteSpace: "nowrap", overflow: "hidden", paddingBottom: "0.12em", marginBottom: "-0.12em" }}>
          {line.split(" ").map((raw, wi) => {
            const opens = raw.startsWith("*");
            const closes = raw.endsWith("*") && (raw.length > 1 || !opens);
            if (opens) hotOn = true;
            const hot = hotOn;
            if (closes) hotOn = false;
            const word = raw.replace(/^\*/, "").replace(/\*$/, "");
            const s = spring({ frame: frame - delay - i++ * stagger, fps, config: { damping: 200, mass: 0.6 } });
            return (
              <span
                key={wi}
                style={{
                  display: "inline-block",
                  marginRight: "0.22em",
                  transform: `translateY(${interpolate(s, [0, 1], [112, 0])}%)`,
                  opacity: Math.min(1, s * 2.5),
                  color: hot ? accent : undefined,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export const Body: React.FC<{ children: React.ReactNode; delay?: number; size?: number; color?: string; style?: React.CSSProperties }> = ({
  children,
  delay = 0,
  size = 46,
  color = C.soft,
  style,
}) => {
  const s = useSpringIn(delay);
  return (
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 400,
        fontSize: size,
        lineHeight: 1.3,
        color,
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [24, 0])}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/* Cream background that never sits still: two soft warm pools drifting slowly. */
export const LivingCream: React.FC<{ tint?: string }> = ({ tint = C.red }) => {
  const f = useCurrentFrame();
  const x1 = 30 + Math.sin(f / 70) * 12;
  const y1 = 70 + Math.cos(f / 90) * 8;
  const x2 = 75 + Math.cos(f / 80) * 10;
  const y2 = 25 + Math.sin(f / 60) * 8;
  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.cream,
        backgroundImage: `radial-gradient(50% 35% at ${x1}% ${y1}%, ${tint}1f, transparent 70%), radial-gradient(45% 30% at ${x2}% ${y2}%, #ffb34724, transparent 70%)`,
      }}
    />
  );
};

export const Progress: React.FC<{ total: number; color?: string }> = ({ total, color = C.red }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "absolute", top: 0, left: 0, height: 10, width: `${(f / total) * 100}%`, background: color, zIndex: 50 }} />
  );
};

/* A phone with the demo site playing inside. */
export const Phone: React.FC<{ width?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ width = 640, children, style }) => {
  const bezel = 16;
  const screenW = width - bezel * 2;
  const screenH = (screenW * 16) / 9;
  return (
    <div
      style={{
        width,
        height: screenH + bezel * 2,
        borderRadius: 74,
        background: "#0e0e0e",
        padding: bezel,
        boxShadow: "0 60px 90px -30px rgba(20,20,20,.55), 0 0 0 2px #2a2a2a inset",
        ...style,
      }}
    >
      <div style={{ width: screenW, height: screenH, borderRadius: 58, overflow: "hidden", position: "relative", background: "#000" }}>{children}</div>
    </div>
  );
};

/* A slice of a recorded demo. from/rate are in seconds of the capture. */
export const DemoClip: React.FC<{ slug: string; from: number; rate?: number; style?: React.CSSProperties }> = ({ slug, from, rate = 1, style }) => (
  <OffthreadVideo
    src={staticFile(`demos/${slug}.mp4`)}
    trimBefore={Math.round(from * FPS)}
    playbackRate={rate}
    muted
    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", ...style }}
  />
);

export const Pill: React.FC<{ children: React.ReactNode; bg?: string; color?: string; size?: number; delay?: number; style?: React.CSSProperties }> = ({
  children,
  bg = C.ink,
  color = C.cream,
  size = 38,
  delay = 0,
  style,
}) => {
  const s = useSpringIn(delay, 14);
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 14,
        padding: `${size * 0.42}px ${size * 0.8}px`,
        borderRadius: 999,
        background: bg,
        color,
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: size,
        letterSpacing: "-0.01em",
        transform: `scale(${interpolate(s, [0, 1], [0.6, 1])})`,
        opacity: Math.min(1, s * 1.4),
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Disclaimer: React.FC<{ name: string; color?: string; style?: React.CSSProperties }> = ({ name, color = C.mute, style }) => (
  <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: 26, color, letterSpacing: "0.02em", ...style }}>
    Concept demo by SAL Digital. {name} is a fictional restaurant.
  </div>
);

/* Order notification that slides down, styled like a chat message (no third-party logo). */
export const OrderCard: React.FC<{ name: string; lines: string[]; total: string; delay?: number; style?: React.CSSProperties }> = ({
  name,
  lines,
  total,
  delay = 0,
  style,
}) => {
  const s = useSpringIn(delay, 16);
  return (
    <div
      style={{
        width: 810,
        borderRadius: 40,
        background: C.white,
        boxShadow: "0 40px 80px -24px rgba(20,20,20,.45)",
        padding: "34px 40px",
        fontFamily: FONT,
        transform: `translateY(${interpolate(s, [0, 1], [-260, 0])}px) scale(${interpolate(s, [0, 1], [0.92, 1])})`,
        opacity: Math.min(1, s * 1.5),
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 18 }}>
        <div style={{ width: 64, height: 64, borderRadius: 20, background: C.wa, display: "grid", placeItems: "center" }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="#fff" aria-hidden>
            <path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4V6a2 2 0 0 1 2-2z" />
          </svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 36, color: C.ink }}>New order on WhatsApp</div>
          <div style={{ fontWeight: 400, fontSize: 28, color: C.mute }}>From {name} website · just now</div>
        </div>
      </div>
      <div style={{ background: "#E7F9EE", borderRadius: 26, padding: "24px 28px", fontSize: 32, lineHeight: 1.4, color: "#0d2a18" }}>
        {lines.map((l) => (
          <div key={l}>{l}</div>
        ))}
        <div style={{ marginTop: 10, fontWeight: 700 }}>Total {total} · pay on collection</div>
        <div>Name: Sam</div>
      </div>
    </div>
  );
};

export const Logo: React.FC<{ variant?: "ink" | "cream"; width?: number; style?: React.CSSProperties }> = ({ variant = "ink", width = 300, style }) => (
  <Img src={staticFile(`brand/logo-${variant}.png`)} style={{ width, height: "auto", display: "block", ...style }} />
);

/* End card: red field, sheen sweep, logo, one clear line, the offer and the URL. */
export const Cta: React.FC<{ line?: string; sub?: string }> = ({
  line = "Get your\n*free demo*",
  sub = "A website with your name, menu and food. Free, no card. Pay only if you love it.",
}) => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const sheen = interpolate(f, [8, 38], [-60, 160], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const urlS = useSpringIn(22, 14);
  const pulse = 1 + Math.sin(f / 6) * 0.015;
  return (
    <AbsoluteFill style={{ background: C.red }}>
      <AbsoluteFill
        style={{
          background: `linear-gradient(105deg, transparent ${sheen - 20}%, rgba(255,255,255,.22) ${sheen}%, transparent ${sheen + 20}%)`,
        }}
      />
      <AbsoluteFill style={{ padding: `0 ${SIDE_R}px 0 ${SIDE}px`, justifyContent: "center", paddingBottom: 420 }}>
        <Logo variant="cream" width={260} style={{ marginBottom: 70 }} />
        <Rise text={line} size={150} color={C.cream} accent={C.ink} delay={4} />
        <Body delay={16} color="rgba(244,241,234,.92)" size={44} style={{ marginTop: 36, maxWidth: 810 }}>
          {sub}
        </Body>
        <div
          style={{
            marginTop: 54,
            alignSelf: "flex-start",
            transform: `scale(${interpolate(urlS, [0, 1], [0.7, 1]) * pulse})`,
            opacity: urlS,
            background: C.cream,
            color: C.ink,
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: 50,
            padding: "26px 46px",
            borderRadius: 999,
          }}
        >
          {LP}
        </div>
      </AbsoluteFill>
      <div style={{ position: "absolute", left: 0, bottom: 0, height: 10, width: `${(f / durationInFrames) * 100}%`, background: C.cream }} />
    </AbsoluteFill>
  );
};

/* Fade a scene in and out at its edges so cuts never pop. */
export const Edges: React.FC<{ children: React.ReactNode; inF?: number; outF?: number }> = ({ children, inF = 8, outF = 8 }) => {
  const f = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const o = Math.min(
    interpolate(f, [0, inF], [0, 1], { extrapolateRight: "clamp" }),
    interpolate(f, [durationInFrames - outF, durationInFrames], [1, 0], { extrapolateLeft: "clamp" }),
  );
  return <AbsoluteFill style={{ opacity: outF === 0 && inF === 0 ? 1 : o }}>{children}</AbsoluteFill>;
};

/* End card made in HyperFrames (ads/hyperframes/endcard), rendered to video and played here. */
export const EndCard: React.FC = () => (
  <AbsoluteFill style={{ background: C.red }}>
    <OffthreadVideo src={staticFile("hf/endcard.mp4")} muted style={{ width: "100%", height: "100%" }} />
  </AbsoluteFill>
);
