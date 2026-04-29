import React from "react";
import { AbsoluteFill } from "remotion";
import { AnimatedText } from "../components/AnimatedText";

export const Scene7Strategic: React.FC = () => {
  return (
    <AbsoluteFill className="full-screen" style={{ backgroundColor: "#ffffff" }}>
      <div style={{ width: "100%", padding: "40px 80px", backgroundColor: "var(--accent-teal)", color: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <AnimatedText delay={0}>
          <h1 style={{ fontSize: "40px", margin: 0, fontWeight: "600", lineHeight: "1.2" }}>
            Algorithmic screening serves as a highly effective triage tool, optimizing resource allocation for medical professionals.
          </h1>
        </AnimatedText>
      </div>

      <div style={{ display: "flex", flex: 1, width: "100%", padding: "80px", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        
        <AnimatedText delay={60}>
          <div style={{ fontSize: "48px", fontWeight: "bold", color: "var(--accent-teal)", marginBottom: "60px" }}>Next Steps & Implementation</div>
        </AnimatedText>

        <div style={{ display: "flex", flexDirection: "column", gap: "40px", maxWidth: "1000px" }}>
          
          <AnimatedText delay={90}>
            <div style={{ display: "flex", alignItems: "center", gap: "30px", backgroundColor: "var(--bg-secondary)", padding: "30px", borderRadius: "16px", borderLeft: "8px solid var(--accent-green)", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: "40px" }}>🏥</div>
              <div style={{ fontSize: "28px", color: "var(--text-main)", lineHeight: "1.4" }}>
                <strong>Clinical Integration:</strong> Deploy as a preliminary triage system to filter out Class 0 (Healthy) patients, saving 60%+ of doctors' diagnostic time.
              </div>
            </div>
          </AnimatedText>

          <AnimatedText delay={120}>
            <div style={{ display: "flex", alignItems: "center", gap: "30px", backgroundColor: "var(--bg-secondary)", padding: "30px", borderRadius: "16px", borderLeft: "8px solid var(--accent-alert)", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: "40px" }}>⚠️</div>
              <div style={{ fontSize: "28px", color: "var(--text-main)", lineHeight: "1.4" }}>
                <strong>Risk Monitoring:</strong> Establish strict fallback pipelines for False Negatives to ensure severe cases are always reviewed by human ophthalmologists.
              </div>
            </div>
          </AnimatedText>

          <AnimatedText delay={150}>
            <div style={{ display: "flex", alignItems: "center", gap: "30px", backgroundColor: "var(--bg-secondary)", padding: "30px", borderRadius: "16px", borderLeft: "8px solid var(--accent-teal)", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: "40px" }}>📈</div>
              <div style={{ fontSize: "28px", color: "var(--text-main)", lineHeight: "1.4" }}>
                <strong>Future Iteration:</strong> Migrate from SimpleCNN to a deeper architecture (e.g., ResNet50) and incorporate Grad-CAM for explainable AI bounding boxes.
              </div>
            </div>
          </AnimatedText>

        </div>
      </div>
    </AbsoluteFill>
  );
};
