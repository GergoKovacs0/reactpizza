import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8021/api',
    auth: {
        username: sessionStorage.getItem('username') ?? '',
        password: sessionStorage.getItem('password') ?? '',
    },
});

export default apiClient;
