import axios from 'axios';
import { API_URL } from '../config/globals';
const API_URL_SPACE= API_URL+"/spaces"+'/api/v1/spaces';
axios.defaults.withCredentials = true;
class SpacesService {
    getSpacesForFilter(query) {
        console.log(query);
        return axios.get(`${API_URL_SPACE}${query}`);
    }
    getSpaceById(spaceId) {
        return axios.get(`${API_URL_SPACE}/${spaceId}`);
    }
    getFilterSpace(){
        return axios.get(`${API_URL_SPACE}/filters`);
    }
}
export default new SpacesService();