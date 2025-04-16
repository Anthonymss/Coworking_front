import { DateTime } from 'luxon';
import React from 'react';
import "./TimeSlots.css";

const TimeSlots = ({ occupiedTimes, selectedDate }) => {
  const formatTime = (time) => DateTime.fromISO(time).toFormat('HH:mm');

  const generateTimeSlots = (occupied) => {
    const allSlots = [];
    const dayStart = DateTime.fromISO(`${selectedDate}T00:00`);
    const dayEnd = DateTime.fromISO(`${selectedDate}T23:59`);

    let current = dayStart;
    occupied.forEach((slot, index) => {
      const start = DateTime.fromISO(slot.startTime);
      const end = DateTime.fromISO(slot.endTime);

      if (current < start) {
        allSlots.push({ start: current, end: start, available: true });
      }
      allSlots.push({ start, end, available: false });
      current = end;
    });

    if (current < dayEnd) {
      allSlots.push({ start: current, end: dayEnd, available: true });
    }

    return allSlots;
  };

  const allSlots = generateTimeSlots(occupiedTimes);

  return (
    <div className="time-slot-container">
      <h3>Horarios ocupados y disponibles para {DateTime.fromISO(selectedDate).toFormat('MMMM dd, yyyy')}</h3>
      <div className="time-slot-list">
        {allSlots.length === 0 ? (
          <p>No se han encontrado horarios para este día.</p>
        ) : (
          allSlots.map((slot, index) => (
            <div key={index} className={`time-slot ${slot.available ? 'available-slot' : 'occupied-slot'}`}>
              <span>{`${formatTime(slot.start)} - ${formatTime(slot.end)}`}</span>
              <span className="status-text">{slot.available ? 'Available' : 'Occupied'}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TimeSlots;