import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './axiosPrivateHook';
import { useUserStore } from '../stores/userStore';

export const useGetUserInfos = (
    userId: string,
    key: string[],
    isCurrentUser: boolean
) => {
    const axiosPrivate = useAxiosPrivate();
    const { getState } = useUserStore();

    const fetchData = async () => {
        const { data } = await axiosPrivate.get(`/users/${userId}/profile`);
        return data;
    };

    const query = useQuery({
        queryKey: key,
        queryFn: fetchData,
        enabled: !isCurrentUser
        // initialData: { user: getState() }
    });
    if (isCurrentUser) {
        const { friendsIds, blocksIds, ...user } = getState();
        return {
            isLoading: false,
            isError: false,
            error: null,
            data: { friendsIds, blocksIds, user },
            refetch: () => {
                return { user: getState() };
            }
        };
    }
    return {
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        data: query.data,
        refetch: query.refetch
    };
};
