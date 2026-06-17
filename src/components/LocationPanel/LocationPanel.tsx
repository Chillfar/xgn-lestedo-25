import { Paper, Typography } from "@mui/material";
import { paperStyle, mobileContainerStyle, iframeStyle } from "./LocationPanel.styles";

const MAPS_EMBED_URL = "https://maps.google.com/maps?q=42.7058978448091,-8.244838598951503&hl=es&z=15&output=embed";

interface LocationPanelProps {
  isMobile: boolean;
}

export default function LocationPanel({ isMobile }: LocationPanelProps) {
  const iframeHeight = isMobile ? "250" : "450";

  const content = (
    <>
      <Paper style={paperStyle} className="liquid-glass">
        <Typography variant="h5" gutterBottom sx={{ cursor: "default" }}>Ubicación</Typography>
        <div style={{ flex: 1, minHeight: 0 }}>
          <iframe
            title="Ubicación"
            width="100%"
            height={isMobile ? iframeHeight : "100%"}
            style={iframeStyle}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={MAPS_EMBED_URL}
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
