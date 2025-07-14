import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MembershipCard.css';

export default function MembershipCard({ id, name, description, price, duration, type, features }) {
  const navigate = useNavigate();

  // Añadimos un console.log para verificar las props recibidas
  React.useEffect(() => {
    console.log('Props recibidas:', { id, name, description, price, duration, type, features });
  }, [id, name, description, price, duration, type, features]);

  const handleClick = (e) => {
    e.preventDefault();
    console.log('Click en Conoce más', id);
    navigate(`/membership/${id}`);
  }

  const descriptionItems = description.split(",").map(item => {
    const trimmedItem = item.trim();
    return trimmedItem.charAt(0).toUpperCase() + trimmedItem.slice(1).toLowerCase();
  });

  return (
    <div className="membership-card" style={{ pointerEvents: 'none' }}>
      <h3 className="membership-title">{name}</h3>
      <hr />
      <ul className="membership-features">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <ul className="membership-details">
        <ul>
          {descriptionItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <br />
      </ul>
      <strong>Duración:</strong> {duration} días
      <div className="price-button-container">
        <p className="pPrice">${price}</p>
        <button 
          className="btn-primary-m" 
          onClick={(e) => {
            e.stopPropagation();
            console.log('Botón presionado', e);
            handleClick(e);
          }}
          type="button"
          style={{ 
            cursor: 'pointer',
            pointerEvents: 'all',
            userSelect: 'none'
          }}
        >
          Conoce más
        </button>
      </div>
    </div>
  );
}
