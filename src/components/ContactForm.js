import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Aici puteți adăuga logica pentru trimiterea datelor către server
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <form id="contact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Numele dumneavoastră"
        required
      />
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Adresa de email"
        required
      />
      <textarea
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Mesajul dumneavoastră"
        required
      ></textarea>
      <button type="submit" className="submit-btn">Trimite mesajul</button>
    </form>
  );
};

export default ContactForm;