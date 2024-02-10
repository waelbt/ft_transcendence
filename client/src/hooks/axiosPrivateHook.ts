import { axiosPrivate } from '../api';
import { useEffect } from 'react';
import { useUserStore } from '../stores/userStore';
import useRefreshToken from './refreshTokenHook';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { logout, accessToken, updateState } = useUserStore();
    const navigate = useNavigate();

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
                    prevRequest.sent = true; // Marking that a token refresh attempt was made
                    try {
                        const newAccessToken = await refresh();
                        prevRequest.headers[
                            'Authorization'
                        ] = `Bearer ${newAccessToken}`;
                        updateState({ accessToken: newAccessToken });
                        return axiosPrivate(prevRequest);
                    } catch (refreshError) {
                        toast.error('Session expired. Please log in again.');
                        logout();
                        return Promise.reject(refreshError);
                    }
                    // } else if (error?.response?.status === 403) {
                    //     navigate('/error/403', { replace: true });
                } else if (error?.response?.status === 404) {
                    navigate('/error/400', { replace: true });
                } else if (error?.response?.status === 500) {
                    console.log('here');
                    navigate('/error/500', { replace: true });
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
