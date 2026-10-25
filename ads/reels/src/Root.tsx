import React from "react";
import { Composition, Folder, Still, continueRender, delayRender } from "remotion";
import { fontsReady } from "./theme";
import { DemoReel, DEMO_REEL_FRAMES } from "./reels/DemoReel";
import { Commission, COMMISSION_FRAMES } from "./reels/Commission";
import { CheapSite, CHEAP_FRAMES } from "./reels/CheapSite";
import { Compilation, COMPILATION_FRAMES } from "./reels/Compilation";
import { STILLS } from "./stills/Stills";
import { Showcase, SHOWCASE_FRAMES } from "./reels/Showcase";

const fontHandle = delayRender("fonts");
fontsReady.then(() => continueRender(fontHandle));

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="R1-CinderAndBun"
        component={DemoReel}
        durationInFrames={DEMO_REEL_FRAMES}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ slug: "cinder-and-bun", hook: "Your burgers\ndeserve a site\nlike *this.*" }}
      />
      <Composition
        id="R2-FornoNero"
        component={DemoReel}
        durationInFrames={DEMO_REEL_FRAMES}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ slug: "forno-nero", hook: "Your pizza\ndeserves a site\nlike *this.*" }}
      />
      <Composition
        id="R3-SaffronLane"
        component={DemoReel}
        durationInFrames={DEMO_REEL_FRAMES}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ slug: "saffron-lane", hook: "Your curries\ndeserve a site\nlike *this.*" }}
      />
      <Composition
        id="R4-SugarAndSteam"
        component={DemoReel}
        durationInFrames={DEMO_REEL_FRAMES}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ slug: "sugar-and-steam", hook: "Your desserts\ndeserve a site\nlike *this.*" }}
      />
      <Composition id="R5-Commission" component={Commission} durationInFrames={COMMISSION_FRAMES} fps={30} width={1080} height={1920} />
      <Composition id="R6-LooksCheap" component={CheapSite} durationInFrames={CHEAP_FRAMES} fps={30} width={1080} height={1920} />
      <Folder name="Stills">
        {STILLS.map(({ id, C }) => (
          <Still key={id} id={id} component={C} width={1080} height={1350} />
        ))}
      </Folder>
      <Composition id="R8-Showcase" component={Showcase} durationInFrames={SHOWCASE_FRAMES} fps={30} width={1080} height={1920} />
      <Composition id="R7-FourDemos" component={Compilation} durationInFrames={COMPILATION_FRAMES} fps={30} width={1080} height={1920} />
    </>
  );
};
