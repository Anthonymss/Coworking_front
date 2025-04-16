import React from 'react';
import './ContactForm.css';

export default function ContactForm() {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <h2 className="contact-section-title">Contáctanos</h2>
        <p className="contact-description">
          Estamos aquí para ayudarte. Si tienes alguna consulta sobre nuestros espacios de trabajo, membresías o cualquier otro servicio, no dudes en contactarnos.
        </p>
        <p className="contact-info">
          <strong>Teléfono:</strong> <a href="tel:+51961412599">+51 961412599</a>
        </p>
        <p className="contact-info">
          <strong>Email:</strong>{' '}
          <a
            href="mailto:coworkingspace900@gmail.com"
            rel="noopener noreferrer"
          >
            coworkingspace900@gmail.com
          </a>
        </p>
        <p className="contact-info">
          <strong>Dirección:</strong> Alameda Salaverry 102, Arequipa, Perú
        </p>
        <p className="contact-details">
          Nuestro equipo está disponible de lunes a viernes de 9:00 AM a 6:00 PM.
          Visítanos para un recorrido y conoce cómo podemos ayudarte a lograr más.
        </p>
        <div className="contact-cta-buttons">
          <a
            href="mailto:coworkingspace900@gmail.com"
            className="contact-btn contact-btn-primary"
            rel="noopener noreferrer"
          >
            Escríbenos
          </a>
          <a
            href="https://www.google.com/maps?q=Alameda+Salaverry+102,+Arequipa,+Perú"
            className="contact-btn contact-btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cómo llegar
          </a>
        </div>
      </div>
    </section>
  );
}
