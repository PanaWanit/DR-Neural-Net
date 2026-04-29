import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { AnimatedText } from "../components/AnimatedText";

export const Scene2Situation: React.FC = () => {
  return (
    <AbsoluteFill className="full-screen" style={{ backgroundColor: "#ffffff" }}>
      <div style={{ width: "100%", padding: "40px 80px", backgroundColor: "var(--accent-alert)", color: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <AnimatedText delay={0}>
          <h1 style={{ fontSize: "40px", margin: 0, fontWeight: "600", lineHeight: "1.2" }}>
            Manual grading of Diabetic Retinopathy is time-intensive and highly subjective across the 5 progression stages.
          </h1>
        </AnimatedText>
      </div>

      <div style={{ display: "flex", flex: 1, width: "100%", padding: "60px", gap: "60px", alignItems: "center" }}>
        
        {/* Left: 5 Stages Grid */}
        <AnimatedText delay={60} style={{ flex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {[0, 1, 2, 3, 4].map(stage => (
              <div key={stage} style={{ display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: "var(--bg-secondary)", padding: "15px", borderRadius: "12px", border: "2px solid var(--text-muted)" }}>
                <Img src={staticFile(`dr-stages-img/dr-stage-${stage}.png`)} style={{ width: "160px", height: "160px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" }} />
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "var(--text-main)" }}>Stage {stage}</div>
              </div>
            ))}
          </div>
        </AnimatedText>

        {/* Right: Imbalance Chart */}
        <AnimatedText delay={120} style={{ flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "var(--accent-alert)" }}>The Complication: Severe Imbalance</div>
            <div className="clean-panel" style={{ width: "100%", height: "450px", display: "flex", alignItems: "center", justifyContent: "center", borderColor: "var(--accent-alert)" }}>
              <Img src={staticFile("figure/class_distribution.png")} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
          </div>
        </AnimatedText>

      </div>
    </AbsoluteFill>
  );
};
