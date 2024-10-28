import React, { useState, createContext, useContext } from 'react';
import { Globe } from 'lucide-react';

const LanguageContext = createContext();

// Sistem complet de traduceri pentru întregul site
const translations = {
  ro: {
    // Header/Navigation
    home: "Acasă",
    about: "Despre noi",
    services: "Servicii",
    projects: "Proiecte",
    contact: "Contact",

    // Hero Section
    heroTitle: "United4 Vision Properties",
    heroSubtitle: "Partenerul tău de încredere în imobiliare",
    contactUs: "Contactează-ne",

    // About Section
    aboutTitle: "Despre noi",
    aboutText1: "United4 Vision Properties este o companie de top în domeniul imobiliar, dedicată să ofere clienților noștri cele mai bune soluții pentru nevoile lor imobiliare.",
    aboutText2: "Cu o experiență vastă și o echipă de profesioniști pasionați, suntem pregătiți să vă ghidăm în fiecare etapă a procesului imobiliar.",

    // Services Section
    servicesTitle: "Serviciile noastre",
    propertySales: "Vânzări proprietăți",
    propertySalesDesc: "Asistență completă în procesul de vânzare a proprietății tale.",
    propertyRentals: "Închirieri",
    propertyRentalsDesc: "Găsim chiriașul perfect pentru proprietatea ta sau locuința ideală pentru tine.",
    realEstateConsulting: "Consultanță imobiliară",
    realEstateConsultingDesc: "Sfaturi de expert pentru decizii informate în piața imobiliară.",
    propertyManagement: "Administrare proprietăți",
    propertyManagementDesc: "Gestionăm eficient proprietățile tale pentru maximizarea rentabilității.",

    // Projects Section
    projectsTitle: "Proiectul nostru",
    projectName: "United4 Project",
    projectDesc: "Complex rezidențial modern în centrul orașului",
    projectFeatures: "Caracteristici principale",
    modernApartments: "Apartamente moderne",
    topFacilities: "Facilități de top",
    centralLocation: "Locație centrală",
    
    // Project Details
    projectDetailsTitle: "Descriere detaliată",
    projectMainDesc: "United4 Project este un complex rezidențial de ultimă generație, conceput pentru a oferi un stil de viață modern și confortabil în inima orașului. Cu o arhitectură impresionantă și facilități de top, acest proiect reprezintă viitorul locuințelor urbane.",
    
    // Features List
    featuresTitle: "Caracteristici principale",
    feature1: "Apartamente spațioase cu 1, 2 și 3 camere",
    feature2: "Design interior modern și finisaje de înaltă calitate",
    feature3: "Vedere panoramică asupra orașului",
    feature4: "Sistem de securitate 24/7",
    feature5: "Parcare subterană",
    feature6: "Spații verzi și zone de relaxare",

    // Facilities
    facilitiesTitle: "Facilități",
    facility1: "Sală de fitness complet echipată",
    facility2: "Piscină interioară și exterioară",
    facility3: "Zonă de spa și saună",
    facility4: "Loc de joacă pentru copii",
    facility5: "Sală de evenimente și conferințe",

    // Location Benefits
    locationTitle: "Locație",
    locationIntro: "Situat în centrul orașului, United4 Project oferă acces facil la:",
    benefit1: "Stații de metrou și transport public",
    benefit2: "Parcuri și zone de recreere",
    benefit3: "Centre comerciale și restaurante",
    benefit4: "Instituții de învățământ și medicale",

    // Contact Form
    formName: "Numele dumneavoastră",
    formEmail: "Adresa de email",
    formMessage: "Mesajul dumneavoastră",
    formSubmit: "Trimite mesajul",
    formRequired: "este obligatoriu",
    formEmailValid: "Vă rugăm să introduceți un email valid",
    formSuccess: "Mesajul a fost trimis cu succes!",
    formError: "A apărut o eroare. Vă rugăm să încercați din nou.",

    // Footer
    footerContact: "Contact",
    footerRights: "Toate drepturile rezervate",
    termsConditions: "Termeni și Condiții",
    privacyPolicy: "Politica de Confidențialitate",
    cookiePolicy: "Politica de Cookie-uri",

    // Legal Pages
    terms: {
      title: "Termeni și Condiții",
      intro: "Bine ați venit pe site-ul United4 Vision Properties. Utilizând acest site, sunteți de acord cu acești termeni și condiții în întregime.",
      // ... restul secțiunilor pentru termeni
    },
    privacy: {
      title: "Politica de Confidențialitate",
      intro: "La United4 Vision Properties, respectăm confidențialitatea vizitatorilor noștri și suntem dedicați protejării informațiilor personale.",
      // ... restul secțiunilor pentru confidențialitate
    },
    cookies: {
      title: "Politica de Cookie-uri",
      intro: "Cookie-urile sunt fișiere text mici care sunt stocate pe dispozitivul dumneavoastră atunci când vizitați un site web.",
      // ... restul secțiunilor pentru cookie-uri
    }
  },
  en: {
    // Header/Navigation
    home: "Home",
    about: "About",
    services: "Services",
    projects: "Projects",
    contact: "Contact",

    // Hero Section
    heroTitle: "United4 Vision Properties",
    heroSubtitle: "Your trusted real estate partner",
    contactUs: "Contact us",

    // About Section
    aboutTitle: "About Us",
    aboutText1: "United4 Vision Properties is a top real estate company dedicated to providing our clients with the best solutions for their real estate needs.",
    aboutText2: "With vast experience and a team of passionate professionals, we are ready to guide you through every step of the real estate process.",

    // Services Section
    servicesTitle: "Our Services",
    propertySales: "Property Sales",
    propertySalesDesc: "Complete assistance in the process of selling your property.",
    propertyRentals: "Rentals",
    propertyRentalsDesc: "We find the perfect tenant for your property or the ideal home for you.",
    realEstateConsulting: "Real Estate Consulting",
    realEstateConsultingDesc: "Expert advice for informed decisions in the real estate market.",
    propertyManagement: "Property Management",
    propertyManagementDesc: "We efficiently manage your properties to maximize profitability.",

    // Projects Section
    projectsTitle: "Our Project",
    projectName: "United4 Project",
    projectDesc: "Modern residential complex in the city center",
    projectFeatures: "Main Features",
    modernApartments: "Modern Apartments",
    topFacilities: "Top Facilities",
    centralLocation: "Central Location",
    
    // Project Details
    projectDetailsTitle: "Detailed Description",
    projectMainDesc: "United4 Project is a state-of-the-art residential complex designed to offer a modern and comfortable lifestyle in the heart of the city. With impressive architecture and top facilities, this project represents the future of urban living.",
    
    // Features List
    featuresTitle: "Main Features",
    feature1: "Spacious 1, 2, and 3-bedroom apartments",
    feature2: "Modern interior design and high-quality finishes",
    feature3: "Panoramic city view",
    feature4: "24/7 security system",
    feature5: "Underground parking",
    feature6: "Green spaces and relaxation areas",

    // Facilities
    facilitiesTitle: "Facilities",
    facility1: "Fully equipped fitness center",
    facility2: "Indoor and outdoor pool",
    facility3: "Spa and sauna area",
    facility4: "Children's playground",
    facility5: "Events and conference room",

    // Location Benefits
    locationTitle: "Location",
    locationIntro: "Located in the city center, United4 Project offers easy access to:",
    benefit1: "Metro stations and public transport",
    benefit2: "Parks and recreation areas",
    benefit3: "Shopping centers and restaurants",
    benefit4: "Educational and medical institutions",

    // Contact Form
    formName: "Your name",
    formEmail: "Email address",
    formMessage: "Your message",
    formSubmit: "Send message",
    formRequired: "is required",
    formEmailValid: "Please enter a valid email",
    formSuccess: "Message sent successfully!",
    formError: "An error occurred. Please try again.",

    // Footer
    footerContact: "Contact",
    footerRights: "All rights reserved",
    termsConditions: "Terms & Conditions",
    privacyPolicy: "Privacy Policy",
    cookiePolicy: "Cookie Policy",

    // Legal Pages
    terms: {
      title: "Terms & Conditions",
      intro: "Welcome to United4 Vision Properties website. By using this site, you agree to these terms and conditions in full.",
      // ... rest of terms sections
    },
    privacy: {
      title: "Privacy Policy",
      intro: "At United4 Vision Properties, we respect our visitors' privacy and are committed to protecting your personal information.",
      // ... rest of privacy sections
    },
    cookies: {
      title: "Cookie Policy",
      intro: "Cookies are small text files that are stored on your device when you visit a website.",
      // ... rest of cookies sections
    }
  }
};

// Provider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ro');

  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'ro' ? 'en' : 'ro');
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook pentru utilizarea traducerilor
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Componenta pentru text tradus
export const TranslatedText = ({ textKey }) => {
  const { t } = useLanguage();
  return <>{t(textKey)}</>;
};

// Componenta pentru comutatorul de limbă
const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();
  
  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors duration-200"
      aria-label="Switch language"
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium">
        {language.toUpperCase()}
      </span>
    </button>
  );
};

export default LanguageSwitcher;