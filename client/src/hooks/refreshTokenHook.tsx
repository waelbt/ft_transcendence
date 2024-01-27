import { default as axios } from '../api';
import { useUserStore } from '../stores/userStore';

const useRefreshToken = () => {
    const { updateState } = useUserStore();
    const refresh = async () => {
        const response = await axios.get('/auth/refresh', {
            withCredentials: true
        });
        // console.log(response);
        updateState({ accessToken: response.data.accessToken });
        return response.data.accessToken;
    };
    return refresh;
};

export default useRefreshToken;
