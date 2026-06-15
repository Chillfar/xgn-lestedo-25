import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { modalBoxSx, closeButtonStyle, titleContainerSx, titleTextSx, alertSx, textFieldSx, buttonSx, inputLabelSx } from "./LoginModal.styles";

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
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e: React.MouseEvent) => e.preventDefault();

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
      <Box sx={{ ...modalBoxSx(isMobile), display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }} className="liquid-glass">
        <Box sx={{ ...titleContainerSx, position: 'relative', top: 0, mt: 0, mx: 0, marginBottom: 0, flexShrink: 0 }}>
          <div onClick={onClose} style={{ ...closeButtonStyle, top: '16px', right: '16px', zIndex: 50 }}>✕</div>
          <Typography variant="h5" sx={{ ...titleTextSx, display: "flex", gap: "12px", alignItems: "center", textAlign: "left" }}>
            <span style={{ flexShrink: 0 }}>🔐</span>
            <span>Iniciar Sesión</span>
          </Typography>
        </Box>

        <Box sx={{ overflowY: 'auto', flex: 1, padding: isMobile ? "20px" : "32px", pt: "20px" }}>
          {error && (
            <Alert severity="error" sx={alertSx}>
              {error}
            </Alert>
          )}

          <Box sx={{ width: "100%", mb: 2 }}>
            <Typography sx={inputLabelSx}>Email</Typography>
            <TextField
              type="email"
              fullWidth
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              onKeyDown={handleKeyDown}
              sx={textFieldSx}
            />
          </Box>

          <Box sx={{ width: "100%", mb: 3 }}>
            <Typography sx={inputLabelSx}>Contraseña</Typography>
            <TextField
              type={showPassword ? "text" : "password"}
              fullWidth
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              onKeyDown={handleKeyDown}
              sx={textFieldSx}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

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
      </Box>
    </Modal>
  );
}
