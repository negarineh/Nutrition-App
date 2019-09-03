import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://trackapi.nutritionix.com/',
});

export default instance;