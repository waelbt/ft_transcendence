import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';
import { Layout, ProfileCompletion, TwoFaVerfication } from '.';
import { Auth } from '../pages/Auth';

const RequireAuth = () => {
    const {
        isLogged,
        redirectedFor2FA,
        f2A,
        redirectedForProfileCompletion,
        completeProfile
    } = useUserStore();
    const location = useLocation();

    useEffect(() => {
        if (!isLogged) window.history.replaceState(null, '', '/');
    }, [isLogged, location]); // Add isLogged to the dependency array

    if (!isLogged) return <Auth />;

    if (!redirectedFor2FA && f2A) {
        console.log(redirectedFor2FA, '   ', f2A);
        return <TwoFaVerfication />;
    }

    if (!redirectedForProfileCompletion && !completeProfile) {
        return <ProfileCompletion />;
    }

    return <Layout />;
};

export default RequireAuth;
