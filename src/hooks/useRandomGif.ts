import { useState, useEffect } from 'react';

const DEFAULT_GIF_URL = "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmd4M3pnMXhoeW95aXJvamg0dWhydTdkZGp4bjN1cGF1bjgwc3g0NCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5tiNlHkA1WdUh3jRDW/giphy.gif";
const GIF_INTERVAL_MS = 80000;
const GIPHY_API_URL = "https://api.giphy.com/v1/gifs/random?api_key=JD0bZoUQ3cz56tCr8ndeAbteNP8SzTce&tag=fortnite";

function useRandomGif() {
  const [gifUrl, setGifUrl] = useState(DEFAULT_GIF_URL);

  const fetchRandomGif = async () => {
    // Check if document is hidden to save API requests and bandwidth
    if (document.hidden) return;
    
    try {
      const response = await fetch(GIPHY_API_URL);
      const data = await response.json();
      setGifUrl(data.data.images.original.url);
    } catch (error) {
      console.error("Error fetching GIF:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchRandomGif, GIF_INTERVAL_MS);
    
    // Also fetch immediately if we just focused the tab and it's been a while
    const handleFocus = () => {
      fetchRandomGif();
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return { gifUrl, fetchRandomGif };
}

export default useRandomGif;
