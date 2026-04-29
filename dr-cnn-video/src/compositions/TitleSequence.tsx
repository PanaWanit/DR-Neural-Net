import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const TitleSequence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animations
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const titleOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [10, 30], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="full-screen" style={{ backgroundColor: "var(--bg-dark)" }}>
      <div className="title-container" style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>
        <h1 className="title" style={{ transform: `scale(${logoScale})` }}>
          <span className="gradient-text">Diabetic Retinopathy</span>
          <br />
          Classification
        </h1>
        <h2 className="subtitle" style={{ opacity: subtitleOpacity }}>
          Applying Convolutional Neural Networks
        </h2>
      </div>
    </AbsoluteFill>
  );
};
