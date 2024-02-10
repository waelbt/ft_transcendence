import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { request } from '../src/api';

function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true; // flag to check if component is mounted

        const checkAuth = async () => {
            try {
                const response = await request.get('/auth/checkAuth');
                if (isMounted) {
                    setIsAuthenticated(response.data);
                }
            } catch (err) {
                if (isMounted) {
                    navigate('/login');
                }
            }
        };

        checkAuth();

        // Cleanup function to set isMounted to false
        return () => {
            isMounted = false;
        };
    }, []);

    // Optional: useEffect to log or perform actions when isAuthenticated changes
    useEffect(() => {
        // console.log(isAuthenticated);
        // Perform any actions that depend on updated isAuthenticated here
    }, [isAuthenticated]);

    return { isAuthenticated };
}

export default useAuth;
