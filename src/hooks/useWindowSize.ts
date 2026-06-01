import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

function useWindowSize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = width <= MOBILE_BREAKPOINT;

  return { width, isMobile };
}

export default useWindowSize;
