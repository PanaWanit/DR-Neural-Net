import "./index.css";
import { Composition } from "remotion";
import { DRVideo } from "./compositions/DRVideo";
import { TitleSequence } from "./compositions/TitleSequence";
import { Introduction } from "./compositions/Introduction";
import { CNNConcepts } from "./compositions/CNNConcepts";
import { Architecture } from "./compositions/Architecture";

// 140 seconds total at 30fps = 4200 frames
const FPS = 30;
const DURATION_IN_FRAMES = 140 * FPS;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DRVideo"
        component={DRVideo}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={1920}
        height={1080}
      />
      {/* Individual testing compositions */}
      <Composition
        id="TitleSequence"
        component={TitleSequence}
        durationInFrames={10 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Introduction"
        component={Introduction}
        durationInFrames={30 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="CNNConcepts"
        component={CNNConcepts}
        durationInFrames={30 * FPS}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Architecture"
        component={Architecture}
        durationInFrames={70 * FPS} // Including mock code walkthrough and outro
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
