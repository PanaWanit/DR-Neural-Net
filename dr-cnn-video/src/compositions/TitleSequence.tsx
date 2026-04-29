import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Audio, staticFile } from "remotion";

export const TitleSequence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animations
  const logoScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const titleOpacity = interpolate(frame, [10, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [10, 20], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const crossRotation = interpolate(frame, [0, 60], [0, 90]);

  return (
    <AbsoluteFill className="full-screen">
      <Audio src={staticFile("sfx/whoosh.wav")} startFrom={0} volume={0.5} />
      
      <div className="title-container" style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
        {/* Animated Medical Cross */}
        <div style={{ 
          margin: "0 auto 30px auto", 
          width: "100px", 
          height: "100px", 
          position: "relative",
          transform: `scale(${logoScale}) rotate(${crossRotation}deg)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}>
          <div style={{ position: "absolute", width: "100%", height: "30%", backgroundColor: "var(--accent-green)", borderRadius: "10px" }} />
          <div style={{ position: "absolute", width: "30%", height: "100%", backgroundColor: "var(--accent-green)", borderRadius: "10px" }} />
        </div>

        <h1 className="title">
          Diabetic Retinopathy
        </h1>
        <h2 className="subtitle">
          CNN Classification
        </h2>
      </div>
    </AbsoluteFill>
  );
};
