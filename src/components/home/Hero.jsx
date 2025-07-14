import React from 'react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Espacios de Trabajo</h1>
        <p className="hero-description">Descubre espacios modernos para tu productividad</p>
        <a href="/spaces" className="btn btn-primary">Explora Espacios</a>
      </div>
    </section>
  );
}
