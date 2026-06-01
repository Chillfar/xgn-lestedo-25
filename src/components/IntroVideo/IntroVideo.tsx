import { useEffect } from "react";
import { Button } from "@mui/material";
import { containerStyle, skipButtonStyle } from "./IntroVideo.styles";

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
    <div style={containerStyle}>
      <Button variant="contained" color="secondary" onClick={handleSkip} style={skipButtonStyle}>Saltar intro</Button>
      <video id="intro-video" width="100%" height="100%" autoPlay muted playsInline>
        <source src="/xgn-lestedo-25/Imaginary Neon Cube_free.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
