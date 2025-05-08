import axios from 'axios';
import { API_URL } from '../config/globals';

const API_URL_MANA = `${API_URL}/management/api/v1/management/user`;

class UserService {
  getToken() {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    return storedUserData?.token || null;
  }

  getEmail() {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    return storedUserData?.email || null;
  }

  infoAccount() {
    const email = this.getEmail();
    const token = this.getToken();
    if (!email || !token) return Promise.reject("Faltan credenciales");

    return axios.get(`${API_URL_MANA}/${email}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  synchronizeAccountGoogle(tokenGoogle) {
    const email = this.getEmail();
    const token = this.getToken();
    if (!email || !token || !tokenGoogle) return Promise.reject("Faltan datos para sincronizar");

    return axios.post(`${API_URL_MANA}/synchronize-google`, {
      token: tokenGoogle,
      email: email
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  updateUser(userData, file) {
    const token = this.getToken();
    if (!token) return Promise.reject("Token no disponible");

    const formData = new FormData();
    formData.append("user", new Blob([JSON.stringify(userData)], { type: "application/json" }));
    if (file) {
      formData.append("file", file);
    }

    return axios.put(`${API_URL_MANA}/update-user`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
  }
}

export default new UserService();
