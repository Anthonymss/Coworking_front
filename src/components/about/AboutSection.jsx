import React from 'react';
import './AboutSection.css';

export default function AboutSection() {
  return (
    <div className="container-about">
      <div className="about-header">
        <h2 className="about-section-title">Acerca de CoworkSpace</h2>
        <p className="about-subtitle">Donde la Inspiración se Encuentra con la Productividad</p>
      </div>
      <div className="about-content">
        <div className="about-section">
          <div className="about-text">
            <h3 className="section-subtitle">Nuestro Propósito</h3>
            <p className="section-description">
              En CoworkSpace, estamos dedicados a crear entornos de trabajo que impulsen la creatividad y la conexión humana. Creemos que grandes cosas suceden cuando las personas se reúnen en espacios diseñados para la inspiración y la productividad.
            </p>
          </div>
          <img className="about-image" src="https://plus.unsplash.com/premium_photo-1681487178876-a1156952ec60?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Espacio de Trabajo Inspirador" />
        </div>

        <div className="about-section">
          <img className="about-image" src="https://plus.unsplash.com/premium_photo-1681487178876-a1156952ec60?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Reunión Colaborativa" />
          <div className="about-text">
            <h3 className="section-subtitle">Expertos en Espacios de Trabajo</h3>
            <p className="section-description">
              Nuestro equipo de expertos en espacios de trabajo mejora continuamente los entornos para apoyar el crecimiento personal y profesional, asegurando que tu éxito sea nuestra prioridad. Redefinamos juntos la forma en que trabajas.
            </p>
          </div>
        </div>

        <div className="about-section about-section-last">
          <div className="about-text full-width">
            <h3 className="section-subtitle">Impulsados por la Experiencia</h3>
            <p className="section-description">
              Nuestra misión es mejorar los entornos de trabajo, fomentando el crecimiento y la creatividad mientras ampliamos nuestro impacto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
