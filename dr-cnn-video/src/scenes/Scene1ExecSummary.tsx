import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { AnimatedText } from "../components/AnimatedText";

export const Scene1ExecSummary: React.FC = () => {
  return (
    <AbsoluteFill className="full-screen" style={{ backgroundColor: "#ffffff" }}>
      <div style={{ width: "100%", padding: "60px 80px", backgroundColor: "var(--accent-teal)", color: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <AnimatedText delay={0}>
          <h1 style={{ fontSize: "48px", margin: 0, fontWeight: "600", lineHeight: "1.2" }}>
            A Convolutional Neural Network successfully classifies Diabetic Retinopathy into 5 severity stages, enabling scalable diagnostics.
          </h1>
        </AnimatedText>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, width: "100%" }}>
        
        <AnimatedText delay={60}>
          <div style={{ display: "flex", alignItems: "center", gap: "60px" }}>
            
            {/* Coded Diagram Step 1 */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
              <div style={{ width: "220px", height: "220px", borderRadius: "16px", overflow: "hidden", border: "4px solid var(--accent-green)", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
                <Img src={staticFile("dr-stages-img/dr-stage-4.png")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ fontSize: "28px", fontWeight: "600", color: "var(--text-main)" }}>Input: RGB Fundus Image</div>
              <div style={{ fontSize: "20px", color: "var(--text-muted)" }}>(224 × 224 × 3)</div>
            </div>

            <div style={{ fontSize: "60px", color: "var(--accent-teal)" }}>➔</div>

            {/* Coded Diagram Step 2 */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
              <div style={{ width: "300px", height: "220px", backgroundColor: "var(--bg-secondary)", borderRadius: "16px", border: "4px solid var(--accent-teal)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
                <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                  <div style={{ width: "40px", height: "80px", backgroundColor: "var(--accent-green)", opacity: 0.8 }} />
                  <div style={{ width: "30px", height: "60px", backgroundColor: "var(--accent-green)", opacity: 0.6 }} />
                  <div style={{ width: "20px", height: "40px", backgroundColor: "var(--accent-green)", opacity: 0.4 }} />
                </div>
                <div style={{ fontSize: "32px", fontWeight: "bold", color: "var(--accent-teal)" }}>SimpleCNN</div>
              </div>
              <div style={{ fontSize: "28px", fontWeight: "600", color: "var(--text-main)" }}>Hierarchical Feature Extraction</div>
              <div style={{ fontSize: "20px", color: "var(--text-muted)" }}>~150k Parameters</div>
            </div>

            <div style={{ fontSize: "60px", color: "var(--accent-teal)" }}>➔</div>

            {/* Coded Diagram Step 3 */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
              <div style={{ width: "220px", height: "220px", backgroundColor: "white", borderRadius: "16px", border: "4px solid var(--accent-green)", display: "flex", alignItems: "flex-end", justifyContent: "space-around", padding: "20px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
                {[20, 30, 10, 40, 120].map((h, i) => (
                  <div key={i} style={{ width: "20px", height: `${h}px`, backgroundColor: i === 4 ? "var(--accent-alert)" : "var(--accent-green)", borderRadius: "4px 4px 0 0" }} />
                ))}
              </div>
              <div style={{ fontSize: "28px", fontWeight: "600", color: "var(--text-main)" }}>Prediction: 5 Stages</div>
              <div style={{ fontSize: "20px", color: "var(--text-muted)" }}>Softmax Probability</div>
            </div>

          </div>
        </AnimatedText>

      </div>
    </AbsoluteFill>
  );
};
