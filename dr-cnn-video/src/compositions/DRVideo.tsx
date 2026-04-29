import { Series } from "remotion";
import { Scene0Cover } from "../scenes/Scene0Cover";
import { Scene1ExecSummary } from "../scenes/Scene1ExecSummary";
import { Scene2Situation } from "../scenes/Scene2Situation";
import { Scene3Methodology } from "../scenes/Scene3Methodology";
import { Scene4Architecture } from "../scenes/Scene4Architecture";
import { Scene5Classification } from "../scenes/Scene5Classification";
import { Scene6Results } from "../scenes/Scene6Results";
import { Scene7Strategic } from "../scenes/Scene7Strategic";

export const DRVideo: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={450}>
        <Scene0Cover />
      </Series.Sequence>
      <Series.Sequence durationInFrames={1800}>
        <Scene1ExecSummary />
      </Series.Sequence>
      <Series.Sequence durationInFrames={2700}>
        <Scene2Situation />
      </Series.Sequence>
      <Series.Sequence durationInFrames={3600}>
        <Scene3Methodology />
      </Series.Sequence>
      <Series.Sequence durationInFrames={3600}>
        <Scene4Architecture />
      </Series.Sequence>
      <Series.Sequence durationInFrames={2700}>
        <Scene5Classification />
      </Series.Sequence>
      <Series.Sequence durationInFrames={2250}>
        <Scene6Results />
      </Series.Sequence>
      <Series.Sequence durationInFrames={900}>
        <Scene7Strategic />
      </Series.Sequence>
    </Series>
  );
};
