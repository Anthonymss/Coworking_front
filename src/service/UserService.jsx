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
        }//, {
           // headers: {
            //    Authorization: `Bearer ${token}`
            //}
        //});
    )}
    updateUser(dataToSave){
        return axios.put(`${API_URL_MANA}/update-user`, dataToSave);
    }
}

export default new UserService();
