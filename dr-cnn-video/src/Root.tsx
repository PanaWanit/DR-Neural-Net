import "./index.css";
import { Composition } from "remotion";
import { DRVideo } from "./compositions/DRVideo";

const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="DRVideo"
        component={DRVideo}
        durationInFrames={9000} // 5 minutes at 30 fps
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
