import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { CodeBlock } from "../components/CodeBlock";

export const Scene5Classification: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const codeSnippet = `criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.AdamW(
    model.parameters(), 
    lr=args.lr
)`;

  const barProgress = spring({
    fps,
    frame: frame - 120,
    config: { damping: 12 },
  });

  const probs = [0.05, 0.1, 0.05, 0.1, 0.7]; // Class 4 probability high

  return (
    <AbsoluteFill className="full-screen">
      <div style={{ width: "100%", padding: "40px 80px", backgroundColor: "var(--accent-teal)", color: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", marginBottom: "60px" }}>
        <AnimatedText delay={0}>
          <h1 style={{ fontSize: "40px", margin: 0, fontWeight: "600", lineHeight: "1.2" }}>
            Softmax activation transforms raw network outputs into a definitive probability distribution across the 5 DR classes.
          </h1>
        </AnimatedText>
      </div>

      <div style={{ display: "flex", gap: "100px", width: "90%", justifyContent: "center", alignItems: "center" }}>
        
        {/* Left: Flatten & Softmax Bars */}
        <AnimatedText delay={60} style={{ flex: 1, display: "flex", gap: "40px", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <div style={{ fontSize: "24px", fontWeight: "bold", color: "var(--text-muted)", marginBottom: "10px", textAlign: "center" }}>Dense (32)</div>
            {Array.from({length: 16}).map((_, i) => (
              <div key={i} style={{ width: "60px", height: "15px", background: "var(--accent-teal)", borderRadius: "4px" }} />
            ))}
          </div>

          <div style={{ fontSize: "40px", fontWeight: "bold", color: "var(--accent-green)" }}>→</div>

          <div style={{ display: "flex", alignItems: "flex-end", gap: "20px", height: "300px", borderBottom: "4px solid var(--text-main)", paddingBottom: "10px" }}>
            {probs.map((p, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                <div style={{ 
                  width: "50px", 
                  height: `${interpolate(barProgress, [0, 1], [0, p * 300])}px`, 
                  background: i === 4 ? "var(--accent-alert)" : "var(--accent-green)",
                  borderRadius: "4px 4px 0 0"
                }} />
                <div style={{ fontWeight: "bold", fontSize: "20px" }}>C{i}</div>
              </div>
            ))}
          </div>
        </AnimatedText>

        {/* Right: Code Block */}
        <AnimatedText delay={90} style={{ flex: 1 }}>
          <CodeBlock code={codeSnippet} style={{ fontSize: "28px" }} />
        </AnimatedText>

      </div>
    </AbsoluteFill>
  );
};
