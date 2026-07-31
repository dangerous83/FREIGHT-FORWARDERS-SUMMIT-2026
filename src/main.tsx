import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Base stylesheet MUST load before component stylesheets so that later,
// more specific layout classes (e.g. .case-layout, .contact-layout) win the
// cascade over base rules like .slide__inner.
import './styles/global.css';
import App from './App';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
