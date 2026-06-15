import { iframeStyle, mobileContainerStyle } from "./SpotifyPanel.styles";
const SPOTIFY_EMBED_URL = "https://open.spotify.com/embed/playlist/3YvgAU67nQK5XoaIP0aqSd?utm_source=generator";

interface SpotifyPanelProps {
  isMobile: boolean;
}

export default function SpotifyPanel({ isMobile }: SpotifyPanelProps) {

  const content = (
    <>
      <iframe
        style={iframeStyle}
        src={SPOTIFY_EMBED_URL}
        width="100%"
        height={isMobile ? "376" : "100%"}
        style={{ ...iframeStyle, minHeight: isMobile ? undefined : "352px" }}
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </>
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
