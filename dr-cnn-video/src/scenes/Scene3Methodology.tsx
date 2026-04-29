import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { AnimatedText } from "../components/AnimatedText";

export const Scene3Methodology: React.FC = () => {
  const frame = useCurrentFrame();

  const moveX = interpolate(frame % 60, [0, 60], [0, 200]);
  const moveY = Math.floor((frame % 180) / 60) * 100;

  return (
    <AbsoluteFill className="full-screen" style={{ backgroundColor: "#ffffff" }}>
      <div style={{ width: "100%", padding: "40px 80px", backgroundColor: "var(--accent-teal)", color: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <AnimatedText delay={0}>
          <h1 style={{ fontSize: "40px", margin: 0, fontWeight: "600", lineHeight: "1.2" }}>
            Convolutional layers efficiently extract spatial hierarchies, identifying critical microaneurysms that standard networks miss.
          </h1>
        </AnimatedText>
      </div>

      <div style={{ display: "flex", flex: 1, width: "100%", alignItems: "center", justifyContent: "center", gap: "100px" }}>
        
        {/* Visual: Sliding Kernel */}
        <AnimatedText delay={60}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "30px" }}>
            <div style={{ 
              width: "400px", height: "400px", 
              border: "2px solid var(--accent-green)", 
              position: "relative",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gridTemplateRows: "repeat(4, 1fr)",
              background: "rgba(16, 185, 129, 0.05)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.05)"
            }}>
              {Array.from({length: 16}).map((_, i) => (
                <div key={i} style={{ border: "1px solid rgba(16, 185, 129, 0.2)" }} />
              ))}
              
              <div style={{
                position: "absolute",
                width: "100px", height: "100px",
                backgroundColor: "rgba(16, 185, 129, 0.4)",
                border: "4px solid var(--accent-teal)",
                transform: `translate(${moveX}px, ${moveY}px)`,
                boxShadow: "0 0 20px rgba(16, 185, 129, 0.5)"
              }} />
            </div>
            <div style={{ fontSize: "28px", fontWeight: "bold", color: "var(--text-main)" }}>Parameter Sharing & Local Receptive Fields</div>
          </div>
        </AnimatedText>

        <AnimatedText delay={120}>
          <div style={{ width: "500px", fontSize: "28px", lineHeight: "1.6", color: "var(--text-muted)", backgroundColor: "var(--bg-secondary)", padding: "40px", borderRadius: "16px", borderLeft: "8px solid var(--accent-teal)" }}>
            <strong>Why CNNs?</strong><br/><br/>
            Instead of flattening an image and losing spatial context, convolutions preserve the 2D geometry.<br/><br/>
            Filters slide across the image, learning to detect edges, then vessels, and finally complex lesions like hemorrhages.
          </div>
        </AnimatedText>

      </div>
    </AbsoluteFill>
  );
};
