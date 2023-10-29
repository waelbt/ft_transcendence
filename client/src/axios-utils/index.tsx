import axios from 'axios';
// import axios, { AxiosError, AxiosResponse } from 'axios';

export const api = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`,
    timeout: 10000,
    withCredentials: false,
    headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

// const client = axios.create({
//     baseURL: 'http://localhost:4000/'
// });

// export const request = ({ ...options }) => {
//     client.defaults.headers.common.Authorization = `Bearer token`;
//     const onSuccess = (response : AxiosResponse) => response;
//     const onError = (error: AxiosError) => {
//         // optionall catch errors and add additional loggin here
//         return error;
//     };
//     return client(options).then(onSuccess).catch(onError);
// };
