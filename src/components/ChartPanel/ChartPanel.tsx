import { useState } from "react";
import { Rnd } from "react-rnd";
import { Paper, Typography, Button, Box } from "@mui/material";
import { Line } from "react-chartjs-2";
import { paperStyle, mobileContainerStyle, buttonSx } from "./ChartPanel.styles";
import { User } from "../../constants/initialData";
import RoundHistoryModal from "../modals/RoundHistoryModal/RoundHistoryModal";

interface ChartPanelProps {
  chartData: any;
  isMobile: boolean;
  isAuthenticated: boolean;
  onNextRound: () => void;
  users: User[];
}

export default function ChartPanel({ chartData, isMobile, isAuthenticated, onNextRound, users }: ChartPanelProps) {
  const [historyOpen, setHistoryOpen] = useState(false);

  const rndProps = isMobile
    ? { x: 0, y: 510, width: "92%", height: "auto" }
    : { x: 820, y: 120, width: "24%", height: "auto" };

  const rndOptions = isMobile
    ? { enableResizing: false, disableDragging: true }
    : {};

  const hasHistory = users.some(u => u.history && u.history.length > 0);

  const content = (
    <>
      <Paper style={paperStyle}>
        <Typography variant="h5" gutterBottom>Evolución de Puntos</Typography>
        <Line data={chartData} />

        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          <Button
            className="cancel-drag"
            variant="contained"
            color="secondary"
            fullWidth
            onClick={onNextRound}
            sx={{ ...buttonSx, mt: 0, visibility: isAuthenticated ? "visible" : "hidden" }}
          >
            Siguiente Ronda
          </Button>
          {hasHistory && (
            <Button
              className="cancel-drag"
              variant="outlined"
              color="secondary"
              onClick={() => setHistoryOpen(true)}
              sx={{
                mt: 0,
                minWidth: "auto",
                whiteSpace: "nowrap",
                px: 1.5,
                fontSize: "0.75rem",
                borderColor: "rgba(243,99,250,0.5)",
                color: "rgba(243,99,250,0.9)",
                "&:hover": {
                  borderColor: "#F363FA",
                  backgroundColor: "rgba(243,99,250,0.08)",
                },
              }}
            >
              📜 Ver histórico
            </Button>
          )}
        </Box>
      </Paper>

      <RoundHistoryModal
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        users={users}
      />
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
