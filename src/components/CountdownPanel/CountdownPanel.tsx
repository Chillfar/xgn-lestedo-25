import { Paper, Typography } from "@mui/material";
import { mobileContainerStyle, mobilePaperStyle, desktopContainerStyle, desktopPaperStyle, typographyStyle } from "./CountdownPanel.styles";

interface CountdownPanelProps {
  countdown: string;
  isMobile: boolean;
}

export default function CountdownPanel({ countdown, isMobile }: CountdownPanelProps) {
  if (isMobile) {
    return (
      <div style={mobileContainerStyle}>
        <Paper style={mobilePaperStyle} className="liquid-glass">
          <Typography variant="h6" style={typographyStyle}>{countdown}</Typography>
        </Paper>
      </div>
    );
  }

  return (
    <div style={desktopContainerStyle}>
      <Paper style={desktopPaperStyle} className="liquid-glass">
        <Typography variant="h6" style={typographyStyle}>{countdown}</Typography>
      </Paper>
    </div>
  );
}
