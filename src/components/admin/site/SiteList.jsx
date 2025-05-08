import React, { useEffect, useState } from 'react';

const SiteList = () => {
  const [sites, setSites] = useState([]);

  useEffect(() => {
    setSites([
      { id: 1, name: 'Cowork Central', address: 'Calle Falsa 123', phone: '+34 912 345 678' },
      { id: 2, name: 'WorkHub Norte', address: 'Av. Libertad 456', phone: '+34 911 111 111' },
      { id: 3, name: 'Oficina Creativa', address: 'Plaza Mayor 789', phone: '+34 900 123 456' },
    ]);
  }, []);

  return (
    <div className="list-container">
      <h2>Sitios</h2>
      <table className="list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {sites.map((site) => (
            <tr key={site.id}>
              <td>{site.id}</td>
              <td>{site.name}</td>
              <td>{site.address}</td>
              <td>{site.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SiteList;
