import { Rnd } from "react-rnd";

interface GiphyPanelProps {
  gifUrl: string;
  onClickGif: () => void;
}

export default function GiphyPanel({ gifUrl, onClickGif }: GiphyPanelProps) {
  return (
    <Rnd default={{ x: 1300, y: 120, width: "10%", height: "auto" }}>
      <img src={gifUrl} alt="GIF" style={{ width: "100%", cursor: "pointer" }} onClick={onClickGif} />
    </Rnd>
  );
}
