import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const Architecture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const layers = [
    { name: "Input Image (3 Channels)", type: "input" },
    { name: "Conv2D (16) + ReLU", type: "conv" },
    { name: "MaxPool2D", type: "pool" },
    { name: "Conv2D (32) + ReLU", type: "conv" },
    { name: "MaxPool2D", type: "pool" },
    { name: "Conv2D (64) + ReLU", type: "conv" },
    { name: "MaxPool2D", type: "pool" },
    { name: "AdaptiveAvgPool2D", type: "pool" },
    { name: "Flatten", type: "linear" },
    { name: "Linear (5 Classes)", type: "linear" },
  ];

  return (
    <AbsoluteFill className="full-screen" style={{ padding: "60px", boxSizing: "border-box" }}>
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", opacity: titleOpacity }}>
        <h1 style={{ fontSize: "60px", margin: "0 0 20px 0", textAlign: "center" }} className="gradient-text">Model Architecture</h1>
        
        <div style={{ flex: 1, display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignContent: "center", gap: "20px" }}>
          {layers.map((layer, idx) => {
            const appearFrame = 15 + idx * 10;
            const scale = spring({
              frame: frame - appearFrame,
              fps,
              config: { damping: 12, stiffness: 100 },
            });
            
            const opacity = interpolate(frame, [appearFrame, appearFrame + 10], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            let className = "layer-node";
            if (layer.type === "pool") className += " pool";
            if (layer.type === "linear") className += " linear";

            return (
              <React.Fragment key={idx}>
                <div 
                  className={className} 
                  style={{ 
                    opacity, 
                    transform: `scale(${scale})`,
                  }}
                >
                  {layer.name}
                </div>
                {idx < layers.length - 1 && (
                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    opacity: interpolate(frame, [appearFrame + 5, appearFrame + 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) 
                  }}>
                    <span style={{ fontSize: "40px", color: "rgba(255,255,255,0.3)" }}>➡️</span>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Mock Code Walkthrough Overlay (appears later) */}
        <div style={{ 
          position: "absolute", bottom: "40px", right: "40px", 
          opacity: interpolate(frame, [150, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
          transform: `translateY(${interpolate(frame, [150, 170], [50, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`
        }}>
          <div className="glass-panel" style={{ padding: "30px", borderLeft: "5px solid var(--accent-blue)" }}>
            <h3 style={{ margin: "0 0 10px 0", color: "var(--accent-blue)" }}>Code Ready</h3>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.7)" }}>Actual PyTorch implementation will be integrated here.</p>
          </div>
        </div>

      </div>
    </AbsoluteFill>
  );
};
