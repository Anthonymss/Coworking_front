import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AboutSection from './components/about/AboutSection';
import ContactForm from './components/contact/ContactForm';
import Home from './components/home/Hero';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import MembershipsSection from './components/memberships/MembershipsSection';
import { ToastNotification } from './components/notification/ToastNotification';
import Profile from './components/profile/Profile';
import InvoicePage from './components/reservation/invoicePage/InvoicePage';
import ReservationPage from './components/reservation/ReservationPage';
import SpacesSection from './components/spaces/SpacesSection';
import MembershipDetail from './components/memberships/membershipDetail/MembershipDetail';
import InvoiceMembership from './components/memberships/invoiceMembership/InvoiceMembership';
import "./styles/appError.css";
import './styles/globals.css';
const NotFound = () => (
  <div className="not-found-container">
    <i className="fas fa-exclamation-triangle not-found-icon"></i>
    <h2 className="not-found-title">Página no encontrada</h2>
    <p className="not-found-message">Lo sentimos, la página que estás buscando no existe.</p>
  </div>
);


function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <ToastNotification />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/spaces" element={<SpacesSection />} /> 
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/memberships" element={<MembershipsSection />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/reserve/:spaceId" element={<ReservationPage />} />
          <Route path="/membership/:membershipId" element={<MembershipDetail />} />
          <Route path="/invoice" element={<InvoicePage />} />
          <Route path="/invoiceMembership" element={<InvoiceMembership />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
