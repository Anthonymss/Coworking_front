import axios from 'axios';
import { API_URL } from '../config/globals';
const API_URL_AUTH = API_URL+"/auth"+'/api/v1/auth';
axios.defaults.withCredentials = true;
class AuthService{
    login(auth){
        console.log(auth);
        return axios.post(`${API_URL_AUTH}/login`, auth);
    }
    register(user){
        console.log(user);
        return axios.post(`${API_URL_AUTH}/register`, user);
    }
    loginForGoogle(token){
        return axios.post(`${API_URL_AUTH}/login/oauth2/google`, token);
    }
    registerForGoogle(token){
        return axios.post(`${API_URL_AUTH}/register/oauth2/google`, token);
    }

}
export default new AuthService();