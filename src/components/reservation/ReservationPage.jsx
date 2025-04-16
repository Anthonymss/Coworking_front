import { DateTime } from "luxon";
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ReservationService from '../../service/ReservationsService';
import { notify } from '../notification/ToastNotification';
import './ReservationPage.css';
import TimeSlots from './TimeSlots';
import TimeSlotsTimeline from './TimeSlotsTimeline';

export default function ReservationPage() {
  const { spaceId } = useParams();
  const { state } = useLocation();
  const [reservationDate, setReservationDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [durationHours, setDurationHours] = useState(1);
  const [comment, setComments] = useState('');
  const [occupiedTimes, setOccupiedTimes] = useState([]);
  const [viewType, setViewType] = useState('timeline'); 
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const navigate = useNavigate();

  const spaceDetails = state?.space;

  useEffect(() => {
    if (reservationDate) {
      fetchOccupiedTimes(reservationDate);
    }
  }, [reservationDate]);

  const fetchOccupiedTimes = async (date) => {
    try {
      const response = await ReservationService.getOccupiedTimes(spaceId, date);
      setOccupiedTimes(response);
    } catch (error) {
      notify(error.response, 'error');
    }
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userId = userData?.id;
    const email=userData?.email;
    const startDate = DateTime.fromISO(`${reservationDate}T${startTime}`).toISODate() + 'T' + DateTime.fromISO(`${reservationDate}T${startTime}`).toFormat('HH:mm:ss');
    const endDate = DateTime.fromISO(`${reservationDate}T${startTime}`).plus({ hours: durationHours }).toISODate() + 'T' + DateTime.fromISO(`${reservationDate}T${startTime}`).plus({ hours: durationHours }).toFormat('HH:mm:ss');

    const reservationData = {
      spaceId: parseInt(spaceId, 10),
      userId: parseInt(userId, 10),
      startDate,
      endDate,
      comments: comment,
      paymentMethod: selectedPaymentMethod,
      email:email,
      user_id:userId,
    };

    try {
      const response = await ReservationService.createReservation(reservationData);
      notify("¡Reserva realizada con éxito!", "success");
      console.log("Response Data:", response.data);
      navigate('/invoice', { state: { invoiceData: response.data } }); 
    } catch (error) {
      console.error("Error Response:", error.response || error.message || error);
      const errorMessage = error.response?.data || "Ocurrió un error al procesar la reserva";
      notify(errorMessage, 'error');
    }
  };

  return (
    <div className="reservation-page">
      {spaceDetails ? (
        <div className="reservation-container">
          <div className="reservation-card">
            <div className="reservation-space-details">
              <div className="reservation-image-overlay">
                <img src={spaceDetails.urlImage} alt={spaceDetails.name} className="reservation-space-image" />
                <h2 className="reservation-space-title">{spaceDetails.name}</h2>
              </div>
              <div className="reservation-info-section">
                <p><strong>Tipo:</strong> {spaceDetails.spaceType.replace(/_/g, ' ')}</p>
                <p><strong>Capacidad:</strong> {spaceDetails.capacity} personas</p>
                <p><strong>Precio por hora:</strong> S/{spaceDetails.pricePerHour}</p>
                <p><strong>Ubicación:</strong> {spaceDetails.siteName}</p>
                <p><strong>Dirección:</strong> {spaceDetails.address}</p>
                <p className="reservation-description">{spaceDetails.description}</p>
              </div>

              <div className="reservation-equipment-section">
                <h3>Equipo Disponible</h3>
                <div className="reservation-equipment-list">
                  {spaceDetails.listEquipment.map((equipment, index) => (
                    <div key={index} className="reservation-equipment-item">
                      <strong>{equipment.name}</strong> - {equipment.quantity}
                      <span>{" " + equipment.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <form className="reservation-form" onSubmit={handleReservationSubmit}>
              <h3>Reserva Tu Espacio</h3>

              <div className="reservation-form-group">
                <label htmlFor="reservationDate">Fecha</label>
                <input
                  type="date"
                  id="reservationDate"
                  value={reservationDate}
                  onChange={(e) => setReservationDate(e.target.value)}
                  required
                />
              </div>

              <div className="reservation-form-group">
                <label htmlFor="startTime">Hora de Inicio</label>
                <input
                  type="time"
                  id="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>

              <div className="reservation-form-group">
                <label htmlFor="durationHours">Duración (hours)</label>
                <input
                  type="number"
                  id="durationHours"
                  value={durationHours}
                  onChange={(e) => setDurationHours(e.target.value)}
                  min="1"
                  max="12"
                  required
                />
              </div>

              <div className="reservation-form-group">
                <label htmlFor="comments">Comentarios</label>
                <textarea
                  id="comments"
                  value={comment}
                  onChange={(e) => setComments(e.target.value)}
                  rows="3"
                  placeholder="Agrega comentarios adicionales..."
                />
              </div>
              <div className="reservation-form-group">
                <h4>Selecciona un Método de Pago</h4>
                <div className="payment-methods">
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Tarjeta de Crédito"
                      checked={selectedPaymentMethod === 'Tarjeta de Crédito'}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      required
                    />
                    Tarjeta de Crédito
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="PayPal"
                      checked={selectedPaymentMethod === 'PayPal'}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      required
                    />
                    PayPal
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Transferencia Bancaria"
                      checked={selectedPaymentMethod === 'Transferencia Bancaria'}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      required
                    />
                    Transferencia Bancaria
                  </label>
                </div>
              </div>
              <button type="submit" className="reservation-submit-button">Confirmar Reserva</button>
            </form>
          </div>
          <div className="reservation-conteiner-time">
            <div className="view-toggle">
                <button 
                  className={viewType === 'timeline' ? 'active' : ''} 
                  onClick={() => setViewType('timeline')}
                >
                  Vista de Línea de Tiempo
                </button>
                <button 
                  className={viewType === 'list' ? 'active' : ''} 
                  onClick={() => setViewType('list')}
                >
                  Vista de Lista
                </button>
            </div>

              <div className="reservation-conteiner-time">
                {viewType === 'timeline' ? (
                  <div className="timeline-view active-view">
                    <TimeSlotsTimeline occupiedTimes={occupiedTimes} selectedDate={reservationDate} />
                  </div>
                ) : (
                  <div className="list-view active-view">
                    <TimeSlots occupiedTimes={occupiedTimes} selectedDate={reservationDate} />
                  </div>
                )}
              </div>
 
          </div>
        </div>
      ) : (
        <div>Fallo...</div>
      )}
    </div>
  );
}
