import { useNavigate } from "react-router";

export const ProtectRoutes = () => {
    const navigate = useNavigate();
    if (true)
        navigate('/lobby');
}