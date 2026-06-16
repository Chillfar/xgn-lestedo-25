import { Paper, Typography } from "@mui/material";
import { paperStyleMobile, paperStyleDesktop, mobileContainerStyle } from "./VideosPanel.styles";

const YOUTUBE_PLAYLIST_URL = "https://www.youtube.com/embed/videoseries?si=yt9cPirnyjTM-f3_&amp;list=PL2ihC4aJWkWpD8C2MJ62Cx80abK9l-I4L";

interface VideosPanelProps {
  isMobile: boolean;
}

export default function VideosPanel({ isMobile }: VideosPanelProps) {
  const currentPaperStyle = isMobile ? paperStyleMobile : paperStyleDesktop;

  const content = (
    <>
      <Paper style={currentPaperStyle} className="liquid-glass">
        <Typography variant="h5" gutterBottom sx={{ cursor: "default" }}>Party Vídeos</Typography>
        <div style={{ flex: 1, minHeight: 0 }}>
          <iframe
            width="100%"
            height="100%"
            src={YOUTUBE_PLAYLIST_URL}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </Paper>
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
