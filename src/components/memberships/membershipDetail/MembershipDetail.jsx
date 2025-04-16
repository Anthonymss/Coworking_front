import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MembershipService from "../../../service/MembershipService";
import axios from "axios";
import "./MembershipDetail.css";

export default function MembershipDetail() {
  const { membershipId } = useParams();
  const [membership, setMembership] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    MembershipService.getMembershipById(membershipId)
      .then((response) => {
        setMembership(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar los detalles de la membresía:", error);
      });
  }, [membershipId]);

  const handleAdquirirClick = () => {
    setShowPopup(true);
  };

  const handleConfirmar = () => {
    setShowPopup(false);
    setShowPaymentPopup(true);
  };

  const handleCancelar = () => {
    setShowPopup(false);
  };

  const handlePayment = (method) => {
    setPaymentMethod(method);
    setShowPaymentPopup(false);
    makePaymentRequest(method);
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getEndDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 30);
    return today.toISOString().split('T')[0];
  };

  const makePaymentRequest = (method) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userId = userData?.id;
    //const userId = 1;
    const startDate = getCurrentDate();
    const endDate = getEndDate();

    const payload = {
      userId,
      membershipId: membership.id,
      startDate,
      endDate,
      status: "ACTIVE",
      paymentMethod: method,
    };

    MembershipService.createMembership(payload)
      .then((response) => {
        console.log("Membresía adquirida con éxito:", response.data);
        navigate('/invoiceMembership', { state: { invoiceData: response.data } });
      })
      .catch((error) => {
        console.error("Error al crear la membresía:", error);
      });
  };

  if (!membership) {
    return <p>Cargando detalles de la membresía...</p>;
  }

  return (
    <div className="membershipDetail">
      <h1 className="membershipDetail-title">Membresia {membership.name}</h1>
      <p>Una oficina privada 100% tuya y lista para recibir a tu equipo, donde solo compartirás áreas comunes y servicios con otras empresas.</p>
      <h2 className="membershipDetail-title2">Conoce a detalle nuestros espacios</h2>
      <div className="gallery">
        <div className="main-image">
          <img src={membership.urlImage1} alt={membership.name} />
        </div>
        <div className="small-image">
          <img src={membership.urlImage2} alt={membership.name} />
        </div>
        <div className="small-image">
          <img src={membership.urlImage3} alt={membership.name} />
        </div>
      </div>
      <button className="btn btn-primari" onClick={handleAdquirirClick}>
        Adquirir Membresia
      </button>
      <div className="detailService">
        <h3>Nuestro servicio todo incluido</h3>
        <div>
          <p>Nos encargamos de todos los servicios de tu oficina en una única factura mensual. Administramos más de 30 mil m2 de oficinas muy bien equipadas, lo cual nos da grandes economías de escala que trasladamos a nuestros clientes.</p>
          <br />
          <p className="priceDet">Precio: ${membership.price}</p>
          <br />
          <p>Dedicated private office, unlimited meeting room usage, high-speed Wi-Fi, coffee and tea included, printing services, 24/7 access</p>
        </div>
      </div>
      
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>¿Estás seguro de que deseas adquirir esta membresía?</h2>
            <div>
              <button className="btn" onClick={handleConfirmar}>Confirmar</button>
              <button className="btn" onClick={handleCancelar}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
      
      {showPaymentPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Selecciona tu método de pago:</h2>
            <div className="payment-options">
              <button className="btn" onClick={() => handlePayment("CREDIT_CARD")}>Tarjeta de Crédito</button>
              <button className="btn" onClick={() => handlePayment("PAYPAL")}>PayPal</button>
              <button className="btn" onClick={() => handlePayment("BANK_TRANSFER")}>Transferencia Bancaria</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
