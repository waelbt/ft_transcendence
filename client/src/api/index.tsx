import axios from 'axios';

export default axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: false
});

export const axiosPrivate = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    withCredentials: true
});
