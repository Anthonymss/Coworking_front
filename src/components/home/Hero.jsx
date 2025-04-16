import React from 'react';
import './Hero.css';
export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container-home">
        <h1 className="hero-title">Encuentra tu espacio de trabajo perfecto</h1>
        <p className="hero-description">Reserva espacios de trabajo, salas de reuniones y espacios para eventos con facilidad.</p>
        <a href="/spaces" className="btn btn-primary">Explora Espacios</a>
      </div>
    </section>
  );
}
