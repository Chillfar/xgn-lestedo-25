import { iframeStyle, mobileContainerStyle } from "./SpotifyPanel.styles";
const SPOTIFY_EMBED_URL = "https://open.spotify.com/embed/playlist/3YvgAU67nQK5XoaIP0aqSd?utm_source=generator";

interface SpotifyPanelProps {
  isMobile: boolean;
}

export default function SpotifyPanel({ isMobile }: SpotifyPanelProps) {

  const content = (
    <div style={{ display: "flex", flex: 1, width: "100%", height: isMobile ? "376px" : "100%" }}>
      <iframe
        style={{ ...iframeStyle, width: "100%", height: "100%", flex: 1 }}
        src={SPOTIFY_EMBED_URL}
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );

  if (isMobile) {
    return (
      <div style={mobileContainerStyle}>
        {content}
      </div>
    );
  }

  return content;
}
