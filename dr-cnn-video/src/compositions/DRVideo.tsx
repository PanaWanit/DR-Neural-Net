import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { TitleSequence } from "./TitleSequence";
import { Introduction } from "./Introduction";
import { CNNConcepts } from "./CNNConcepts";
import { Architecture } from "./Architecture";
import { CodeWalkthrough } from "./CodeWalkthrough";

export const DRVideo: React.FC = () => {
  const FPS = 30;
  
  // Define sequence durations in frames
  const titleDuration = 60; // 2 seconds
  const introDuration = 180; // 6 seconds
  const cnnConceptsDuration = 180; // 6 seconds
  const archDuration = 150; // 5 seconds
  const codeDuration = 400; // ~13 seconds

  return (
    <AbsoluteFill style={{ backgroundColor: "var(--bg-primary)" }}>
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

      <Sequence from={titleDuration + introDuration + cnnConceptsDuration + archDuration} durationInFrames={codeDuration}>
        <CodeWalkthrough />
      </Sequence>
    </AbsoluteFill>
  );
};
