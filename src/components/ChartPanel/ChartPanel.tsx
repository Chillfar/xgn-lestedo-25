import { Rnd } from "react-rnd";
import { Paper, Typography, Button } from "@mui/material";
import { Line } from "react-chartjs-2";
import { paperStyle, mobileContainerStyle, buttonSx } from "./ChartPanel.styles";

interface ChartPanelProps {
  chartData: any;
  isMobile: boolean;
  isAuthenticated: boolean;
  onNextRound: () => void;
}

export default function ChartPanel({ chartData, isMobile, isAuthenticated, onNextRound }: ChartPanelProps) {
  const rndProps = isMobile
    ? { x: 0, y: 510, width: "92%", height: "auto" }
    : { x: 820, y: 120, width: "24%", height: "auto" };

  const rndOptions = isMobile
    ? { enableResizing: false, disableDragging: true }
    : {};

  const content = (
    <>
      <Paper style={paperStyle}>
        <Typography variant="h5" gutterBottom>Evolución de Puntos</Typography>
        <Line data={chartData} />
        <Button className="cancel-drag" variant="contained" color="secondary" fullWidth onClick={onNextRound} sx={{ ...buttonSx, visibility: isAuthenticated ? "visible" : "hidden" }}>Siguiente Ronda</Button>
      </Paper>
    </>
  );

  return isMobile ? (
    <div style={mobileContainerStyle}>
      {content}
    </div>
  ) : (
    <Rnd default={rndProps} {...rndOptions} cancel="button, .cancel-drag">
      {content}
    </Rnd>
  );
}
