import { Modal, Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
import { User } from "../../../constants/initialData";
import { userColors } from "../../../constants/initialData";

interface RoundHistoryModalProps {
  open: boolean;
  onClose: () => void;
  users: User[];
}

const modalBoxSx = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: "700px" },
  maxHeight: "80vh",
  bgcolor: "#1a1a2e",
  border: "1px solid rgba(243, 99, 250, 0.3)",
  borderRadius: "16px",
  boxShadow: "0 8px 40px rgba(0,0,0,0.7), 0 0 30px rgba(243,99,250,0.15)",
  p: 0,
  outline: "none",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
};

export default function RoundHistoryModal({ open, onClose, users }: RoundHistoryModalProps) {
  // Find max rounds across all users
  const maxRounds = Math.max(0, ...users.map(u => u.history?.length || 0));

  return (
    <Modal open={open} onClose={onClose} sx={{ zIndex: 99999 }}>
      <Box sx={modalBoxSx} className="liquid-glass">
        {/* Header */}
        <Box sx={{
          px: 3, py: 2,
          background: "linear-gradient(135deg, rgba(243,99,250,0.2), rgba(100,50,200,0.3))",
          borderBottom: "1px solid rgba(243,99,250,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <Typography variant="h6" sx={{ color: "white", fontWeight: "bold", letterSpacing: "0.5px" }}>
            📜 Histórico de Rondas
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "rgba(255,255,255,0.7)", "&:hover": { color: "white" } }}>
            ✕
          </IconButton>
        </Box>

        {/* Table */}
        <Box sx={{ overflowY: "auto", scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}>
          {maxRounds === 0 ? (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem" }}>
                Aún no hay rondas completadas. ¡Pulsa "Siguiente Ronda" para empezar!
              </Typography>
            </Box>
          ) : (
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{
                    backgroundColor: "#16162a",
                    color: "rgba(255,255,255,0.6)",
                    fontWeight: "bold",
                    borderBottom: "1px solid rgba(243,99,250,0.2)",
                    position: "sticky",
                    left: 0,
                    zIndex: 3,
                    whiteSpace: "nowrap",
                  }}>
                    Ronda
                  </TableCell>
                  {users.map(user => (
                    <TableCell key={user.id} sx={{
                      backgroundColor: "#16162a",
                      color: userColors[user.name as keyof typeof userColors] || "white",
                      fontWeight: "bold",
                      borderBottom: "1px solid rgba(243,99,250,0.2)",
                      whiteSpace: "nowrap",
                      textAlign: "center",
                    }}>
                      {user.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from({ length: maxRounds }, (_, roundIdx) => {
                  // Find who had the highest score this round
                  const roundScores = users.map(u => u.history?.[roundIdx] ?? 0);
                  const maxScore = Math.max(...roundScores);

                  return (
                    <TableRow
                      key={roundIdx}
                      sx={{
                        "&:nth-of-type(odd)": { backgroundColor: "rgba(255,255,255,0.02)" },
                        "&:hover": { backgroundColor: "rgba(243,99,250,0.05)" },
                      }}
                    >
                      <TableCell sx={{
                        color: "rgba(255,255,255,0.9)",
                        fontWeight: "bold",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                        position: "sticky",
                        left: 0,
                        zIndex: 1,
                        backgroundColor: "inherit",
                        whiteSpace: "nowrap",
                      }}>
                        🎮 Ronda {roundIdx + 1}
                      </TableCell>
                      {users.map((user) => {
                        const score = user.history?.[roundIdx] ?? 0;
                        const prevScore = roundIdx > 0 ? (user.history?.[roundIdx - 1] ?? 0) : 0;
                        const diff = score - prevScore;
                        const isLeader = score === maxScore && maxScore > 0;

                        return (
                          <TableCell
                            key={user.id}
                            sx={{
                              textAlign: "center",
                              borderBottom: "1px solid rgba(255,255,255,0.05)",
                              color: isLeader
                                ? (userColors[user.name as keyof typeof userColors] || "white")
                                : "rgba(255,255,255,0.75)",
                              fontWeight: isLeader ? "bold" : "normal",
                            }}
                          >
                            <Box>
                              <span style={{ fontSize: "1rem" }}>{score}</span>
                              {diff > 0 && (
                                <span style={{
                                  fontSize: "0.7rem",
                                  color: "#4ade80",
                                  marginLeft: "4px",
                                  fontWeight: "bold",
                                }}>
                                  +{diff}
                                </span>
                              )}
                            </Box>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
