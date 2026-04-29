import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const Introduction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const classes = [
    { name: "0: No DR", color: "#4facfe" },
    { name: "1: Mild", color: "#00f2fe" },
    { name: "2: Moderate", color: "#ff0844" },
    { name: "3: Severe", color: "#ffb199" },
    { name: "4: Proliferative DR", color: "#f83600" }
  ];

  return (
    <AbsoluteFill className="full-screen" style={{ padding: "80px", boxSizing: "border-box" }}>
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", opacity: titleOpacity }}>
        <h1 style={{ fontSize: "70px", margin: "0 0 40px 0" }}>What is Diabetic Retinopathy?</h1>
        
        <div className="glass-panel" style={{ flex: 1, display: "flex", flexDirection: "row", gap: "40px" }}>
          <div style={{ flex: 1, fontSize: "36px", lineHeight: 1.5 }}>
            <p>Diabetic retinopathy is a diabetes complication that affects eyes. It's caused by damage to the blood vessels of the light-sensitive tissue at the back of the eye (retina).</p>
            <p>Our objective is to classify fundus images into 5 severity levels:</p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "30px" }}>
              {classes.map((cls, idx) => {
                const itemOpacity = interpolate(frame, [30 + idx * 10, 45 + idx * 10], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                });
                const itemX = interpolate(frame, [30 + idx * 10, 45 + idx * 10], [-50, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                });
                return (
                  <div key={idx} style={{ 
                    opacity: itemOpacity, 
                    transform: `translateX(${itemX}px)`,
                    display: "flex",
                    alignItems: "center",
                    gap: "20px"
                  }}>
                    <div style={{ width: "20px", height: "20px", borderRadius: "50%", backgroundColor: cls.color }} />
                    <span style={{ fontWeight: "bold" }}>{cls.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Placeholder for fundus image grid */}
            <div style={{ 
              width: "100%", 
              height: "100%", 
              border: "2px dashed rgba(255,255,255,0.2)",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              color: "rgba(255,255,255,0.5)"
            }}>
              <span style={{ fontSize: "40px", marginBottom: "20px" }}>📸</span>
              <span>Fundus Image Grid Placeholder</span>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
