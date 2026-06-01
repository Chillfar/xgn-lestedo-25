import { Rnd } from "react-rnd";

const SPOTIFY_EMBED_URL = "https://open.spotify.com/embed/playlist/3YvgAU67nQK5XoaIP0aqSd?utm_source=generator";

interface SpotifyPanelProps {
  isMobile: boolean;
}

export default function SpotifyPanel({ isMobile }: SpotifyPanelProps) {
  const rndProps = isMobile
    ? { x: 0, y: 1900, width: "92%", height: "auto" }
    : { x: 820, y: 480, width: "24%", height: "auto" };

  const rndOptions = isMobile
    ? { enableResizing: false, disableDragging: true }
    : {};

  return (
    <Rnd default={rndProps as any} {...rndOptions}>
      <iframe
        style={{ border: "none" }}
        src={SPOTIFY_EMBED_URL}
        width="100%"
        height="376"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </Rnd>

  );
}
