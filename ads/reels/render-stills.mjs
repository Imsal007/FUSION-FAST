// Bundle once, render every still to ../out/stills as PNG.
import { bundle } from "@remotion/bundler";
import { getCompositions, renderStill } from "@remotion/renderer";
import path from "node:path";
import fs from "node:fs";

const browserExecutable = "/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
const only = process.argv[2];
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const comps = (await getCompositions(serveUrl, { browserExecutable })).filter((c) => c.durationInFrames === 1 && (!only || c.id.startsWith(only)));
fs.mkdirSync("../out/stills", { recursive: true });
for (const composition of comps) {
  await renderStill({ composition, serveUrl, output: `../out/stills/${composition.id}.png`, browserExecutable, chromiumOptions: { gl: "swangle" } });
  console.log("still", composition.id);
}
