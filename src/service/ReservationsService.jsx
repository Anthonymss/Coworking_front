import axios from 'axios';
import { API_URL } from '../config/globals';

const API_URL_RES = `${API_URL}/reservation/api/v1/reservation`;

const getAuthHeaders = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const token = userData?.token;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const ReservationsService = {
  checkAvailability: (spaceId, date, startTime, endTime) => {
    return axios
      .get(`${API_URL_RES}/check`, {
        params: { spaceId, date, startTime, endTime },
        headers: getAuthHeaders()
      })
      .catch((error) => {
        console.error('Error checking availability:', error);
        throw error;
      });
  },

  createReservation: (reservation) => {
    return axios
      .post(API_URL_RES, reservation, {
        headers: getAuthHeaders()
      })
      .catch((error) => {
        console.error('Error creating reservation:', error);
        throw error;
      });
  },

  getOccupiedTimes: (spaceId, date) => {
    return axios
      .get(`${API_URL_RES}/space/${spaceId}/occupied-times`, {
        params: { date },
        headers: getAuthHeaders()
      })
      .then((response) => (Array.isArray(response.data) ? response.data : []))
      .catch((error) => {
        console.error('Error fetching occupied times:', error);
        return [];
      });
  },

  getReservations: async (filters) => {
    try {
      const response = await axios.get(`${API_URL_RES}/reservation`, {
        params: filters,
        headers: getAuthHeaders()
      });
  
      console.log("Respuesta de la API:", response.data);
      if (!Array.isArray(response.data)) {
        throw new Error("La respuesta no es un array");
      }
  
      return response.data.map((res) => ({
        ...res,
        reservationDate: new Date(res.reservationDate),
        startDate: new Date(res.startDate),
        endDate: new Date(res.endDate),
      }));
    } catch (error) {
      console.error("Error en la respuesta de la API:", error);
      throw error;
    }
  }
};

export default ReservationsService;
