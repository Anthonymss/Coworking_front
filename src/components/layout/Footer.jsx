import { faFacebookF, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="cs-footer">
      <div className="cs-footer-container">
        <div className="cs-footer-section">
          <h3 className="cs-footer-title">Sobre Nosotros</h3>
          <p className="cs-footer-text">CoworkSpace ofrece espacios de trabajo flexibles para profesionales y equipos. Únete a nuestra comunidad hoy mismo.</p>
        </div>
        <div className="cs-footer-section">
          <h3 className="cs-footer-title">Enlaces Rápidos</h3>
          <ul className="cs-footer-links">
            <li><a href="/spaces" className="cs-footer-link">Espacios</a></li>
            <li><a href="/memberships" className="cs-footer-link">Membresías</a></li>
            <li><a href="/events" className="cs-footer-link">Eventos</a></li>
            <li><a href="/about" className="cs-footer-link">Acerca de</a></li>
            <li><a href="/contact" className="cs-footer-link">Contacto</a></li>
          </ul>
        </div>
        <div className="cs-footer-section">
          <h3 className="cs-footer-title">Contáctanos</h3>
          <ul className="cs-footer-contact">
            <li>+51 961412599</li>
            <li>coworkingspace900@gmail.com</li>
            <li>Alameda Salaverry 102, Arequipa, Perú</li>
          </ul>
        </div>
        <div className="cs-footer-section">
          <h3 className="cs-footer-title">Síguenos</h3>
          <div className="cs-social-links">
            <a href="#" className="cs-social-link"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#" className="cs-social-link"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#" className="cs-social-link"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="#" className="cs-social-link"><FontAwesomeIcon icon={faLinkedin} /></a>
          </div>
        </div>
      </div>
      <div className="cs-footer-bottom">
        <p className="cs-copyright">&copy; 2024 CoworkSpace. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
