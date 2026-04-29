import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Audio, Sequence, staticFile } from "remotion";

export const Architecture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const layers = [
    { name: "Input Image (3 Ch)", type: "input" },
    { name: "Conv2D(16) -> ReLU", type: "conv" },
    { name: "MaxPool2D(2)", type: "pool" },
    { name: "Conv2D(32) -> ReLU", type: "conv" },
    { name: "MaxPool2D(2)", type: "pool" },
    { name: "Conv2D(64) -> ReLU", type: "conv" },
    { name: "MaxPool2D(2)", type: "pool" },
    { name: "AdaptiveAvgPool2D", type: "pool" },
    { name: "Flatten", type: "linear" },
    { name: "Linear(5)", type: "linear" },
  ];

  return (
    <AbsoluteFill className="full-screen" style={{ padding: "60px", boxSizing: "border-box" }}>
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", opacity: titleOpacity }}>
        <h1 style={{ fontSize: "60px", margin: "0 0 20px 0", textAlign: "center", color: "var(--accent-teal)" }}>Model Flow</h1>
        
        <div style={{ flex: 1, display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignContent: "center", gap: "15px" }}>
          {layers.map((layer, idx) => {
            const appearFrame = 15 + idx * 8;
            const scale = spring({
              frame: frame - appearFrame,
              fps,
              config: { damping: 12, stiffness: 100 },
            });
            
            const opacity = interpolate(frame, [appearFrame, appearFrame + 5], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            let className = "layer-node";
            if (layer.type === "pool") className += " pool";
            if (layer.type === "linear") className += " linear";

            return (
              <React.Fragment key={idx}>
                <Sequence from={appearFrame} durationInFrames={30}>
                  <Audio src={staticFile("sfx/mouse-click.wav")} volume={0.2} />
                </Sequence>
                <div 
                  className={className} 
                  style={{ 
                    opacity, 
                    transform: `scale(${scale})`,
                    padding: "10px 20px",
                    fontSize: "22px",
                    minWidth: "200px"
                  }}
                >
                  {layer.name}
                </div>
                {idx < layers.length - 1 && (
                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    opacity: interpolate(frame, [appearFrame + 4, appearFrame + 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) 
                  }}>
                    <span style={{ fontSize: "24px", color: "var(--accent-green)" }}>→</span>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
