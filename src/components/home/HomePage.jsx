import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import { FaStar, FaCheckCircle, FaMapMarkerAlt, FaCalendarAlt, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedType, setSelectedType] = React.useState('');
  const [selectedLocation, setSelectedLocation] = React.useState('');

  const featuredSpaces = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80',
      title: 'The Co-Work Hub',
      rating: 4.8,
      location: 'Centro Histórico',
      price: 2500,
      type: 'coworking',
      amenities: ['WiFi', 'Impresión', 'Café', 'Sala de reuniones']
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80',
      title: 'Business Center',
      rating: 4.9,
      location: 'Zona Rosa',
      price: 3500,
      type: 'meeting',
      amenities: ['Proyector', 'Pantalla', 'Videoconferencia', 'Pizarrón']
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80',
      title: 'Event Space',
      rating: 4.7,
      location: 'Polanco',
      price: 5000,
      type: 'event',
      amenities: ['Escenario', 'Iluminación', 'Sonido', 'Catering']
    }
  ];

  const stats = [
    { number: '100+', label: 'Espacios disponibles' },
    { number: '50+', label: 'Locaciones' },
    { number: '1000+', label: 'Profesionales' },
    { number: '24/7', label: 'Soporte' }
  ];

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Tu espacio ideal de trabajo</h1>
            <p className="hero-description">
              Descubre espacios de trabajo modernos, salas de reuniones y espacios para eventos en la ciudad.
            </p>
            <div className="search-container">
              <div className="search-box">
                <div className="search-input-wrapper">
                  <input 
                    type="text" 
                    placeholder="¿Qué tipo de espacio buscas?" 
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="search-icon" />
                </div>
                <button 
                  className="search-button"
                  onClick={() => navigate(`/spaces`)}
                >
                  <FaMapMarkerAlt /> Buscar
                </button>
              </div>
              <div className="search-filters">
                <div className="filter-group">
                  <select 
                    className="filter-select"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    <option value="">Tipo de espacio</option>
                    <option value="coworking">Coworking</option>
                    <option value="meeting">Salas de reuniones</option>
                    <option value="event">Espacios para eventos</option>
                  </select>
                </div>
                <div className="filter-group">
                  <select 
                    className="filter-select"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option value="">Ubicación</option>
                    <option value="cusco">Cusco</option>
                    <option value="lima">Lima</option>
                    <option value="arequipa">Arequipa</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="hero-buttons">
              <Link to="/spaces" className="btn btn-primary">Explorar Espacios</Link>
              <Link to="/about" className="btn btn-outline">¿Cómo funciona?</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Espacios Destacados</h2>
          <div className="featured-grid">
            {featuredSpaces.map(space => (
              <div key={space.id} className="featured-card">
                <img src={space.image} alt={space.title} className="space-image" />
                <div className="space-info">
                  <h3 className="space-title">{space.title}</h3>
                  <div className="space-rating">
                    <FaStar className="star-icon" />
                    <span>{space.rating}</span>
                  </div>
                  <div className="space-location">
                    <FaMapMarkerAlt className="location-icon" />
                    <span>{space.location}</span>
                  </div>
                  <div className="space-amenities">

                    <span className="price">${space.price}</span>
                    <span className="period">/mes</span>
                  </div>
                  <Link to={`/spaces/${space.id}`} className="btn btn-space">
                    Ver Detalles
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <h2 className="section-title">Por qué elegirnos</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <h3 className="stat-number">{stat.number}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Tipos de Espacios</h2>
          <div className="categories-grid">
            <div className="category-card">
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80" alt="Coworking" />
              <div className="category-overlay">
                <h3>Coworking</h3>
                <p>Despachos compartidos y privados</p>
                <Link to="/spaces?category=coworking" className="btn btn-category">Explorar</Link>
              </div>
            </div>
            <div className="category-card">
              <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80" alt="Meeting Rooms" />
              <div className="category-overlay">
                <h3>Salas de Reuniones</h3>
                <p>Espacios para eventos corporativos</p>
                <Link to="/spaces?category=meeting" className="btn btn-category">Explorar</Link>
              </div>
            </div>
            <div className="category-card">
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80" alt="Event Spaces" />
              <div className="category-overlay">
                <h3>Espacios para Eventos</h3>
                <p>Locaciones para conferencias y eventos</p>
                <Link to="/spaces?category=event" className="btn btn-category">Explorar</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>¿Listo para encontrar tu espacio ideal?</h2>
            <p>¡Comienza tu búsqueda hoy mismo!</p>
            <Link to="/spaces" className="btn btn-cta">Empezar Búsqueda</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
