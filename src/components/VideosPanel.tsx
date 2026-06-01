import { Rnd } from "react-rnd";
import { Paper, Typography } from "@mui/material";

const YOUTUBE_PLAYLIST_URL = "https://www.youtube.com/embed/videoseries?si=yt9cPirnyjTM-f3_&amp;list=PL2ihC4aJWkWpD8C2MJ62Cx80abK9l-I4L";

interface VideosPanelProps {
  isMobile: boolean;
}

export default function VideosPanel({ isMobile }: VideosPanelProps) {
  const rndProps = isMobile
    ? { x: 0, y: 2295, width: "92%", height: "auto" }
    : { x: 40, y: 480, width: "40%", height: "auto" };

  const rndOptions = isMobile
    ? { enableResizing: false, disableDragging: true }
    : {};

  const paperStyle = isMobile
    ? { padding: "16px", backgroundColor: "#1e1e1e", color: "white", marginBottom: "20px" }
    : { padding: "16px", backgroundColor: "#1e1e1e", color: "white" };

  return (
    <Rnd default={rndProps} {...rndOptions}>
      <Paper style={paperStyle}>
        <Typography variant="h5" gutterBottom>Party Vídeos</Typography>
        <iframe
          width="100%"
          height="300"
          src={YOUTUBE_PLAYLIST_URL}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </Paper>
    </Rnd>
  );
}
