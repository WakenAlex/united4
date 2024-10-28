import React from 'react';
import ReactDOM from 'react-dom';
import ContactForm from './components/ContactForm';
import HeroSlider from './components/HeroSlider';

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