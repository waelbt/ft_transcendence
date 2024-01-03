import { axiosPrivate, request } from '../api';
import { useEffect } from 'react';

const useAxiosPrivate = () => {
    // const refresh =

    useEffect(() => {
        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest.sent) {
                    prevRequest.sent = true;
                    // gerenate new access token
                    const response = await request.get('/auth/refresh'); // this endpoint will return seccus or 
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );
        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, []);
    return axiosPrivate;
};

export default useAxiosPrivate;
