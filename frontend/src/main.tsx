import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { LevelProvider } from './context/LevelContext.tsx'; // Solo LevelProvider necesario

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LevelProvider>
      <App />
    </LevelProvider>
  </StrictMode>,
)
