import axios from 'axios';
// import axios, { AxiosError, AxiosResponse } from 'axios';

export default axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true
});

export const axiosPrivate = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    withCredentials: true
});

// export default axios.create({
//     baseURL: `${import.meta.env.VITE_BASE_URL}`,
//     timeout: 10000,
//     withCredentials: true,
//     headers: {
//         'Cache-Control': 'no-cache',
//         'Content-Type': 'application/x-www-form-urlencoded'
//     }
// });

// export const request = axios.create({
//     baseURL: `${import.meta.env.VITE_BASE_URL}`,
//     timeout: 10000,
//     withCredentials: true,
//     headers: {
//         'Cache-Control': 'no-cache',
//         'Content-Type': 'application/x-www-form-urlencoded'
//     }
// });

// export const axiosPrivate = axios.create({
//     baseURL: `${import.meta.env.VITE_BASE_URL}`,
//     timeout: 10000,
//     withCredentials: true,
//     headers: {
//         'Cache-Control': 'no-cache',
//         'Content-Type': 'application/x-www-form-urlencoded'
//     }
// });

// ! Usage with URL Encoded
// const params = new URLSearchParams();
// params.append('key', 'value');
// axiosPrivate.post('/endpoint', params);

// ! Usage with JSON
// axiosPrivate.post('/endpoint', JSON.stringify({ key: 'value' }));

// request.interceptors.response.use(
//     response => {
//       // Any status codes that falls outside the range of 2xx cause this function to trigger
//       return response;
//     },
//     async error => {
//       const originalRequest = error.config;

//       // Check if the response status is 401 (Unauthorized) and the request hasn't been retried yet
//       if (error.response.status === 401 && !originalRequest._retry) {

//         originalRequest._retry = true; // mark the request as retried

//         try {
//           // Send a request to the refresh endpoint
//           const { data } = await axios.post('/auth/refresh', {}, { withCredentials: true });

//           // Store the new token (e.g., in memory, state management, context API)
//           // and update the header for the original request
//           originalRequest.headers['Authorization'] = 'Bearer ' + data.accessToken;

//           // Return the instance with the original request that now has the updated access token
//           return axiosInstance(originalRequest);
//         } catch (refreshError) {
//           // Handle refresh token failure (e.g., redirect to login)
//           // This could mean the refresh token has expired or is invalid
//           return Promise.reject(refreshError);
//         }
//       }

//       // Return any other error that isn't related to token refresh
//       return Promise.reject(error);
//     }
//   );
