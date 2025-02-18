import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8021/api',
});

export default apiClient;
