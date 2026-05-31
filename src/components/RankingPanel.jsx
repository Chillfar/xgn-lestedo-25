import { Rnd } from "react-rnd";
import { Paper, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";

export default function RankingPanel({ users, games, isMobile, onUserClick, onResetClick, onFaksClick }) {
  const rndProps = isMobile
    ? { x: 0, y: 100, width: "92%", height: "auto" }
    : { x: 40, y: 120, width: "40%", height: "auto" };

  const rndOptions = isMobile
    ? { enableResizing: false, disableDragging: true }
    : {};

  const paperStyle = isMobile
    ? { padding: "16px", backgroundColor: "#1e1e1e", color: "white", overflow: "scroll", scrollbarWidth: "thin", scrollbarColor: "#F363FA #1e1e1e" }
    : { padding: "16px", backgroundColor: "#1e1e1e", color: "white" };

  const tableStyle = isMobile
    ? { overflow: "scroll", scrollbarWidth: "thin", scrollbarColor: "#F363FA #1e1e1e" }
    : { overflowX: "scroll" };

  return (
    <Rnd default={rndProps} {...rndOptions}>
      <Paper style={paperStyle}>
        <Typography style={{ textAlign: "center" }} variant="h5" gutterBottom>Ranking</Typography>

        {isMobile && onFaksClick && (
          <Button variant="outlined" color="secondary" size="small" style={{ position: "absolute", left: "15px", top: "20px", color: "white" }} onClick={onFaksClick}>FAKs</Button>
        )}

        <Button
          variant="outlined"
          color="secondary"
          size="small"
          style={{ position: "absolute", right: "15px", top: "20px", ...(isMobile ? { color: "white" } : {}) }}
          onClick={onResetClick}
        >
          {isMobile ? "↻" : "Resetear datos"}
        </Button>

        <Table style={tableStyle}>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "white" }}><strong>Jugador</strong></TableCell>
              {games.map(game => (
                <TableCell key={game.name} style={{ color: "white" }}><strong>{game.name}</strong></TableCell>
              ))}
              <TableCell style={{ color: "white" }}><strong>Puntos Totales</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell style={{ color: "white", cursor: "pointer" }} onClick={() => onUserClick(user)}>{user.name}</TableCell>
                {games.map(game => (
                  <TableCell key={game.name} style={{ color: "white" }}>{user.scores[game.name]}</TableCell>
                ))}
                <TableCell style={{ color: "white" }}>{Object.values(user.scores).reduce((acc, score) => acc + score, 0)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Rnd>
  );
}