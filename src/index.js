import React from 'react';
import { createRoot } from 'react-dom/client';
import ContactForm from './components/ContactForm';
import HeroSlider from './components/HeroSlider';
import { CustomerChatProvider } from './components/chat/CustomerChatContext';
import CustomerChatButton from './components/chat/CustomerChatButton';
import CustomerChatWindow from './components/chat/CustomerChatWindow';
import AdminChatPanel from './components/chat/AdminChatPanel';
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


// Funcție nouă pentru renderizarea chat-ului
const renderChat = () => {
  const chatContainer = document.getElementById('chat-root');
  if (chatContainer) {
    const root = createRoot(chatContainer);
    root.render(
      <React.StrictMode>
        <CustomerChatProvider>
          <CustomerChatButton />
          <CustomerChatWindow />
        </CustomerChatProvider>
      </React.StrictMode>
    );
  }
};

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

  // Așteptăm ca DOM-ul să fie încărcat
document.addEventListener('DOMContentLoaded', () => {
  renderComponent(ContactForm, 'contact-form-root');
  renderComponent(HeroSlider, 'hero-slider-root');
;

    // Renderizare chat
    renderChat();
  });
  