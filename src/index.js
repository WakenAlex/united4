import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import '../styles.css';

// Lazy loading pentru componente
const ContactForm = React.lazy(() => import('./components/ContactForm'));
const HeroSlider = React.lazy(() => import('./components/HeroSlider'));

// Componentă simplă pentru loading state
const LoadingSpinner = () => (
  <div className="loading-spinner">
    Se încarcă...
  </div>
);

// Funcție actualizată pentru a renderiza componente cu Suspense
const renderComponent = (Component, elementId) => {
  const container = document.getElementById(elementId);
  if (container) {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <Suspense fallback={<LoadingSpinner />}>
          <Component />
        </Suspense>
      </React.StrictMode>
    );
  }
};

// Așteptăm ca DOM-ul să fie încărcat
document.addEventListener('DOMContentLoaded', () => {
  renderComponent(ContactForm, 'contact-form-root');
  renderComponent(HeroSlider, 'hero-slider-root');
});

// Șterge aceste renderizări duplicate deoarece folosim deja renderComponent
// ReactDOM.render și cele două blocuri de cod de mai jos pot fi șterse
// deoarece sunt redundante cu addEventListener de mai sus

// ReactDOM.render(
//   <React.StrictMode>
//     <ContactForm />
//   </React.StrictMode>,
//   document.getElementById('contact-form-root')
// );

// ReactDOM.render(
//     <React.StrictMode>
//       <HeroSlider />
//     </React.StrictMode>,
//     document.getElementById('hero-slider-root')
//   );