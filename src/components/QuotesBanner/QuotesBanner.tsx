import { useState, useEffect, useRef } from "react";
import { containerStyle } from "./QuotesBanner.styles";

interface QuotesBannerProps {
  quotes: string[];
}

export default function QuotesBanner({ quotes }: QuotesBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);

  // If quotes array shrinks (e.g. going from data to no-data), prevent out-of-bounds
  useEffect(() => {
    if (currentIndex >= quotes.length && quotes.length > 0) {
      setCurrentIndex(0);
    }
  }, [quotes.length, currentIndex]);

  const currentQuote = quotes[currentIndex] || quotes[0] || "";

  // Advance on CSS animation cycle completion
  const handleAnimationIteration = () => {
    if (quotes.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center" style={{ ...containerStyle, position: "relative", width: "100%", height: "100%", zIndex: 50, pointerEvents: "none" }}>
      {currentQuote && (
        <div className="panel-container" style={{ pointerEvents: "auto" }}>
          {/* Key ensures React restarts animation if we force it, but here we just let it run */}
          <div 
            className="panel-text" 
            ref={textRef}
            onAnimationIteration={handleAnimationIteration}
          >
            {currentQuote}
          </div>
        </div>
      )}
    </div>
  );
}
