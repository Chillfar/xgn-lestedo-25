import { Rnd } from "react-rnd";
import { Paper, Typography } from "@mui/material";

const MAPS_EMBED_URL = "https://www.google.com/maps/embed/v1/place?key=AIzaSyCQp9lnjB31CyDBNg49fo4oz15n976iz2Q&q=Lugar+A+Picota,+5,+15881+Troitomil,+A+Coruña";

interface LocationPanelProps {
  isMobile: boolean;
}

export default function LocationPanel({ isMobile }: LocationPanelProps) {
  const rndProps = isMobile
    ? { x: 0, y: 1560, width: "92%", height: "auto" }
    : { x: 1300, y: 332, width: "10%", height: "auto" };

  const rndOptions = isMobile
    ? { enableResizing: false, disableDragging: true }
    : {};

  const iframeHeight = isMobile ? "250" : "450";

  return (
    <Rnd default={rndProps} {...rndOptions}>
      <Paper style={{ padding: "16px", backgroundColor: "#1e1e1e", color: "white" }}>
        <Typography variant="h5" gutterBottom>Ubicación</Typography>
        <iframe
          title="Ubicación"
          width="100%"
          height={iframeHeight}
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={MAPS_EMBED_URL}
        ></iframe>
      </Paper>
    </Rnd>
  );
}
