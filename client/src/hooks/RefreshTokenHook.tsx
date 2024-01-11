import axios from 'axios';
import { useUserStore } from '../stores/userStore';

const useRefreshToken = () => {
    const { updateState } = useUserStore();
    const refresh = async () => {
        const response = await axios.get('/refresh');
        updateState({ accessToken: response.data.accessToken });
        return response.data.accessToken;
    };
    return refresh;
};

export default useRefreshToken;
