import { Rnd } from "react-rnd";
import { imgStyle } from "./GiphyPanel.styles";

interface GiphyPanelProps {
  gifUrl: string;
  onClickGif: () => void;
}

export default function GiphyPanel({ gifUrl, onClickGif }: GiphyPanelProps) {
  return (
    <Rnd default={{ x: 1300, y: 120, width: "10%", height: "auto" }} cancel="button, .cancel-drag">
      <img className="cancel-drag" src={gifUrl} alt="GIF" style={imgStyle} onClick={onClickGif} />
    </Rnd>
  );
}
