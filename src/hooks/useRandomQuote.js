import { useState, useEffect } from 'react';

const QUOTE_INTERVAL_MS = 20000;

function useRandomQuote(quotes) {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const generateQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    };

    const interval = setInterval(generateQuote, QUOTE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [quotes]);

  return quote;
}

export default useRandomQuote;
