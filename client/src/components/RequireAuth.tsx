import { useUserStore } from '../stores/userStore';
import { Layout } from '.';
import { Auth } from '../pages/Auth';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { isLogged, verified } = useUserStore();
    const location = useLocation();

    useEffect(() => {
        if (!isLogged || !verified) window.history.replaceState(null, '', '/');
    }, [location]);
    return !isLogged ? <Auth /> : <Layout />;
};

// ? <Navigate to="/unauthorized" state={{ from: location }} replace />

export default RequireAuth;
