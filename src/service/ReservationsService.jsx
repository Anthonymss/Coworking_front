import axios from 'axios';
import { API_URL } from '../config/globals';

const API_URL_RES = `${API_URL}/reservation/api/v1/reservation`;

const getAuthHeaders = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const token = userData?.jwt;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const ReservationsService = {
  checkAvailability: (spaceId, date, startTime, endTime) => {
    return axios.get(`/reservations/check?spaceId=${spaceId}&date=${date}&startTime=${startTime}&endTime=${endTime}`, {
      headers: getAuthHeaders()
    });
  },

  createReservation: (reservation) => {
    return axios.post(API_URL_RES, reservation, {
      headers: getAuthHeaders()
    });
  },

  getOccupiedTimes: (spaceId, date) => {
    return axios.get(`${API_URL_RES}/space/${spaceId}/occupied-times?date=${date}`, {
      headers: getAuthHeaders()
    })
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
