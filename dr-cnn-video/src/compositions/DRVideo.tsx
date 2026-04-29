import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { TitleSequence } from "./TitleSequence";
import { Introduction } from "./Introduction";
import { CNNConcepts } from "./CNNConcepts";
import { Architecture } from "./Architecture";

export const DRVideo: React.FC = () => {
  const FPS = 30;
  
  // Define sequence durations in frames
  const titleDuration = 10 * FPS;
  const introDuration = 30 * FPS;
  const cnnConceptsDuration = 30 * FPS;
  const archDuration = 70 * FPS;

  return (
    <AbsoluteFill style={{ backgroundColor: "var(--bg-dark)" }}>
      <Sequence from={0} durationInFrames={titleDuration}>
        <TitleSequence />
      </Sequence>
      
      <Sequence from={titleDuration} durationInFrames={introDuration}>
        <Introduction />
      </Sequence>
      
      <Sequence from={titleDuration + introDuration} durationInFrames={cnnConceptsDuration}>
        <CNNConcepts />
      </Sequence>
      
      <Sequence from={titleDuration + introDuration + cnnConceptsDuration} durationInFrames={archDuration}>
        <Architecture />
      </Sequence>
    </AbsoluteFill>
  );
};
