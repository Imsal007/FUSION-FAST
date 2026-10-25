// Render chosen frames of chosen compositions (one bundle) for QA.
import { bundle } from "@remotion/bundler";
import { getCompositions, renderStill } from "@remotion/renderer";
import path from "node:path";
const browserExecutable = "/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
const [out, ...specs] = process.argv.slice(2); // specs like R1-CinderAndBun:40,140
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const comps = await getCompositions(serveUrl, { browserExecutable });
for (const spec of specs) {
  const [id, frames] = spec.split(":");
  const composition = comps.find((c) => c.id === id);
  for (const frame of frames.split(",").map(Number)) {
    await renderStill({ composition, serveUrl, frame, output: `${out}/${id}-${frame}.png`, browserExecutable, chromiumOptions: { gl: "swangle" }, logLevel: "error" });
  }
  console.log("ok", id);
}
