import React from 'react';
import './MembershipCard.css';

export default function MembershipCard({ title, features, price }) {
  return (
    <div className="membership-card">
      <h3 className="membership-title">{title}</h3>
      <ul className="membership-features">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <p className="membership-price">${price}</p>
      <button className="btn btn-primary">Regístrate</button>
    </div>
  );
}
