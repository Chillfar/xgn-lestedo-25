import { Rnd } from "react-rnd";
import { Paper, Typography } from "@mui/material";

export default function CountdownPanel({ countdown, isMobile }) {
  if (isMobile) {
    return (
      <Rnd default={{ x: 0, y: 0, width: "92%", height: "auto" }} enableResizing={false} disableDragging={true}>
        <Paper
          style={{
            padding: "16px",
            background: "linear-gradient(135deg, #ff4081, #ff80ab)",
            color: "white",
            textAlign: "right",
            paddingRight: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(255, 64, 129, 0.5)"
          }}
        >
          <Typography variant="h6" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{countdown}</Typography>
        </Paper>
      </Rnd>
    );
  }

  return (
    <Rnd default={{ x: 1600, y: 35, width: "14%", height: "auto" }}>
      <Paper
        style={{
          padding: "16px",
          background: "linear-gradient(135deg, #ff4081, #ff80ab)",
          color: "white",
          textAlign: "center",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(255, 64, 129, 0.5)"
        }}
      >
        <Typography variant="h6" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{countdown}</Typography>
      </Paper>
    </Rnd>
  );
}
