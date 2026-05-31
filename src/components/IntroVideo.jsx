import { useEffect } from "react";
import { Button } from "@mui/material";

export default function IntroVideo({ onSkip }) {
  useEffect(() => {
    const video = document.getElementById("intro-video");
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => console.log("Autoplay prevented"));
      video.onended = () => onSkip();
    }
  }, [onSkip]);

  const handleSkip = () => {
    const video = document.getElementById("intro-video");
    if (video) {
      video.currentTime = video.duration;
      video.pause();
    }
    onSkip();
  };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "black", alignItems: "center", justifyContent: "center" }}>
      <Button variant="contained" color="secondary" onClick={handleSkip} sx={{ mt: 2 }} style={{ zIndex: 10000 }}>Saltar intro</Button>
      <video id="intro-video" width="100%" height="100%" autoPlay muted playsInline>
        <source src="/Imaginary Neon Cube_free.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
