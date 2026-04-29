import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Audio, Sequence, staticFile } from "remotion";

export const Introduction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const classes = [
    { name: "0: No DR", color: "#10b981" },
    { name: "1: Mild", color: "#84cc16" },
    { name: "2: Moderate", color: "#eab308" },
    { name: "3: Severe", color: "#f97316" },
    { name: "4: Proliferative", color: "#ef4444" }
  ];

  return (
    <AbsoluteFill className="full-screen" style={{ padding: "80px", boxSizing: "border-box" }}>
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", opacity: titleOpacity }}>
        <h1 style={{ fontSize: "70px", margin: "0 0 80px 0", textAlign: "center", color: "var(--accent-teal)" }}>Severity Scale</h1>
        
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          {/* Base Line */}
          <div style={{ 
            position: "absolute", width: "80%", height: "8px", backgroundColor: "var(--bg-secondary)", borderRadius: "4px", zIndex: 1 
          }} />
          
          {/* Active Line */}
          <div style={{ 
            position: "absolute", left: "10%", width: `${interpolate(frame, [30, 80], [0, 80], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})}%`, 
            height: "8px", backgroundColor: "var(--text-muted)", borderRadius: "4px", zIndex: 2 
          }} />

          {/* Nodes */}
          <div style={{ width: "80%", display: "flex", justifyContent: "space-between", zIndex: 3, position: "absolute" }}>
            {classes.map((cls, idx) => {
              const appearFrame = 30 + idx * 12;
              const nodeScale = spring({
                frame: frame - appearFrame,
                fps,
                config: { damping: 12, stiffness: 100 },
              });
              
              const labelOpacity = interpolate(frame, [appearFrame + 5, appearFrame + 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

              return (
                <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
                  <Sequence from={appearFrame} durationInFrames={30}>
                    <Audio src={staticFile("sfx/ding.wav")} volume={0.4} />
                  </Sequence>
                  
                  {/* Node Circle */}
                  <div style={{ 
                    width: "40px", height: "40px", borderRadius: "50%", 
                    backgroundColor: cls.color, 
                    border: "4px solid var(--bg-primary)",
                    transform: `scale(${nodeScale})`,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                  }} />
                  
                  {/* Label */}
                  <div style={{ 
                    position: "absolute", top: "60px", width: "150px", textAlign: "center",
                    opacity: labelOpacity, fontWeight: "bold", fontSize: "24px"
                  }}>
                    {cls.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
