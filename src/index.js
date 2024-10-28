import React from 'react';
import { createRoot } from 'react-dom/client';
import ContactForm from './components/ContactForm';
import HeroSlider from './components/HeroSlider';
import '../styles.css';

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

// Renderizare ContactForm
ReactDOM.render(
  <React.StrictMode>
    <ContactForm />
  </React.StrictMode>,
  document.getElementById('contact-form-root')
);

// Renderizare HeroSlider
ReactDOM.render(
    <React.StrictMode>
      <HeroSlider />
    </React.StrictMode>,
    document.getElementById('hero-slider-root')
  );  