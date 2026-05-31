import { Rnd } from "react-rnd";

export default function GiphyPanel({ gifUrl, onClickGif }) {
  return (
    <Rnd default={{ x: 1300, y: 120, width: "10%", height: "auto" }}>
      <img src={gifUrl} alt="GIF" style={{ width: "100%", cursor: "pointer" }} onClick={onClickGif} />
    </Rnd>
  );
}
