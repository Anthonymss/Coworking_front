import axios from 'axios';
import { API_URL } from '../config/globals';
const API_URL_SPACE= API_URL+"/spaces"+'/api/v1/spaces';
class SpacesService {
    getSpacesForFilter(params) {
        return axios.get(API_URL_SPACE, { params });
    }
    getSpaceById(spaceId) {
        return axios.get(`${API_URL_SPACE}/${spaceId}`);
    }
    getFilterSpace() {
        return axios.get(`${API_URL_SPACE}/filters`);
    }
}
export default new SpacesService();
