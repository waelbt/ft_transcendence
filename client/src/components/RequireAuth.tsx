import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useUserStore } from '../stores/userStore';
import { Layout } from '.';
import { Auth } from '../pages/Auth';
// import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { isLogged } = useUserStore();
    // const location = useLocation();

    // return isLogged ? (
    return <Layout />;
    // ) : (
    // <Auth />
    // <Navigate to="/login" state={{ from: location }} replace />
    // );
};

// ? <Navigate to="/unauthorized" state={{ from: location }} replace />

export default RequireAuth;
