import axios from "axios";
import { API_URL } from "../config/globals";
const API_URL_MEMBERSHIP = API_URL+"/membership"+'/api/v1/membership';
axios.defaults.withCredentials = true;

class MembershipService {
    getAllMemberships() {
        return axios.get(`${API_URL_MEMBERSHIP}`);
    }

    getMembershipById(id) {
        return axios.get(`${API_URL_MEMBERSHIP}/${id}`);
    }

    createMembership(membership) {
        return axios.post(`${API_URL_MEMBERSHIP}`, membership);
    }
}

export default new MembershipService();
