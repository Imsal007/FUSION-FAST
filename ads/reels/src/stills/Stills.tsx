import { AbsoluteFill as AF } from "remotion";
import { FloatFood, Finish, Phone3D, Stage } from "../premium";
import { Img as RImg, staticFile as sf } from "remotion";
import { Logo } from "../ui";
import React from "react";
import { C, DEMOS, FONT } from "../theme";
import { OrderCard } from "../ui";
import { CtaSlide, Food, H, P, Shot, Slide, Tag } from "./kit";

const FOOT = "Example at 30% commission";
const Mid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>{children}</div>
);
const NOTE = "Concept demo. Restaurant is fictional.";
const SLUGS = ["cinder-and-bun", "forno-nero", "saffron-lane", "sugar-and-steam"];

/* ---------- Carousel 1: what 30% really costs ---------- */
const C1 = [
  () => (
    <Slide>
      <H text={"What *30%*\ncommission\nreally costs\nyour takeaway"} size={128} />
      <P size={44} style={{ marginTop: 40, maxWidth: 760 }}>
        The maths most owners never sit down and do. Swipe through.
      </P>
      <div style={{ position: "absolute", right: -30, bottom: -20, display: "flex", alignItems: "flex-end" }}>
        <Food slug="saffron-lane" width={330} style={{ transform: "rotate(-6deg)" }} />
        <Food slug="cinder-and-bun" width={330} style={{ marginLeft: -40, transform: "rotate(7deg)" }} />
      </div>
    </Slide>
  ),
  () => (
    <Slide foot={FOOT}>
      <Mid><P size={52} color={C.soft}>Say you take</P>
      <H text={"£2,000"} size={260} style={{ marginTop: 10 }} />
      <P size={52} color={C.soft} style={{ marginTop: 10 }}>a week through the delivery apps.</P></Mid>
    </Slide>
  ),
  () => (
    <Slide tone="ink" foot={FOOT}>
      <Mid><P size={52} color="rgba(244,241,234,.75)">At 30%, the apps keep</P>
      <H text={"£600"} size={300} color={C.cream} style={{ marginTop: 10 }} />
      <P size={52} color={C.cream} weight={600} style={{ marginTop: 10 }}>every single week.</P></Mid>
    </Slide>
  ),
  () => (
    <Slide tone="ink" foot={FOOT}>
      <Mid><P size={52} color="rgba(244,241,234,.75)">Over a year that is</P>
      <H text={"£31,200"} size={230} color="#FF5148" style={{ marginTop: 10 }} />
      <P size={52} color={C.cream} weight={600} style={{ marginTop: 10 }}>gone before you pay rent, staff or stock.</P>
      <P size={30} color="rgba(244,241,234,.55)" style={{ marginTop: 50 }}>UK delivery apps typically charge 15% to 35%.</P></Mid>
    </Slide>
  ),
  () => (
    <Slide foot={FOOT}>
      <Mid><H text={"Move *1 in 4*\norders to your\nown website"} size={112} />
      <P size={52} color={C.soft} style={{ marginTop: 60 }}>and you keep about</P>
      <H text={"£7,800"} size={240} style={{ marginTop: 6 }} />
      <P size={44} color={C.soft} style={{ marginTop: 6 }}>a year. No commission on direct orders.</P></Mid>
    </Slide>
  ),
  () => <CtaSlide />,
];

