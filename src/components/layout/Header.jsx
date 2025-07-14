import { faBars, faCoffee, faSignOutAlt, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import AuthModal from '../auth/AuthModal';
import './Header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      setIsUserLoggedIn(true);
    }
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('.dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setIsUserLoggedIn(false);
    setIsDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <a href="/" className="logo">
          <FontAwesomeIcon icon={faCoffee} className="logo-icon" />
          <span className="logo-text">CoworkSpace</span>
        </a>
        <nav className={`header-nav ${isMenuOpen ? 'is-open' : ''}`}>
          <a href="/spaces" className="nav-item">Espacios</a>
          <a href="/memberships" className="nav-item">Membresías</a>
          <a href="/about" className="nav-item">Sobre Nosotros</a>
          <a href="/contact" className="nav-item">Contáctanos</a>
        </nav>
        <div className="header-actions">
          <div className="user-menu dropdown">
            {isUserLoggedIn ? (
              <>
                <button className="user-btn" onClick={toggleDropdown}>
                  <FontAwesomeIcon icon={faUserCircle} className="fa-2x" />
                </button>
                <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                  <a href="/profile" className="dropdown-item">
                    <FontAwesomeIcon icon={faUserCircle} /> Ver Perfil
                  </a>
                  <button onClick={handleLogout} className="dropdown-item">
                    <FontAwesomeIcon icon={faSignOutAlt} /> Salir
                  </button>
                </div>
              </>
            ) : (
              <button className="auth-btn" onClick={toggleModal}>
                <FontAwesomeIcon icon={faUser} className="fa-1x" /> Iniciar sesión
              </button>
            )}
          </div>
          <button 
            className="menu-toggle" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      {isModalOpen && <AuthModal onClose={toggleModal} />}
    </header>
  );
}
