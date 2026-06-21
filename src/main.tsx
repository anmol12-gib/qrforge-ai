import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { loadTheme } from './lib/storage';
import './index.css';
import App from './App.tsx';

const theme = loadTheme();
document.documentElement.classList.toggle('light', theme === 'light');
document.documentElement.style.colorScheme = theme;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
