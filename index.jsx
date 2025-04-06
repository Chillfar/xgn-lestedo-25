import React from 'react';
import ReactDOM from 'react-dom/client';
import './src/index.css';
import GameDashboard from './src/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GameDashboard />
  </React.StrictMode>
);