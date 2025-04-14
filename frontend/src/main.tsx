import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { LevelProvider } from './context/LevelContext.tsx'; // Solo LevelProvider necesario
import { BrowserRouter } from 'react-router-dom'; // Importar BrowserRouter

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <LevelProvider>
        <App />
      </LevelProvider>
    </BrowserRouter>
)
