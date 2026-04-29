import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const CNNConcepts: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const convOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const poolOpacity = interpolate(frame, [45, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="full-screen" style={{ padding: "80px", boxSizing: "border-box" }}>
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", opacity: titleOpacity }}>
        <h1 style={{ fontSize: "70px", margin: "0 0 40px 0" }} className="gradient-text-blue">Why CNNs?</h1>
        
        <div style={{ flex: 1, display: "flex", flexDirection: "row", gap: "40px" }}>
          
          {/* Convolution Box */}
          <div className="glass-panel" style={{ flex: 1, opacity: convOpacity, transform: `scale(${interpolate(frame, [15,30], [0.9, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})})` }}>
            <h2 style={{ color: "var(--accent-blue)", fontSize: "40px", marginTop: 0 }}>Convolution</h2>
            <p style={{ fontSize: "28px", lineHeight: 1.6 }}>
              Extracts features from the image (edges, textures, patterns) using learnable filters (kernels).
            </p>
            <div style={{ 
              width: "100%", height: "200px", marginTop: "40px",
              background: "linear-gradient(45deg, rgba(0, 229, 255, 0.1), transparent)",
              border: "1px solid rgba(0, 229, 255, 0.3)",
              borderRadius: "10px",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <span style={{ fontSize: "60px" }}>🔍</span>
            </div>
          </div>

          {/* Pooling Box */}
          <div className="glass-panel" style={{ flex: 1, opacity: poolOpacity, transform: `scale(${interpolate(frame, [45,60], [0.9, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})})` }}>
            <h2 style={{ color: "var(--accent-pink)", fontSize: "40px", marginTop: 0 }}>Pooling</h2>
            <p style={{ fontSize: "28px", lineHeight: 1.6 }}>
              Reduces spatial dimensions, making the representation smaller and more manageable while retaining important information.
            </p>
            <div style={{ 
              width: "100%", height: "200px", marginTop: "40px",
              background: "linear-gradient(45deg, rgba(255, 0, 123, 0.1), transparent)",
              border: "1px solid rgba(255, 0, 123, 0.3)",
              borderRadius: "10px",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <span style={{ fontSize: "60px" }}>📉</span>
            </div>
          </div>

        </div>
      </div>
    </AbsoluteFill>
  );
};
