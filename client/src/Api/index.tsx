import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:4000/',
    timeout: 10000,
    withCredentials: false,
    headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});
