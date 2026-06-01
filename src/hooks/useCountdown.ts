import { useState, useEffect } from 'react';

function useCountdown(targetDate: string | Date) {
  const [countdown, setCountdown] = useState("");
  const [videoCountdownModalOpen, setVideoCountdownModalOpen] = useState(false);
  const [videoInaugurationModalOpen, setVideoInaugurationModalOpen] = useState(false);

  useEffect(() => {
    const targetTime = new Date(targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance <= 31000 && distance > -800) {
        setVideoCountdownModalOpen(true);
        localStorage.setItem("countdown", '');
      } else if (distance <= -800) {
        clearInterval(interval);
        setVideoCountdownModalOpen(false);
        if (localStorage.getItem('countdown') === '¡Party inaugurada!') {
          setCountdown("¡Party inaugurada!");
          return;
        }

        setVideoInaugurationModalOpen(true);
        setCountdown("¡Party inaugurada!");
        localStorage.setItem("countdown", '¡Party inaugurada!');
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return {
    countdown,
    videoCountdownModalOpen,
    setVideoCountdownModalOpen,
    videoInaugurationModalOpen,
    setVideoInaugurationModalOpen
  };
}

export default useCountdown;
