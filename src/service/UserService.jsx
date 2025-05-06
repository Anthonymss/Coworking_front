import axios from 'axios';
import { API_URL } from '../config/globals';

const API_URL_MANA = `${API_URL}/management/api/v1/management/user`;

class UserService {
    infoAccount(email, token) {
        return axios.get(`${API_URL_MANA}/${email}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    synchronizeAccountGoogle(email, tokenGoogle) {
        return axios.post(`${API_URL_MANA}/synchronize-google`, {
            token: tokenGoogle,
            email: email
        });
    }

    updateUser(userData, file, token) {
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
