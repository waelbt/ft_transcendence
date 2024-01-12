import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './axiosPrivateHook';
import { useUserStore } from '../stores/userStore';

export const useUserProfile = (userId: string) => {
    const axiosPrivate = useAxiosPrivate();
    const user = useUserStore();
    const fetchData = async () => {
        const { data } = await axiosPrivate.get(`users/${userId}`);
        return data;
    };

    const query = useQuery({
        queryKey: ['profile', userId],
        queryFn: fetchData,
        enabled: !!userId && userId !== user.id && userId !== 'me',
        initialData: userId === user.id || userId === 'me' ? user : undefined
    });
    return {
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        profile: query.data
    };
};
