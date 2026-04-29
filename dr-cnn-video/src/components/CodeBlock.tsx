import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export const CodeBlock: React.FC<{ code: string; language?: string; style?: React.CSSProperties }> = ({ code, style }) => {
  const frame = useCurrentFrame();
  
  // Typewriter effect
  const charsToShow = Math.floor(interpolate(frame, [0, 60], [0, code.length], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }));
  
  const displayedCode = code.substring(0, charsToShow);

  return (
    <div style={{
      backgroundColor: "#1e1e1e",
      color: "#d4d4d4",
      padding: "30px",
      borderRadius: "16px",
      fontFamily: "monospace",
      fontSize: "32px",
      whiteSpace: "pre",
      lineHeight: "1.5",
      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
      ...style
    }}>
      {displayedCode}
      {frame % 30 < 15 ? "_" : " "}
    </div>
  );
};
