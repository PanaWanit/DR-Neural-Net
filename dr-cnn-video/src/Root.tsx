import "./index.css";
import { Composition } from "remotion";
import { DRVideo } from "./compositions/DRVideo";
import { TitleSequence } from "./compositions/TitleSequence";
import { Introduction } from "./compositions/Introduction";
import { CNNConcepts } from "./compositions/CNNConcepts";
import { Architecture } from "./compositions/Architecture";
import { CodeWalkthrough } from "./compositions/CodeWalkthrough";

const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DRVideo"
        component={DRVideo}
        durationInFrames={970} // Sum of all scenes (60+180+180+150+400)
        fps={FPS}
        width={1920}
        height={1080}
      />
      {/* Individual testing compositions */}
      <Composition
        id="TitleSequence"
        component={TitleSequence}
        durationInFrames={60}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Introduction"
        component={Introduction}
        durationInFrames={180}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="CNNConcepts"
        component={CNNConcepts}
        durationInFrames={180}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="Architecture"
        component={Architecture}
        durationInFrames={150} 
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="CodeWalkthrough"
        component={CodeWalkthrough}
        durationInFrames={400} 
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
