import { Rnd } from "react-rnd";
import { containerStyle } from "./QuotesBanner.styles";

interface QuotesBannerProps {
  quote: string;
}

export default function QuotesBanner({ quote }: QuotesBannerProps) {
  return (
    <Rnd default={{ x: 224, y: 30, width: "60%", height: "auto" }} enableResizing={false} disableDragging={true}>
      <div className="flex flex-col items-center justify-center" style={containerStyle}>
        {quote && (
          <div className="panel-container">
            <div className="panel-text">{quote}</div>
          </div>
        )}
      </div>
    </Rnd>
  );
}
