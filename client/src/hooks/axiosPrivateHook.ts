import { axiosPrivate } from '../api';
import { useEffect } from 'react';
import { useUserStore } from '../stores/userStore';
import useRefreshToken from './RefreshTokenHook';

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { accessToken, updateState } = useUserStore();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${
                        accessToken ? accessToken : ''
                    }`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );
        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest.sent) {
                    prevRequest.sent = true;
                    // gerenate new access token
                    console.log('new old token ', accessToken);
                    updateState({ accessToken: null });
                    const newAccessToken = await refresh();
                    console.log('new access token ', newAccessToken);
                    prevRequest.headers[
                        'Authorization'
                    ] = `Bearer ${newAccessToken}`;
                    updateState({ accessToken: newAccessToken });
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, []);
    return axiosPrivate;
};

export default useAxiosPrivate;
