import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { C, FONT, FONT_DISPLAY, LP } from "../theme";
import { Logo, Phone } from "../ui";

export type Tone = "cream" | "ink" | "red";
const BG: Record<Tone, string> = { cream: C.cream, ink: C.ink, red: C.red };
const FG: Record<Tone, string> = { cream: C.ink, ink: C.cream, red: C.cream };

/* Static headline: *word* runs in the accent colour. */
export const H: React.FC<{ text: string; size?: number; color?: string; accent?: string; style?: React.CSSProperties }> = ({
  text,
  size = 110,
  color = C.ink,
  accent = C.red,
  style,
}) => {
  let hot = false;
  return (
    <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 900, fontSize: size, lineHeight: 0.95, letterSpacing: "-0.04em", color, ...style }}>
      {text.split("\n").map((line, i) => (
        <div key={i}>
          {line.split(" ").map((raw, j) => {
            if (raw.startsWith("*")) hot = true;
            const on = hot;
            if (raw.endsWith("*")) hot = false;
            return (
              <span key={j} style={{ color: on ? accent : undefined }}>
                {raw.replace(/^\*/, "").replace(/\*$/, "")}{" "}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export const P: React.FC<{ children: React.ReactNode; size?: number; color?: string; weight?: number; style?: React.CSSProperties }> = ({
  children,
  size = 44,
  color = C.soft,
  weight = 400,
  style,
}) => <div style={{ fontFamily: FONT, fontSize: size, fontWeight: weight, lineHeight: 1.32, color, ...style }}>{children}</div>;

export const Tag: React.FC<{ children: React.ReactNode; bg?: string; color?: string; size?: number }> = ({ children, bg = C.ink, color = C.cream, size = 34 }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      padding: `${size * 0.42}px ${size * 0.8}px`,
      borderRadius: 999,
      background: bg,
      color,
      fontFamily: FONT,
      fontWeight: 700,
      fontSize: size,
    }}
  >
    {children}
  </div>
);

/* Frame for every carousel slide and single image: brand mark, content, URL. */
export const Slide: React.FC<{ tone?: Tone; children: React.ReactNode; foot?: string; warm?: boolean }> = ({ tone = "cream", children, foot, warm = true }) => (
  <AbsoluteFill
    style={{
      background: BG[tone],
      backgroundImage:
        tone === "cream" && warm
          ? "radial-gradient(55% 40% at 85% 12%, rgba(255,179,71,.20), transparent 70%), radial-gradient(50% 40% at 10% 95%, rgba(224,35,27,.10), transparent 70%)"
          : undefined,
    }}
  >
    <div style={{ position: "absolute", top: 64, left: 84 }}>
      <Logo variant={tone === "cream" ? "ink" : "cream"} width={170} />
    </div>
    <div style={{ position: "absolute", top: 196, left: 84, right: 84, bottom: 140, color: FG[tone] }}>{children}</div>
    <div
      style={{
        position: "absolute",
        bottom: 60,
        left: 84,
        right: 84,
        display: "flex",
        justifyContent: "space-between",
        fontFamily: FONT,
        fontWeight: 600,
        fontSize: 28,
        color: tone === "cream" ? C.mute : "rgba(244,241,234,.75)",
      }}
    >
      <span>{foot ?? ""}</span>
      <span>{LP}</span>
    </div>
  </AbsoluteFill>
);

export const Shot: React.FC<{ slug: string; kind: "hero" | "peak" | "menu" | "drawer"; width?: number; style?: React.CSSProperties }> = ({
  slug,
  kind,
  width = 520,
  style,
}) => (
  <div style={style}>
    <Phone width={width}>
      <Img src={staticFile(`shots/${slug}-${kind}.jpg`)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    </Phone>
  </div>
);

export const Food: React.FC<{ slug: string; width?: number; style?: React.CSSProperties }> = ({ slug, width = 320, style }) => (
  <Img src={staticFile(`food/${slug}.webp`)} style={{ width, height: "auto", filter: "drop-shadow(0 26px 24px rgba(20,20,20,.35))", ...style }} />
);

/* Last slide of every carousel. */
export const CtaSlide: React.FC<{ line?: string }> = ({ line = "Get your\n*free demo*" }) => (
  <Slide tone="red" warm={false}>
    <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" }}>
      <H text={line} size={150} color={C.cream} accent={C.ink} />
      <P size={46} color="rgba(244,241,234,.92)" style={{ marginTop: 34, maxWidth: 860 }}>
        A website with your name, menu and food, sent to your WhatsApp within 48 hours. Free, no card. Pay only if you love it.
      </P>
      <div style={{ marginTop: 50 }}>
        <Tag bg={C.cream} color={C.ink} size={46}>
          {LP}
        </Tag>
      </div>
    </div>
  </Slide>
);
