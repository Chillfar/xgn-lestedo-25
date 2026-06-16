import { useState } from "react";
import { Paper, Typography, Button, Box } from "@mui/material";
import { Line } from "react-chartjs-2";
import { paperStyle, mobileContainerStyle, buttonSx, secondaryAdminButtonStyle } from "./ChartPanel.styles";
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

  const hasHistory = users.some(u => u.history && u.history.length > 0);

  const content = (
    <>
      <Paper style={paperStyle} className="liquid-glass">
        <Typography variant="h5" gutterBottom>Evolución de Puntos</Typography>
        <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
          <Line data={chartData} options={{ maintainAspectRatio: false }} />
        </div>

        <Box sx={{ display: "flex", gap: 2, mt: 2, alignItems: "center" }}>
          <Button
            variant="contained"
            onClick={onNextRound}
            sx={{ ...buttonSx, width: "auto", flex: 1, mt: 0, mb: 0, visibility: isAuthenticated ? "visible" : "hidden" }}
          >
            Siguiente Ronda
          </Button>
          {hasHistory && (
            <Button
              onClick={() => setHistoryOpen(true)}
              sx={{ ...secondaryAdminButtonStyle, flex: "0 0 auto", whiteSpace: "nowrap" }}
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

  if (isMobile) {
    return (
      <div style={mobileContainerStyle}>
        {content}
      </div>
    );
  }

  return content;
}
