import React, { useEffect, useState } from 'react';

const EquipmentList = () => {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    setEquipment([
      { id: 1, name: 'Proyector', description: 'Proyector HD para presentaciones' },
      { id: 2, name: 'Silla ergonómica', description: 'Silla ajustable para mayor comodidad' },
      { id: 3, name: 'Pantalla LED', description: 'Pantalla 32" Full HD' },
    ]);
  }, []);

  return (
    <div className="list-container">
      <h2>Equipos</h2>
      <table className="list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {equipment.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentList;
