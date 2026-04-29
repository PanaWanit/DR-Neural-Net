import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { AnimatedText } from "../components/AnimatedText";

export const Scene6Results: React.FC = () => {
  return (
    <AbsoluteFill className="full-screen">
      <div style={{ width: "100%", padding: "40px 80px", backgroundColor: "var(--accent-teal)", color: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", marginBottom: "60px" }}>
        <AnimatedText delay={0}>
          <h1 style={{ fontSize: "40px", margin: 0, fontWeight: "600", lineHeight: "1.2" }}>
            The model effectively minimizes high-risk diagnostic errors between severe and healthy cases.
          </h1>
        </AnimatedText>
      </div>

      <div style={{ display: "flex", gap: "50px", width: "90%", justifyContent: "center" }}>
        
        {/* Baseline */}
        <AnimatedText delay={60}>
          <div className="clean-panel" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h3 style={{ fontSize: "36px", margin: "0 0 20px 0", color: "var(--accent-alert)" }}>Baseline</h3>
            <Img src={staticFile("figure/baseline_loss_curve.png")} style={{ width: "700px", objectFit: "contain", background: "white", borderRadius: "8px" }} />
          </div>
        </AnimatedText>

        {/* Augmented */}
        <AnimatedText delay={90}>
          <div className="clean-panel" style={{ display: "flex", flexDirection: "column", alignItems: "center", borderColor: "var(--accent-green)" }}>
            <h3 style={{ fontSize: "36px", margin: "0 0 20px 0", color: "var(--accent-green)" }}>With Augmentation</h3>
            <Img src={staticFile("figure/augmented_loss_curve.png")} style={{ width: "700px", objectFit: "contain", background: "white", borderRadius: "8px" }} />
          </div>
        </AnimatedText>

      </div>
    </AbsoluteFill>
  );
};
