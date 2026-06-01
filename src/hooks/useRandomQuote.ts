import { useState, useEffect, useCallback } from 'react';

const QUOTE_INTERVAL_MS = 20000;

function useRandomQuote(quotes: string[]) {
  const getRandomQuote = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }, [quotes]);

  const [quote, setQuote] = useState(() => getRandomQuote());

  useEffect(() => {
    const interval = setInterval(() => {
      setQuote(getRandomQuote());
    }, QUOTE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [getRandomQuote]);

  return quote;
}

export default useRandomQuote;
