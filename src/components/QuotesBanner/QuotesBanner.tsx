import { containerStyle } from "./QuotesBanner.styles";

interface QuotesBannerProps {
  quote: string;
}

export default function QuotesBanner({ quote }: QuotesBannerProps) {
  return (
    <div className="flex flex-col items-center justify-center" style={{ ...containerStyle, position: "relative", width: "100%", height: "100%", zIndex: 50, pointerEvents: "none" }}>
      {quote && (
        <div className="panel-container" style={{ pointerEvents: "auto" }}>
          <div className="panel-text">{quote}</div>
        </div>
      )}
    </div>
  );
}