/* ---------- Carousel 2: five things a takeaway website needs ---------- */
const Thing: React.FC<{ n: number; title: string; body: string; children: React.ReactNode; tone?: "cream" | "ink"; stack?: boolean }> = ({ n, title, body, children, tone = "cream", stack }) =>
  stack ? (
    <Slide tone={tone} foot={NOTE}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 30 }}>
        <div style={{ fontFamily: "Inter Display", fontWeight: 900, fontSize: 150, color: C.red, lineHeight: 0.9 }}>{n}</div>
        <H text={title} size={84} color={tone === "ink" ? C.cream : C.ink} />
      </div>
      <P size={40} color={tone === "ink" ? "rgba(244,241,234,.75)" : C.soft} style={{ marginTop: 26, maxWidth: 820 }}>
        {body}
      </P>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 20, display: "flex", justifyContent: "center" }}>{children}</div>
    </Slide>
  ) : (
  <Slide tone={tone} foot={NOTE}>
    <div style={{ display: "flex", gap: 40, height: "100%" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontFamily: "Inter Display", fontWeight: 900, fontSize: 150, color: C.red, lineHeight: 0.9 }}>{n}</div>
        <H text={title} size={76} color={tone === "ink" ? C.cream : C.ink} style={{ marginTop: 24 }} />
        <P size={38} color={tone === "ink" ? "rgba(244,241,234,.75)" : C.soft} style={{ marginTop: 22 }}>
          {body}
        </P>
      </div>
      <div style={{ width: 430, display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</div>
    </div>
  </Slide>
);

const C2 = [
  () => (
    <Slide>
      <H text={"5 things your\ntakeaway\nwebsite *needs*"} size={132} />
      <P size={44} style={{ marginTop: 40, maxWidth: 760 }}>
        Check your own website against this list.
      </P>
      <div style={{ position: "absolute", right: -40, bottom: -30, display: "flex" }}>
        <Food slug="cinder-and-bun" width={330} style={{ transform: "rotate(-8deg)" }} />
        <Food slug="forno-nero" width={360} style={{ marginLeft: -60, marginTop: 60, transform: "rotate(6deg)" }} />
      </div>
    </Slide>
  ),
  () => (
    <Thing n={1} title={"Ordering in\ntwo taps"} body="Tap a dish, tap send. No account, no app download, no forms.">
      <Shot slug="cinder-and-bun" kind="menu" width={420} />
    </Thing>
  ),
  () => (
    <Thing n={2} stack title={"Orders straight\nto WhatsApp"} body="The full order, total and name land in your chat. Paid when they collect.">
      <div style={{ transform: "scale(1)", transformOrigin: "center" }}>
        <OrderCard name="Saffron Lane" lines={DEMOS["saffron-lane"].order.lines} total={DEMOS["saffron-lane"].order.total} delay={-30} />
      </div>
    </Thing>
  ),
  () => (
    <Thing n={3} title={"Looks as good\nas your food"} body="Real photos and motion that make people hungry before they scroll." tone="ink">
      <Shot slug="sugar-and-steam" kind="peak" width={420} />
    </Thing>
  ),
  () => (
    <Thing n={4} title={"Made for\nphones first"} body="Your customers order from their phones. Your site should feel like an app.">
      <Shot slug="forno-nero" kind="hero" width={420} />
    </Thing>
  ),
  () => (
    <Thing n={5} stack title={"Ready for\nGoogle"} body="Menu, hours and location set up so people searching nearby can find you.">
      <div style={{ width: 760, borderRadius: 40, background: C.white, padding: 46, boxShadow: "0 40px 70px -28px rgba(20,20,20,.4)", fontFamily: FONT }}>
        <div style={{ fontSize: 30, color: C.mute }}>takeaway near me</div>
        <div style={{ height: 2, background: C.line, margin: "18px 0" }} />
        <div style={{ fontSize: 38, fontWeight: 700, color: C.ink }}>Your Takeaway</div>
        <div style={{ fontSize: 28, color: C.soft, marginTop: 8 }}>Open now · Menu · Order online</div>
        <div style={{ display: "flex", gap: 12, marginTop: 22 }}>
          <Tag size={26}>Order</Tag>
          <Tag size={26} bg={C.cream2} color={C.ink}>
            Directions
          </Tag>
        </div>
      </div>
    </Thing>
  ),
  () => <CtaSlide />,
];

/* ---------- Carousel 3: swipe through four demos ---------- */
const C3 = [
  () => (
    <Slide>
      <H text={"4 restaurants.\n4 *websites.*"} size={132} />
      <P size={40} style={{ marginTop: 30 }}>Concept demos by SAL Digital. Swipe through, then picture yours.</P>
      <div style={{ position: "absolute", left: -10, right: -10, bottom: 20, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        {SLUGS.map((s, i) => (
          <Food key={s} slug={s} width={250} style={{ transform: `rotate(${(i - 1.5) * 6}deg)`, marginBottom: (i % 2) * 70 }} />
        ))}
      </div>
    </Slide>
  ),
  ...SLUGS.map((slug) => () => {
    const d = DEMOS[slug];
    return (
      <Slide foot={NOTE}>
        <div style={{ display: "flex", gap: 40, height: "100%", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <Tag bg={C.ink} size={32}>
              <span style={{ width: 16, height: 16, borderRadius: 8, background: d.accent, display: "inline-block" }} />
              {d.cuisine}
            </Tag>
            <H text={d.name} size={104} style={{ marginTop: 30 }} />
            <P size={38} style={{ marginTop: 24 }}>
              A dish that comes apart as you scroll, a full menu and orders that go straight to WhatsApp.
            </P>
          </div>
          <Shot slug={slug} kind="peak" width={430} />
        </div>
      </Slide>
    );
  }),
  () => <CtaSlide line={"Want one\nfor *yours?*"} />,
];

/* ---------- Single images ---------- */
const HOOK: Record<string, string> = {
  "cinder-and-bun": "Your burgers\ndeserve *this.*",
  "forno-nero": "Your pizza\ndeserves *this.*",
  "saffron-lane": "Your curries\ndeserve *this.*",
  "sugar-and-steam": "Your desserts\ndeserve *this.*",
};

const Single: React.FC<{ slug: string }> = ({ slug }) => (
  <Slide foot={`Concept demo. ${DEMOS[slug].name} is fictional.`}>
    <H text={HOOK[slug]} size={124} />
    <P size={40} style={{ marginTop: 26, maxWidth: 450 }}>
      A website with your menu, motion and WhatsApp ordering. Free demo in 48 hours.
    </P>
    <div style={{ marginTop: 40 }}>
      <Tag bg={C.red} size={40}>
        Get your free demo
      </Tag>
    </div>
    <Shot slug={slug} kind="peak" width={420} style={{ position: "absolute", right: -40, top: 270, transform: "rotate(4deg)" }} />
    <Food slug={slug} width={330} style={{ position: "absolute", left: 20, bottom: -10, transform: "rotate(-6deg)" }} />
  </Slide>
);

export const STILLS: { id: string; C: React.FC }[] = [
  ...C1.map((C, i) => ({ id: `C1-Commission-${i + 1}`, C })),
  ...C2.map((C, i) => ({ id: `C2-FiveThings-${i + 1}`, C })),
  ...C3.map((C, i) => ({ id: `C3-FourDemos-${i + 1}`, C })),
  ...SLUGS.map((slug, i) => ({ id: `S${i + 1}-${DEMOS[slug].name.replace(/[^A-Za-z]/g, "")}`, C: () => <Single slug={slug} /> })),
];

/* ---------- Premium dark single images (same look as the reels) ---------- */

const DarkSingle: React.FC<{ slug: string }> = ({ slug }) => {
  const d = DEMOS[slug];
  return (
      <AF style={{ background: "#0d0b0a" }}>
        <Stage accent={d.accent} plate={slug} plateOpacity={0.55} />
        <FloatFood slug={slug} x={-30} y={960} w={slug === "saffron-lane" || slug === "sugar-and-steam" ? 290 : 420} depth={0.5} rot={-8} delay={-70} />
        <div style={{ position: "absolute", right: 30, top: 300 }}>
          <Phone3D width={430} from={-24} to={-12} tilt={6} delay={-70}>
            <RImg src={sf(`shots/${slug}-peak.jpg`)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </Phone3D>
        </div>
        <div style={{ position: "absolute", top: 64, left: 84 }}>
          <Logo variant="cream" width={170} />
        </div>
        <div style={{ position: "absolute", top: 200, left: 84, width: 560 }}>
          <H text={HOOK[slug]} size={112} color={C.cream} accent={d.accent} />
          <P size={38} color="rgba(244,241,234,.8)" style={{ marginTop: 24, maxWidth: 470 }}>
            A website with your menu, motion and WhatsApp ordering. Free demo in 48 hours.
          </P>
          <div style={{ marginTop: 34 }}>
            <Tag bg={C.red} size={38}>Get your free demo</Tag>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 50, right: 70, textAlign: "right", fontFamily: FONT, fontWeight: 600, fontSize: 26, lineHeight: 1.5, color: "rgba(244,241,234,.6)" }}>
          <div>Concept demo. {d.name} is fictional.</div>
          <div style={{ color: C.cream, fontSize: 30 }}>saldigital.co</div>
        </div>
        <Finish grain={0.07} />
      </AF>
  );
};

STILLS.push(...SLUGS.map((slug, i) => ({ id: `S${i + 5}-Dark-${DEMOS[slug].name.replace(/[^A-Za-z]/g, "")}`, C: () => <DarkSingle slug={slug} /> })));
