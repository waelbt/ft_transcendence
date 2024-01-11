import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';

const useAuthPopup = () => {
    const location = useLocation();
    const { updateState } = useUserStore();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const accessToken = queryParams.get('accessToken');
        const refreshToken = queryParams.get('refreshToken');

        if (accessToken && refreshToken) {
            console.log(accessToken);
            console.log(refreshToken);
            // Update the user store with the received tokens and set logged in status
            updateState({ accessToken, refreshToken, isLogged: true });
            window.close();
            window.opener.location.reload();
        }
    }, [location, updateState]);
};

export default useAuthPopup;
