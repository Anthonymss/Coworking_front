import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReservationsService from '../../service/ReservationsService';
import { FaSearch, FaCalendar, FaClock, FaMoneyBill, FaSyncAlt } from 'react-icons/fa';
import './MyReservations.css';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default function MyReservations() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    spaceName: '',
    status: '',
    startDate: '',
    endDate: ''
  });

  const fetchReservations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        ...filters,
        page: currentPage,
        size: 10
      };

      const response = await ReservationsService.getReservations(params);
      console.log('Respuesta completa:', response);
      
      if (Array.isArray(response)) {
        setReservations(response);
        setTotalPages(1);
      } else {
        setError('No se recibieron datos válidos de la API');
      }
      
    } catch (error) {
      console.error('Error:', error);
      if (error.response?.status === 401) {
        setError('Sesión expirada. Por favor, inicia sesión nuevamente.');
        navigate('/login');
      } else {
        setError('Error al cargar las reservas');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [currentPage, filters]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
    setCurrentPage(1); 
    fetchReservations(); 
  };

  const getStatusColor = (status) => {
    return status === 0 ? 'active' : 'inactive';
  };

  const getStatusText = (status) => {
    return status === 0 ? 'Activa' : 'Inactiva';
  };

  const handlePageChange = (direction) => {
    if (direction === 'previous' && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  return (
    <div className="reservations-page">
      <div className="header-section">
        <h1 className="header-title">Mis Reservas</h1>
        <p className="header-subtitle">Gestiona tus reservas de espacios de coworking</p>
      </div>

      <div className="filters-container">
        <div className="filters-group">
          <div className="filter-item">
            <FaSearch className="filter-icon" />
            <input
              type="text"
              className="filter-input"
              placeholder="Nombre del espacio"
              value={filters.spaceName}
              onChange={(e) => handleFilterChange('spaceName', e.target.value)}
            />
          </div>

          <div className="filter-item">
            <FaClock className="filter-icon" />
            <select
              className="filter-select"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="">Todos los estados</option>
              <option value="1">Activas</option>
              <option value="0">Inactivas</option>
            </select>
          </div>

          <div className="filter-item">
            <FaCalendar className="filter-icon" />
            <input
              type="date"
              className="filter-input"
              value={filters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
            />
          </div>

          <div className="filter-item">
            <FaCalendar className="filter-icon" />
            <input
              type="date"
              className="filter-input"
              value={filters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p className="loading-text">Cargando reservas...</p>
        </div>
      ) : error ? (
        <div className="error">
          <div className="error-content">
            <p className="error-message">{error}</p>
            <button
              key="retry-button"
              className="retry-button"
              onClick={() => fetchReservations()}
            >
              <FaSyncAlt className="retry-icon" /> Reintentar
            </button>
          </div>
        </div>
      ) : reservations.length === 0 ? (
        <div className="empty-dashboard">
          <div className="empty-content">
            <h2>No hay reservas</h2>
            <p>¡No tienes ninguna reserva actualmente!</p>
          </div>
        </div>
      ) : (
        <div className="reservations-container">
          <div className="reservations-list">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="reservation-card">
                <div className="reservation-header">
                <h3 className="reservation-title">{reservation.spaceName}</h3>
                <div className="status-badge">
                    <div className={`status-dot ${reservation.status === 0 ? 'active' : 'inactive'}`} />
                    <span className="status-text">{reservation.status === 0 ? 'Activa' : 'Inactiva'}</span>
                </div>
                </div>
                <div className="reservation-details">
                <div className="detail-item">
                    <FaCalendar className="detail-icon" />
                    <span className="detail-label">Fecha de inicio</span>
                    <span className="detail-value">{formatDate(reservation.startDate)}</span>
                </div>
                <div className="detail-item">
                    <FaCalendar className="detail-icon" />
                    <span className="detail-label">Fecha de fin</span>
                    <span className="detail-value">{formatDate(reservation.endDate)}</span>
                </div>
                <div className="detail-item">
                    <FaClock className="detail-icon" />
                    <span className="detail-label">Costo total</span>
                    <span className="detail-value">${reservation.totalCost}</span>
                </div>
                <div className="detail-item">
                    <FaMoneyBill className="detail-icon" />
                    <span className="detail-label">Método de pago</span>
                    <span className="detail-value">{reservation.paymentMethod}</span>
                </div>
                </div>
            </div>
            ))}

          </div>

          <div className="pagination">
            <div className="page-info">
              Página {currentPage} de {totalPages}
            </div>
            <div className="page-buttons">
              <button
                key="prev-button"
                className="page-button"
                onClick={() => handlePageChange('previous')}
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              <button
                key="next-button"
                className="page-button"
                onClick={() => handlePageChange('next')}
                disabled={currentPage === totalPages}
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
