import { DateTime } from 'luxon';
import React from 'react';
import "./TimeSlotsTimeline.css";

const TimeSlotsTimeline = ({ occupiedTimes, startHour = 0, endHour = 24 , selectedDate}) => {
    const totalMinutes = (endHour - startHour) * 60;
    
    const sortedOccupiedTimes = occupiedTimes.map(({ startTime, endTime }) => ({
        start: DateTime.fromISO(startTime),
        end: DateTime.fromISO(endTime)
    })).sort((a, b) => a.start - b.start);

    const availableSlots = [];
    let prevEndTime = DateTime.fromObject({ hour: startHour });

    sortedOccupiedTimes.forEach(({ start, end }) => {
        const gap = start.diff(prevEndTime, 'minutes').minutes;
        if (gap >= 60) {
            availableSlots.push({
                startTime: prevEndTime,
                endTime: start,
                left: `${((prevEndTime.hour * 60 + prevEndTime.minute - startHour * 60) / totalMinutes) * 100}%`,
                width: `${(gap / totalMinutes) * 100}%`
            });
        }
        prevEndTime = end;
    });

    const endGap = DateTime.fromObject({ hour: endHour }).diff(prevEndTime, 'minutes').minutes;
    if (endGap >= 60) {
        availableSlots.push({
            startTime: prevEndTime,
            endTime: DateTime.fromObject({ hour: endHour }),
            left: `${((prevEndTime.hour * 60 + prevEndTime.minute - startHour * 60) / totalMinutes) * 100}%`,
            width: `${(endGap / totalMinutes) * 100}%`
        });
    }

    const occupiedBlocks = sortedOccupiedTimes.map(({ start, end }) => {
        const startMinutes = (start.hour * 60 + start.minute - startHour * 60);
        const endMinutes = (end.hour * 60 + end.minute - startHour * 60);
        return {
            left: `${(startMinutes / totalMinutes) * 100}%`,
            width: `${((endMinutes - startMinutes) / totalMinutes) * 100}%`,
            startTime: start,
            endTime: end,
        };
    });

    return (
        <div className="time-slot-timeline-container">
            <h3 style={{ marginBottom: '40px' }}>Horarios ocupados y disponibles para {DateTime.fromISO(selectedDate).toFormat('MMMM dd, yyyy')}</h3>

            <div className="timeline">
                {availableSlots.map((slot, index) => (
                    <div
                        key={`free-${index}`}
                        className="free-block"
                        style={{ left: slot.left, width: slot.width }}
                        title={`${slot.startTime.toFormat("HH:mm")} - ${slot.endTime.toFormat("HH:mm")}`}
                    >
                        <div className="free-block-label">
                            {`${slot.startTime.toFormat("HH:mm")} - ${slot.endTime.toFormat("HH:mm")}`}
                        </div>
                    </div>
                ))}

                {occupiedBlocks.map((block, index) => (
                    <div
                        key={index}
                        className="occupied-block"
                        style={{ left: block.left, width: block.width }}
                        title={`${block.startTime.toFormat("HH:mm")} - ${block.endTime.toFormat("HH:mm")}`}
                    ></div>
                ))}
            </div>
            <div className="timeline-labels">
                <span>{DateTime.fromObject({ hour: startHour }).toFormat("HH:mm")}</span>
                <span>{endHour === 24 ? "24:00" : DateTime.fromObject({ hour: endHour }).toFormat("HH:mm")}</span>
            </div>
            <div className="legend-container">
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: '#607d8b' }}></div>
                    <div className="legend-text">Ocupado</div>
                </div>
                <div className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: 'rgba(0, 128, 0, 0.1)' }}></div>
                    <div className="legend-text">Disponible (1 hora mínimo)</div>
                </div>
            </div>
        </div>
    );
};

export default TimeSlotsTimeline;
