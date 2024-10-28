import React from 'react';
import { createRoot } from 'react-dom/client';
import ContactForm from './components/ContactForm';
import HeroSlider from './components/HeroSlider';
import { LanguageProvider, LanguageSwitcher, TranslatedText } from './components/LanguageSwitcher';
import './styles/LanguageSwitcher.css';
import '../styles.css';

// Componenta Header actualizată cu traduceri
const Header = () => {
  return (
    <div>
      <div className="logo">
        <a href="index.html">
          <img src="images/United4Black.png" alt="United4 Vision Properties Logo" />
        </a>
      </div>

      <div className="nav-links">
        <a href="#home"><TranslatedText textKey="home" /></a>
        <a href="#about"><TranslatedText textKey="about" /></a>
        <a href="#services"><TranslatedText textKey="services" /></a>
        <a href="#projects"><TranslatedText textKey="projects" /></a>
        <a href="#contact"><TranslatedText textKey="contact" /></a>
        <LanguageSwitcher />
      </div>

      <div className="burger">
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </div>
  );
};

// Componenta Hero actualizată cu traduceri
const HeroContent = () => {
  return (
    <div className="hero-content">
      <h1><TranslatedText textKey="heroTitle" /></h1>
      <p><TranslatedText textKey="heroSubtitle" /></p>
      <a href="#contact" className="cta-button">
        <TranslatedText textKey="contactUs" />
      </a>
    </div>
  );
};

// Componenta About actualizată cu traduceri
const AboutSection = () => {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <h2><TranslatedText textKey="aboutTitle" /></h2>
        <div className="about-content">
          <div className="about-text">
            <p><TranslatedText textKey="aboutText1" /></p>
            <p><TranslatedText textKey="aboutText2" /></p>
          </div>
          <div className="about-image">
            <img src="images/placeholder.jpg" alt="Echipa United4 Vision Properties" />
          </div>
        </div>
      </div>
    </section>
  );
};

// Componenta Services actualizată cu traduceri
const ServicesSection = () => {
  return (
    <section id="services" className="section services-section">
      <div className="container">
        <h2><TranslatedText textKey="servicesTitle" /></h2>
        <div className="services-grid">
          <div className="service-card">
            <h3><TranslatedText textKey="propertySales" /></h3>
            <p><TranslatedText textKey="propertySalesDesc" /></p>
          </div>
          <div className="service-card">
            <h3><TranslatedText textKey="propertyRentals" /></h3>
            <p><TranslatedText textKey="propertyRentalsDesc" /></p>
          </div>
          <div className="service-card">
            <h3><TranslatedText textKey="realEstateConsulting" /></h3>
            <p><TranslatedText textKey="realEstateConsultingDesc" /></p>
          </div>
          <div className="service-card">
            <h3><TranslatedText textKey="propertyManagement" /></h3>
            <p><TranslatedText textKey="propertyManagementDesc" /></p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Componenta Footer actualizată cu traduceri
const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <a href="index.html">
              <img src="images/United4transparent.png" alt="United4 Vision Properties Logo" />
            </a>
          </div>
          <div className="footer-contact">
            <h4><TranslatedText textKey="footerContact" /></h4>
            <p>T: +40 (724) 237 929</p>
            <p>E: office@united4.ro</p>
          </div>
        </div>
        <div className="footer-policies">
          <a href="termeni-si-conditii.html"><TranslatedText textKey="termsConditions" /></a>
          <a href="politica-de-confidentialitate.html"><TranslatedText textKey="privacyPolicy" /></a>
          <a href="politica-de-cookies.html"><TranslatedText textKey="cookiePolicy" /></a>
        </div>
        <div className="footer-bottom">
          © 2024 United4 Vision Properties. <TranslatedText textKey="footerRights" />
        </div>
      </div>
    </footer>
  );
};

// Componenta principală care învelește totul
const App = () => {
  return (
    <LanguageProvider>
      <div>
        <Header />
        <main>
          <section id="hero" className="hero">
            <HeroContent />
            <HeroSlider />
          </section>
          <AboutSection />
          <ServicesSection />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

// Inițializare aplicație
document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }

  // Pentru componente individuale care necesită renderizare separată
  const renderComponent = (Component, elementId) => {
    const container = document.getElementById(elementId);
    if (container) {
      const root = createRoot(container);
      root.render(
        <React.StrictMode>
          <LanguageProvider>
            <Component />
          </LanguageProvider>
        </React.StrictMode>
      );
    }
  };

  renderComponent(ContactForm, 'contact-form-root');
  renderComponent(HeroSlider, 'hero-slider-root');
});

export default App;

// // Renderizare ContactForm
// ReactDOM.render(
//   <React.StrictMode>
//     <ContactForm />
//   </React.StrictMode>,
//   document.getElementById('contact-form-root')
// );

// // Renderizare HeroSlider
// ReactDOM.render(
//     <React.StrictMode>
//       <HeroSlider />
//     </React.StrictMode>,
//     document.getElementById('hero-slider-root')
//   );  