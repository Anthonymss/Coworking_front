import React from 'react';
import './RoleSelectorModal.css';

export default function RoleSelectorModal({ roles, onSelect }) {
  return (
    <div className="role-modal-overlay">
      <div className="role-modal">
        <h2>Selecciona tu rol</h2>
        <div className="role-options">
          {roles.map((role) => (
            <button key={role} className="role-button" onClick={() => onSelect(role)}>
              {role}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
