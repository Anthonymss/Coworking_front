import React from 'react';
import './SpaceCard.css';

export default function SpaceCard({ space, onClick }) {
  const convertText = (text) => {
    return text.replace(/_/g, " ");
  };

  return (
    <div className="space-card" onClick={onClick}>
      <div className='space-type-label'>{convertText(space.spaceType)}</div>
      <div className="image-container">
        <img src={space.urlImage} alt={space.name} />
      </div>
      <div className="card-content">
        <h3 className="space-name">{space.name}</h3>
        <p className="space-capacity">Capacidad: {space.capacity}</p>
        <span className="price">S/{space.pricePerHour}/hora</span>
        <p className="space-location">{space.siteName}</p>
        <div className="space-click">
          <i className="fas fa-eye"></i>
          <span className="click-text">click aquí para ver más detalles</span>
        </div>
      </div>
    </div>
  );
}
