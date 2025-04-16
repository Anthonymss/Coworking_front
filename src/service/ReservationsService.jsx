import axios from 'axios';
import { API_URL } from '../config/globals';
const API_URL_RES = `${API_URL}/reservation/api/v1/reservation`;

const ReservationsService = {
    checkAvailability: (spaceId, date, startTime, endTime) => {
        return axios.get(`/reservations/check?spaceId=${spaceId}&date=${date}&startTime=${startTime}&endTime=${endTime}`);
    },
    createReservation: (reservation) => {
        return axios.post(API_URL_RES, reservation);
    },
    getOccupiedTimes: (spaceId, date) => {
        return axios.get(`${API_URL_RES}/space/${spaceId}/occupied-times?date=${date}`)
            .then(response => {
                return Array.isArray(response.data) ? response.data : [];
            })
            .catch(error => {
                console.error('Error fetching occupied times:', error);
                return [];
            });
    }
};

export default ReservationsService;
