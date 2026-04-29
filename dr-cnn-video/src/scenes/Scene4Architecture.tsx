import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { AnimatedText } from "../components/AnimatedText";

export const Scene4Architecture: React.FC = () => {
  return (
    <AbsoluteFill className="full-screen" style={{ backgroundColor: "#ffffff" }}>
      <div style={{ width: "100%", padding: "40px 80px", backgroundColor: "var(--accent-teal)", color: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <AnimatedText delay={0}>
          <h1 style={{ fontSize: "40px", margin: 0, fontWeight: "600", lineHeight: "1.2" }}>
            Robust data augmentation and a deep architecture mitigate the risk of overfitting on imbalanced medical data.
          </h1>
        </AnimatedText>
      </div>

      <div style={{ display: "flex", flex: 1, width: "100%", padding: "60px", gap: "60px", alignItems: "center" }}>
        
        {/* Left: Augmentation */}
        <AnimatedText delay={60} style={{ flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center", backgroundColor: "var(--bg-secondary)", padding: "40px", borderRadius: "16px" }}>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "var(--accent-teal)", marginBottom: "20px" }}>Preprocessing: Gaussian Noise</div>
            <Img src={staticFile("dr-stages-img/dr-stage-4.png")} style={{ width: "300px", borderRadius: "12px", border: "4px solid white" }} />
            <div style={{ fontSize: "30px", fontWeight: "bold", color: "var(--text-muted)" }}>↓</div>
            <Img src={staticFile("dr-stages-img/dr-stage-4.png")} style={{ width: "300px", borderRadius: "12px", border: "4px solid var(--accent-green)", filter: "contrast(1.2) brightness(1.1) sepia(0.3) blur(1px)" }} />
          </div>
        </AnimatedText>

        {/* Right: Architecture Block Diagram */}
        <AnimatedText delay={120} style={{ flex: 1.5 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "var(--accent-teal)", marginBottom: "20px" }}>Coded Architecture Pipeline</div>
            
            <div className="layer-node" style={{ width: "400px" }}>Conv2d(3 → 128, k=5) + SiLU</div>
            <div className="layer-node pool" style={{ width: "400px" }}>MaxPool2d(2)</div>
            
            <div style={{ fontSize: "24px", color: "var(--text-muted)" }}>↓</div>
            
            <div className="layer-node" style={{ width: "400px" }}>Conv2d(128 → 64, k=5) + SiLU</div>
            <div className="layer-node pool" style={{ width: "400px" }}>MaxPool2d(2)</div>

            <div style={{ fontSize: "24px", color: "var(--text-muted)" }}>↓</div>
            
            <div className="layer-node" style={{ width: "400px" }}>Conv2d(64 → 32, k=3) + SiLU</div>
            <div className="layer-node pool" style={{ width: "400px" }}>AdaptiveAvgPool2d((1,1))</div>

          </div>
        </AnimatedText>

      </div>
    </AbsoluteFill>
  );
};
