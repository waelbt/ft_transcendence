import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';

const useAuthPopup = () => {
    const location = useLocation();
    const { updateState } = useUserStore();
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const accessToken = queryParams.get('accessToken');
        const f2A = queryParams.get('2fa') === 'true';
        const completeProfile = queryParams.get('profileComplete') === 'true';

        if (accessToken) {
            updateState({
                accessToken,
                isLogged: true,
                f2A,
                completeProfile
            });
            window.close();
            window.opener.location.reload();
        }
    }, [location, updateState]);
};

export default useAuthPopup;
