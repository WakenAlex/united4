import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import ContactForm from './components/ContactForm';
import HeroSlider from './components/HeroSlider';
import '../styles.css';  // Ajustează calea relativă la CSS

// Componentă pentru loading
const LoadingSpinner = () => (
  <div>Se încarcă...</div>
);

// Funcție pentru a renderiza componente în siguranță
const renderComponent = (Component, elementId) => {
  const container = document.getElementById(elementId);
  if (container) {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <Component />
      </React.StrictMode>
    );
  }
};

// Așteptăm ca DOM-ul să fie încărcat
document.addEventListener('DOMContentLoaded', () => {
  renderComponent(ContactForm, 'contact-form-root');
  renderComponent(HeroSlider, 'hero-slider-root');
});