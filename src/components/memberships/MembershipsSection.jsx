import React, { useEffect } from 'react';
import MembershipCard from './membershipCard/MembershipCard';
import MembershipService from '../../service/MembershipService';
import './MembershipsSection.css';

export default function MembershipsSection() {
  const [memberships, setMemberships] = React.useState([]);

  useEffect(() => {
    MembershipService.getAllMemberships()
      .then((response) => {
        setMemberships(response.data);
      })
      .catch((error) => {
        console.error('Error axios memberships:', error);
      });
  }, []);

  const getFeatures = (membership) => {
    
    return membership.type === 'BASIC'
      ? ["High-speed Wi-Fi", "Coffee and tea included", "10 hours meeting room usage"]
      : membership.type === 'PRO'
      ? ["High-speed Wi-Fi", "Coffee and tea included", "20 hours meeting room usage", "Printing services"]
      : ["Free spaces to use", "Access to all venues", "Reservation from the App "];
  };

  return (
    <section className="memberships-section">
      <div className="container">
        <h2 className="section-title">Membresías</h2>
        <div className="membership-grid">
          {memberships.map((membership) => (
            <MembershipCard key={membership.id} {...membership} features={getFeatures(membership)} />
          ))}
        </div>
      </div>
    </section>
  );
}

