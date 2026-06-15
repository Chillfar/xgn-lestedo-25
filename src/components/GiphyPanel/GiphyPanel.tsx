import { imgStyle } from "./GiphyPanel.styles";

interface GiphyPanelProps {
  gifUrl: string;
  onClickGif: () => void;
}

export default function GiphyPanel({ gifUrl, onClickGif }: GiphyPanelProps) {
  return (
    <img src={gifUrl} alt="GIF" style={imgStyle} onClick={onClickGif} />
  );
}
