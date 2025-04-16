import React from 'react';
import { useNavigate } from 'react-router-dom';
import { notify } from '../../notification/ToastNotification';
import './SpaceDetailModal.css';

export default function SpaceDetailModal({ space, onClose }) {
  const navigate = useNavigate();

  const goToReservationPage = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (userData) {
      // Si el usuario está logueado, navega a la página de reserva
      navigate(`/reserve/${space.id}`, { state: { space } });
    } else {
      // Si el usuario no está logueado, muestra una notificación de error
      notify('Por favor, inicia sesión para realizar una reserva.', 'error');
    }
  };

  if (!space) return null;

  const convertText = (text) => text.replace(/_/g, " ");

  return (
    <div className="space-modal-overlay" onClick={onClose}>
      <div className="space-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="space-close-button" onClick={onClose}>×</button>
        <div className="space-modal-body">
          <div className="space-modal-image-section">
            <img src={space.urlImage} alt={space.name} className="space-modal-image" />
          </div>
          <div className="space-modal-details">
            <h2 className="space-modal-title">{space.name}</h2>
            <div className="space-modal-info">
              <p><strong>Tipo:</strong> {convertText(space.spaceType)}</p>
              <p><strong>Capacidad:</strong> {space.capacity}</p>
              <p><strong>Precio por hora:</strong> S/{space.pricePerHour}</p>
              <p><strong>Ubicación:</strong> {space.siteName}</p>
              <p><strong>Dirección:</strong> {space.address}</p>
              <p className="space-modal-description"><strong>Descripción:</strong> {space.description}</p>
            </div>
            <div className="space-modal-equipment-section">
              <h3><strong>Equipo Disponible:</strong></h3>
              <div className="space-modal-equipment-list">
                {space.listEquipment.map((equipment, index) => (
                  <div key={index} className="space-modal-equipment-item" title={equipment.description}>
                    <strong>{equipment.name}</strong> - {equipment.quantity} unidades
                    <p className="equipment-description">{equipment.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <button className="space-reserve-button" onClick={goToReservationPage}>
              Reservar Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
