import { Rnd } from "react-rnd";
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { Game, User } from "../../constants/initialData";
import {
  paperStyle, headerContainerStyle, titleStyle, adminButtonsContainerStyle,
  adminButtonStyle, tableContainerStyle, headerCellStyle, stickyHeaderCellStyle, firstPlaceStyle,
  scoreCellStyle, totalScoreCellStyle, mobileContainerStyle, getCellStyle, getStickyFirstPlaceCellStyle
} from "./RankingPanel.styles";

const positionMedals = ["🥇", "🥈", "🥉"];

interface RankingPanelProps {
  users: User[];
  games: Game[];
  isMobile: boolean;
  isAuthenticated: boolean;
  onUserClick: (user: User) => void;
  onResetClick: () => void;
  onArchiveClick?: () => void;
}

export default function RankingPanel({ users, games, isMobile, isAuthenticated, onUserClick, onResetClick, onArchiveClick }: RankingPanelProps) {
  const rndProps = isMobile
    ? { x: 0, y: 100, width: "92%", height: "auto" }
    : { x: 40, y: 120, width: "40%", height: "auto" };

  const rndOptions = isMobile
    ? { enableResizing: false, disableDragging: true }
    : {};



  const hasData = users.some(u =>
    (u.history && u.history.length > 0) ||
    Object.values(u.scores).some(s => s > 0)
  );

  const content = (
    <>
      <Paper style={paperStyle}>
        <div style={headerContainerStyle}>
          <Typography
            className="drag-handle"
            style={titleStyle}
            variant="h5"
          >
            Ranking
          </Typography>

          {isAuthenticated && hasData && (
            <div style={adminButtonsContainerStyle}>
              {onArchiveClick && (
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  style={isMobile ? adminButtonStyle : {}}
                  onClick={onArchiveClick}
                >
                  {isMobile ? "💾" : "Archivar"}
                </Button>
              )}
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                style={isMobile ? adminButtonStyle : {}}
                onClick={onResetClick}
              >
                {isMobile ? "↻" : "Resetear datos"}
              </Button>
            </div>
          )}
        </div>

        <div style={tableContainerStyle} className="ranking-table-container">
          <style>{`.ranking-table-container::-webkit-scrollbar { display: none; }`}</style>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={stickyHeaderCellStyle}><strong>Jugador</strong></TableCell>
                {games.map(game => (
                  <TableCell key={game.name} style={headerCellStyle}><strong>{game.name}</strong></TableCell>
                ))}
                <TableCell style={headerCellStyle}><strong>Puntos Totales</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => {
                const totalScore = Object.values(user.scores).reduce((acc, score) => acc + score, 0);
                const hasPoints = totalScore > 0;
                return (
                  <TableRow key={user.id} style={index === 0 && hasPoints ? firstPlaceStyle : undefined}>
                    <TableCell className="cancel-drag" style={getStickyFirstPlaceCellStyle(index, hasPoints)} onClick={() => onUserClick(user)}>
                      {hasPoints ? (positionMedals[index] || `${index + 1}.`) : ""} {user.name}
                    </TableCell>
                    {games.map(game => (
                      <TableCell key={game.name} style={scoreCellStyle}>{user.scores[game.name] || 0}</TableCell>
                    ))}
                    <TableCell style={totalScoreCellStyle}>{totalScore}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Paper>
    </>
  );

  return isMobile ? (
    <div style={mobileContainerStyle}>
      {content}
    </div>
  ) : (
    <Rnd default={rndProps} {...rndOptions} cancel="button, .admin-buttons, .cancel-drag">
      {content}
    </Rnd>
  );
}
