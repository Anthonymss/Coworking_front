import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers([
      { id: 1, email: 'aasdmin@admin.com', role: 'Administrador' },
      { id: 2, email: 'user@demo.com', role: 'Usuario' },
      { id: 3, email: 'soporte@empresa.com', role: 'Soporte' },
    ]);
  }, []);

  return (
    <div className="list-container">
      <h2>Usuarios</h2>
      <table className="list-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
