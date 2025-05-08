import React, { useState } from 'react';
import DashboardStats from '../stats/DashboardStats';
import UserList from '../user/UserList';
import SpaceList from '../space/SpaceList';
import EquipmentList from '../equipment/EquipmentList';
import SiteList from '../site/SiteList';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('stats');

  const renderSection = () => {
    switch (activeSection) {
      case 'users': return <UserList />;
      case 'spaces': return <SpaceList />;
      case 'equipment': return <EquipmentList />;
      case 'sites': return <SiteList />;
      default: return <DashboardStats />;
    }
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>Panel Admin</h2>
        <button onClick={() => setActiveSection('stats')}>Estadísticas</button>
        <button onClick={() => setActiveSection('users')}>Usuarios</button>
        <button onClick={() => setActiveSection('spaces')}>Espacios</button>
        <button onClick={() => setActiveSection('equipment')}>Equipos</button>
        <button onClick={() => setActiveSection('sites')}>Sitios</button>
      </aside>
      <main className="dashboard-content">{renderSection()}</main>
    </div>
  );
};

export default AdminDashboard;
