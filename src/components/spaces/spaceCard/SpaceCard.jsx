import React from 'react';
import './SpaceCard.css';

export default function SpaceCard({ space, onOpenModal }) {
  const convertText = (text) => text.replace(/_/g, " ");

  return (
    <div className="space-card">
      <div className="space-type-label">
        <div className="type-label-content">
          {convertText(space.spaceType)}
        </div>
      </div>
      <div className="image-container">
        <img src={space.urlImage} alt={space.name} />
      </div>
      <div className="card-content">
        <h3 className="space-name">{space.name}</h3>
        <p className="space-capacidad">
          <i className="fas fa-users"></i>
          Capacidad: {space.capacity}
        </p>
        <div className="price-container">
          <span className="price">S/{space.pricePerHour}</span>
          <span className="price-unit">/hora</span>
        </div>
        <p className="space-location">
          <i className="fas fa-map-marker-alt"></i>
          {space.siteName}
        </p>
        <div className="space-click" onClick={() => onOpenModal(space)}>
          <i className="fas fa-info-circle"></i>
          <span className="click-text">Detalles y Reserva</span>
        </div>
      </div>
    </div>
  );
}
