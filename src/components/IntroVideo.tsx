import { useEffect } from "react";
import { Button } from "@mui/material";

interface IntroVideoProps {
  onSkip: () => void;
}

export default function IntroVideo({ onSkip }: IntroVideoProps) {
  useEffect(() => {
    const video = document.getElementById("intro-video") as HTMLVideoElement | null;
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => console.log("Autoplay prevented"));
      video.onended = () => onSkip();
    }
  }, [onSkip]);

  const handleSkip = () => {
    const video = document.getElementById("intro-video") as HTMLVideoElement | null;
    if (video) {
      video.currentTime = video.duration;
      video.pause();
    }
    onSkip();
  };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "black", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Button variant="contained" color="secondary" onClick={handleSkip} style={{ position: "absolute", bottom: "40px", right: "40px", zIndex: 10000 }}>Saltar intro</Button>
      <video id="intro-video" width="100%" height="100%" autoPlay muted playsInline>
        <source src="/Imaginary Neon Cube_free.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
