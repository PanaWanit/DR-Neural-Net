import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Audio, Sequence, staticFile } from "remotion";

export const CNNConcepts: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Convolution sliding window calculation (simulating a 3x3 kernel over a 5x5 grid)
  const convProgress = interpolate(frame, [15, 75], [0, 9], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const row = Math.floor(convProgress / 3);
  const col = Math.floor(convProgress % 3);

  // Pooling shrink calculation (simulating 4x4 to 2x2)
  const poolProgress = interpolate(frame, [45, 75], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill className="full-screen" style={{ padding: "60px", boxSizing: "border-box" }}>
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", opacity: titleOpacity }}>
        <h1 style={{ fontSize: "60px", margin: "0 0 40px 0", textAlign: "center", color: "var(--accent-teal)" }}>Why CNNs?</h1>
        
        <div style={{ flex: 1, display: "flex", flexDirection: "row", gap: "60px" }}>
          
          {/* Convolution Visual */}
          <div className="clean-panel" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", opacity: interpolate(frame, [10, 20], [0, 1]) }}>
            <Sequence from={15} durationInFrames={1}>
              <Audio src={staticFile("sfx/switch.wav")} volume={0.3} />
            </Sequence>
            <h2 style={{ color: "var(--accent-green)", fontSize: "36px", marginTop: 0 }}>Convolution</h2>
            
            <div style={{ position: "relative", width: "250px", height: "250px", marginTop: "20px" }}>
              {/* 5x5 Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gridTemplateRows: "repeat(5, 1fr)", gap: "2px", width: "100%", height: "100%" }}>
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid rgba(16,185,129,0.2)" }} />
                ))}
              </div>
              
              {/* Sliding 3x3 Window */}
              <div style={{
                position: "absolute",
                top: `${row * 20}%`,
                left: `${col * 20}%`,
                width: "60%",
                height: "60%",
                backgroundColor: "rgba(16, 185, 129, 0.3)",
                border: "4px solid var(--accent-green)",
                transition: "all 0.1s linear",
                boxSizing: "border-box"
              }} />
            </div>
            <p style={{ marginTop: "30px", fontSize: "24px", color: "var(--text-muted)" }}>Extract Features</p>
          </div>

          {/* Pooling Visual */}
          <div className="clean-panel" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", opacity: interpolate(frame, [40, 50], [0, 1]) }}>
            <Sequence from={45} durationInFrames={1}>
              <Audio src={staticFile("sfx/switch.wav")} volume={0.3} />
            </Sequence>
            <h2 style={{ color: "var(--accent-teal)", fontSize: "36px", marginTop: 0 }}>Pooling</h2>
            
            <div style={{ position: "relative", width: "250px", height: "250px", marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* 4x4 Grid shrinking to 2x2 */}
              <div style={{ 
                display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "5px",
                width: `${interpolate(poolProgress, [0, 1], [100, 50])}%`,
                height: `${interpolate(poolProgress, [0, 1], [100, 50])}%`
              }}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} style={{ 
                    backgroundColor: `rgba(6, 95, 70, ${interpolate(poolProgress, [0, 1], [0.1, 0.8])})`, 
                    border: "2px solid var(--accent-teal)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: "bold", fontSize: "24px", color: "white",
                    opacity: poolProgress
                  }}>MAX</div>
                ))}
              </div>
            </div>
            <p style={{ marginTop: "30px", fontSize: "24px", color: "var(--text-muted)" }}>Reduce Dimension</p>
          </div>

        </div>
      </div>
    </AbsoluteFill>
  );
};
