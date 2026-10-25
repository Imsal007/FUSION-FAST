import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// SAL Digital brand, taken from saldigital.co/lp/restaurants
export const C = {
  cream: "#F4F1EA",
  cream2: "#ECE7DD",
  ink: "#141414",
  soft: "#4A4744",
  mute: "#7A746D",
  line: "#DCD4C7",
  red: "#E0231B",
  redDeep: "#B5150F",
  wa: "#25D366",
  white: "#FFFFFF",
};

export const FONT_DISPLAY = "Inter Display";
export const FONT = "Inter";

export const fontsReady = Promise.all([
  loadFont({ family: FONT_DISPLAY, url: staticFile("fonts/InterDisplay-Black.woff2"), weight: "900" }),
  loadFont({ family: FONT, url: staticFile("fonts/Inter-Regular.woff2"), weight: "400" }),
  loadFont({ family: FONT, url: staticFile("fonts/Inter-SemiBold.woff2"), weight: "600" }),
  loadFont({ family: FONT, url: staticFile("fonts/Inter-Bold.woff2"), weight: "700" }),
]);

export const FPS = 30;
export const W = 1080;
export const H = 1920;

// Meta Reels ads cover roughly the top 14% and bottom 35% with UI.
// Key copy lives between SAFE_TOP and SAFE_BOTTOM.
export const SAFE_TOP = 250;
export const SAFE_BOTTOM = 1260;
export const SIDE = 84;

export const LP = "saldigital.co";

export type Demo = {
  slug: string;
  name: string;
  cuisine: string;
  dish: string;
  // colours sampled from the demo site so overlays feel native to each one
  bg: string;
  accent: string;
  // what the recorded taps put in the basket (item 1, item 2, item 1)
  order: { lines: string[]; total: string };
};

export const DEMOS: Record<string, Demo> = {
  "cinder-and-bun": {
    slug: "cinder-and-bun",
    name: "Cinder & Bun",
    cuisine: "Burgers",
    dish: "burger",
    bg: "#0c0a08",
    accent: "#ffc21a",
    order: { lines: ["2 x The Cinder Single (£17.00)", "1 x The Cinder Double (£11.00)"], total: "£28.00" },
  },
  "forno-nero": {
    slug: "forno-nero",
    name: "Forno Nero",
    cuisine: "Pizza",
    dish: "pizza",
    bg: "#f4ecdc",
    accent: "#d6301c",
    order: { lines: ["2 x Margherita (£19.00)", "1 x Marinara (£8.50)"], total: "£27.50" },
  },
  "saffron-lane": {
    slug: "saffron-lane",
    name: "Saffron Lane",
    cuisine: "Indian & Bangladeshi",
    dish: "curry",
    bg: "#0a1a1c",
    accent: "#f2a516",
    order: { lines: ["2 x Chicken Dum Biryani (£23.00)", "1 x Lamb Biryani (£13.50)"], total: "£36.50" },
  },
  "sugar-and-steam": {
    slug: "sugar-and-steam",
    name: "Sugar & Steam",
    cuisine: "Desserts & coffee",
    dish: "dessert",
    bg: "#1b0f0c",
    accent: "#ff8fb1",
    order: { lines: ["2 x Warm Chocolate Brownie (£9.00)", "1 x Glazed Doughnut (£3.20)"], total: "£12.20" },
  },
};

// Moments inside each 19.8s capture (seconds)
export const CAP = {
  heroStart: 0.4,
  heroEnd: 5.0,
  bdStart: 5.7,
  bdPeak: 9.7,
  bdPeakEnd: 11.8,
  bdOutro: 12.8,
  menu: 14.4,
  drawer: 16.9,
  end: 19.7,
};
