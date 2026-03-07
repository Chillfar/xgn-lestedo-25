import { useState, useEffect } from 'react';

function useGameState(initialState) {
  const [gameState, setGameState] = useState(initialState);

  useEffect(() => {
    // Logic to synchronize game state with a server or other parts of the application can be added here.
  }, [gameState]);

  const updateState = (newState) => {
    setGameState(prevState => ({ ...prevState, ...newState }));
  };

  const resetState = () => {
    setGameState(initialState);
  };

  return [gameState, updateState, resetState];
}

export default useGameState;
