import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Audio, Sequence, staticFile } from "remotion";

const CODE_SNIPPET = `def train_one_epoch(model, loader, criterion, optimizer, device):
    model.train()
    total_loss = 0.0
    for images, labels in loader:
        images = images.to(device)
        labels = labels.to(device)

        optimizer.zero_grad(set_to_none=True)
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        total_loss += loss.item() * images.size(0)
    return total_loss / len(loader.dataset)`;

export const CodeWalkthrough: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Calculate how many characters to show
  // Let's say typing speed is 1 character per frame after frame 20
  const charsToShow = Math.max(0, Math.floor((frame - 20) * 1.5));
  const displayedCode = CODE_SNIPPET.substring(0, charsToShow);
  
  // Is it currently typing?
  const isTyping = charsToShow > 0 && charsToShow < CODE_SNIPPET.length;

  return (
    <AbsoluteFill className="full-screen" style={{ padding: "60px", boxSizing: "border-box" }}>
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", opacity: titleOpacity }}>
        <h1 style={{ fontSize: "60px", margin: "0 0 20px 0", textAlign: "center", color: "var(--accent-teal)" }}>Training Loop</h1>
        
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div className="clean-panel" style={{ width: "80%", height: "70%", backgroundColor: "#f8f9fa", overflow: "hidden", position: "relative" }}>
            
            {/* Typing sounds - pre-scheduled for the Studio's waveform renderer */}
            {Array.from({ length: Math.floor(CODE_SNIPPET.length / 1.5 / 5) }).map((_, i) => (
              <Sequence key={i} from={20 + i * 5} durationInFrames={30}>
                <Audio src={staticFile("sfx/mouse-click.wav")} volume={0.1} />
              </Sequence>
            ))}

            <pre style={{ margin: 0, fontSize: "22px", fontFamily: "monospace", color: "#2d3748", lineHeight: 1.5 }}>
              <code>
                {displayedCode}
                {/* Blinking cursor */}
                <span style={{ 
                  opacity: Math.sin(frame / 5) > 0 ? 1 : 0, 
                  display: "inline-block", width: "10px", height: "20px", 
                  backgroundColor: "var(--accent-green)", marginLeft: "2px",
                  verticalAlign: "middle"
                }} />
              </code>
            </pre>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
