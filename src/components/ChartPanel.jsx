import { Rnd } from "react-rnd";
import { Paper, Typography, Button } from "@mui/material";
import { Line } from "react-chartjs-2";

export default function ChartPanel({ chartData, isMobile, onNextRound }) {
  const rndProps = isMobile
    ? { x: 0, y: 510, width: "92%", height: "auto" }
    : { x: 820, y: 120, width: "24%", height: "auto" };

  const rndOptions = isMobile
    ? { enableResizing: false, disableDragging: true }
    : {};

  return (
    <Rnd default={rndProps} {...rndOptions}>
      <Paper style={{ padding: "16px", backgroundColor: "#1e1e1e", color: "white" }}>
        <Typography variant="h5" gutterBottom>Evolución de Puntos</Typography>
        <Line data={chartData} />
        <Button variant="contained" color="secondary" fullWidth onClick={onNextRound} sx={{ mt: 2 }}>Siguiente Ronda</Button>
      </Paper>
    </Rnd>
  );
}