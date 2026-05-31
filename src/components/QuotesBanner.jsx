import { Rnd } from "react-rnd";

export default function QuotesBanner({ quote }) {
  return (
    <Rnd default={{ x: 224, y: 30, width: "74%", height: "auto" }} enableResizing={false} disableDragging={true}>
      <div className="flex flex-col items-center justify-center" style={{ padding: "16px", color: "white" }}>
        {quote && (
          <div className="panel-container">
            <div className="panel-text">{quote}</div>
          </div>
        )}
      </div>
    </Rnd>
  );
}
