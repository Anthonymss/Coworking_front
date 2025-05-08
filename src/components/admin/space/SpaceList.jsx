import React, { useEffect, useState } from 'react';

const SpaceList = () => {
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    setSpaces([
      { id: 1, name: 'Sala Reuniones A', capacity: 10, type: 'Reunión' },
      { id: 2, name: 'Espacio Abierto B', capacity: 20, type: 'Coworking' },
      { id: 3, name: 'Oficina Privada C', capacity: 4, type: 'Privado' },
    ]);
  }, []);

  return (
    <div className="list-container">
      <h2>Espacios</h2>
      <table className="list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Capacidad</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {spaces.map((space) => (
            <tr key={space.id}>
              <td>{space.id}</td>
              <td>{space.name}</td>
              <td>{space.capacity}</td>
              <td>{space.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpaceList;
