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
  isAdmin?: boolean;
  onResetClick?: () => void;
  onArchiveClick?: () => void;
  users: User[];
}

export default function ChartPanel({ chartData, isMobile, isAuthenticated, isAdmin, onResetClick, onArchiveClick, users }: ChartPanelProps) {
  const [historyOpen, setHistoryOpen] = useState(false);

  const hasHistory = users.some(u => u.history && u.history.length > 1);

  const hasData = users.some(u =>
    (u.history && u.history.length > 1) ||
    Object.values(u.scores).some(s => s > 0)
  );

  const content = (
    <>
      <Paper style={paperStyle} className="liquid-glass">
        <Typography variant="h5" gutterBottom sx={{ cursor: "default" }}>Evolución de Puntos</Typography>
        <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
          <Line data={chartData} options={{ maintainAspectRatio: false }} />
        </div>

        {(isAdmin || hasHistory) && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2, alignItems: "center", gap: 2 }}>
            {isAdmin && hasData && onArchiveClick && (
              <Button
                onClick={onArchiveClick}
                sx={{ ...secondaryAdminButtonStyle, flex: "0 0 auto", whiteSpace: "nowrap" }}
              >
                Archivar
              </Button>
            )}
            {isAdmin && hasData && onResetClick && (
              <Button
                onClick={onResetClick}
                sx={{ ...secondaryAdminButtonStyle, flex: "0 0 auto", whiteSpace: "nowrap" }}
              >
                Resetear datos
              </Button>
            )}
            {hasHistory && (
              <Button
                onClick={() => setHistoryOpen(true)}
                sx={{ ...secondaryAdminButtonStyle, flex: "0 0 auto", whiteSpace: "nowrap" }}
              >
                Ver histórico
              </Button>
            )}
          </Box>
        )}
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
