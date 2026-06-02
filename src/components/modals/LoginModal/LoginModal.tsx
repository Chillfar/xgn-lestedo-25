import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { modalBoxSx, closeButtonStyle, titleSx, alertSx, textFieldSx, buttonSx } from "./LoginModal.styles";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  isMobile: boolean;
}

// styles exported to LoginModal.styles.ts

export default function LoginModal({ open, onClose, isMobile }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Introduce tu email y contraseña");
      return;
    }
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      onClose();
    } catch (err: any) {
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        setError("Email o contraseña incorrectos");
      } else if (err.code === "auth/user-not-found") {
        setError("No existe ningún usuario con ese email");
      } else if (err.code === "auth/too-many-requests") {
        setError("Demasiados intentos. Espera un momento e inténtalo de nuevo");
      } else {
        setError("Error al iniciar sesión. Inténtalo de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <Modal open={open} onClose={onClose} style={isMobile ? { zIndex: 99999 } : undefined} sx={{ zIndex: 99999 }}>
      <Box sx={modalBoxSx(isMobile)}>
        <div onClick={onClose} style={closeButtonStyle}>✕</div>
        <Typography variant="h5" sx={titleSx}>
          🔐 Iniciar Sesión
        </Typography>

        {error && (
          <Alert severity="error" sx={alertSx}>
            {error}
          </Alert>
        )}

        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(""); }}
          onKeyDown={handleKeyDown}
          sx={textFieldSx}
        />

        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setError(""); }}
          onKeyDown={handleKeyDown}
          sx={textFieldSx}
        />

        <Button
          variant="contained"
          fullWidth
          disabled={loading}
          onClick={handleLogin}
          sx={buttonSx}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Entrar"}
        </Button>
      </Box>
    </Modal>
  );
}
