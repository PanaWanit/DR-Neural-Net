import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { AnimatedText } from "../components/AnimatedText";

export const Scene0Cover: React.FC = () => {
  const frame = useCurrentFrame();
  const bgOpacity = interpolate(frame, [0, 60], [0, 1]);

  return (
    <AbsoluteFill className="full-screen" style={{ backgroundColor: "#fafafa" }}>
      <div style={{ position: "absolute", width: "100%", height: "100%", opacity: bgOpacity, display: "grid", gridTemplateColumns: "repeat(20, 1fr)", gridTemplateRows: "repeat(10, 1fr)" }}>
        {Array.from({ length: 200 }).map((_, i) => (
          <div key={i} style={{ border: "1px solid rgba(16, 185, 129, 0.03)" }} />
        ))}
      </div>

      <div style={{ zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "100px", textAlign: "center" }}>
        <AnimatedText delay={30}>
          <div style={{ fontSize: "24px", color: "var(--accent-teal)", textTransform: "uppercase", letterSpacing: "4px", marginBottom: "30px", fontWeight: "bold" }}>
            Final Project Presentation
          </div>
        </AnimatedText>
        <AnimatedText delay={60}>
          <h1 style={{ fontSize: "80px", color: "#1a202c", fontWeight: "900", lineHeight: "1.1", margin: "0 0 40px 0", letterSpacing: "-2px" }}>
            Diabetic Retinopathy Multi-class Classification<br />
            <span style={{ color: "var(--accent-green)" }}>using Convolutional Neural Networks</span>
          </h1>
        </AnimatedText>
        <AnimatedText delay={90}>
          <div style={{ width: "100px", height: "4px", backgroundColor: "var(--accent-teal)", margin: "0 auto 40px auto" }} />
        </AnimatedText>
        <AnimatedText delay={120}>
          <div style={{ fontSize: "32px", color: "var(--text-muted)", fontWeight: "500" }}>
            Bonus,
            Pana W.,
            Pupipat Singkhorn
          </div>
        </AnimatedText>
      </div>
    </AbsoluteFill>
  );
};
