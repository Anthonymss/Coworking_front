import React from 'react';
import './AboutSection.css';

export default function AboutSection() {
  return (
    <div className="container-about">
      <div className="about-header">
        <h2 className="about-section-title">Nuestra Historia</h2>
        <p className="about-subtitle">Reinventando el Espacio de Trabajo Moderno</p>
      </div>

      <div className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h3 className="section-subtitle">Nuestro Origen</h3>
            <p className="section-description">
              En 2020, CoworkSpace nació con la misión de transformar la forma en que las personas trabajan. Desde entonces, hemos creado espacios inspiradores que fomentan la productividad, la colaboración y el crecimiento profesional.
            </p>
            <div className="milestones">
              <div className="milestone">
                <div className="milestone-number">2020</div>
                <div className="milestone-content">
                  <h4>Primera Sede</h4>
                  <p>Comenzamos nuestra aventura con una sede en el corazón de la ciudad.</p>
                </div>
              </div>
              <div className="milestone">
                <div className="milestone-number">2022</div>
                <div className="milestone-content">
                  <h4>Red Expandida</h4>
                  <p>Expandimos a 3 sedes estratégicamente ubicadas.</p>
                </div>
              </div>
              <div className="milestone">
                <div className="milestone-number">2023</div>
                <div className="milestone-content">
                  <h4>500 Miembros</h4>
                  <p>Una comunidad vibrante de profesionales y empresas.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="about-image-container">
            <img src="https://images.unsplash.com/photo-1749738456487-2af715ab65ea?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Espacio de Trabajo Moderno" />
          </div>
        </div>
      </div>

      <div className="about-section">
        <div className="about-content">
          <div className="about-image-container">
            <img src="https://images.unsplash.com/photo-1623124099135-948a22b49ad2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Espacios Flexibles" />
          </div>
          <div className="about-text">
            <h3 className="section-subtitle">Nuestros Servicios</h3>
            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon-container">
                  <span className="service-icon">🏢</span>
                </div>
                <h4>Espacios Flexibles</h4>
                <ul className="service-features">
                  <li>• Estaciones de trabajo</li>
                  <li>• Oficinas privadas</li>
                  <li>• Salas de reuniones</li>
                  <li>• Salas de conferencias</li>
                </ul>
              </div>
              <div className="service-card">
                <div className="service-icon-container">
                  <span className="service-icon">💻</span>
                </div>
                <h4>Equipamiento</h4>
                <ul className="service-features">
                  <li>• Internet de alta velocidad</li>
                  <li>• Impresoras y escáneres</li>
                  <li>• Videoconferencia</li>
                  <li>• Cocina equipada</li>
                </ul>
              </div>
              <div className="service-card">
                <div className="service-icon-container">
                  <span className="service-icon">👥</span>
                </div>
                <h4>Comunidad</h4>
                <ul className="service-features">
                  <li>• Eventos networking</li>
                  <li>• Talleres y mentorías</li>
                  <li>• Espacio de eventos</li>
                  <li>• Programa de referidos</li>
                </ul>
              </div>
              <div className="service-card">
                <div className="service-icon-container">
                  <span className="service-icon">📅</span>
                </div>
                <h4>Reservas</h4>
                <ul className="service-features">
                  <li>• App móvil</li>
                  <li>• Reserva instantánea</li>
                  <li>• Horario flexible</li>
                  <li>• Soporte 24/7</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h3 className="section-subtitle">Nuestros Valores</h3>
            <div className="values-grid">
              <div className="value-card">
                <div className="value-icon-container">
                  <span className="value-icon">🎯</span>
                </div>
                <h4>Excelencia</h4>
                <p>Comprometidos con la calidad en todo lo que hacemos, desde el servicio hasta los espacios.</p>
              </div>
              <div className="value-card">
                <div className="value-icon-container">
                  <span className="value-icon">🤝</span>
                </div>
                <h4>Colaboración</h4>
                <p>Fomentamos la colaboración y el crecimiento mutuo entre nuestros miembros.</p>
              </div>
              <div className="value-card">
                <div className="value-icon-container">
                  <span className="value-icon">🚀</span>
                </div>
                <h4>Innovación</h4>
                <p>Constantemente buscamos mejorar y ofrecer soluciones innovadoras.</p>
              </div>
              <div className="value-card">
                <div className="value-icon-container">
                  <span className="value-icon">🌱</span>
                </div>
                <h4>Sostenibilidad</h4>
                <p>Comprometidos con prácticas ecológicas y responsables.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="about-section about-section-last">
        <div className="about-content">
          <div className="about-image-container">
            <img src="https://images.unsplash.com/photo-1539713161238-577393fe91ea?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Impacto y Crecimiento" />
          </div>
          <div className="about-text">
            <h3 className="section-subtitle">Nuestro Impacto</h3>
            <div className="impact-grid">
              <div className="impact-card">
                <div className="impact-number">1000+</div>
                <h4>Profesionales</h4>
                <p>Una comunidad vibrante de profesionales de diferentes sectores.</p>
              </div>
              <div className="impact-card">
                <div className="impact-number">50+</div>
                <h4>Empresas</h4>
                <p>Desde startups hasta grandes corporaciones confían en nosotros.</p>
              </div>
              <div className="impact-card">
                <div className="impact-number">2000+</div>
                <h4>Horas de trabajo</h4>
                <p>Productividad y colaboración en nuestros espacios.</p>
              </div>
            </div>
            <div className="impact-stories">
              <div className="story-card">
                <h4>"Transformación Profesional"</h4>
                <p>"Desde que me uní a CoworkSpace, mi productividad ha aumentado significativamente. El ambiente es inspirador y la comunidad es increíble."</p>
                <div className="story-author">- María G., Diseñadora UX</div>
              </div>
              <div className="story-card">
                <h4>"Crecimiento Empresarial"</h4>
                <p>"Nuestra startup encontró en CoworkSpace el espacio perfecto para crecer. Las instalaciones y la comunidad han sido fundamentales para nuestro éxito."</p>
                <div className="story-author">- Juan P., CEO de TechStart</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
