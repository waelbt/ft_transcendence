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
        const response = await axiosPrivate.get(`/users/${userId}/profile`);
        return response.data;
    };

    const query = useQuery({
        queryKey: key,
        queryFn: fetchData,
        enabled: !isCurrentUser
    });

    if (isCurrentUser) {
        const { friendsIds, blocksIds, ...user } = getState();
        return {
            isLoading: false,
            isError: false,
            error: null,
            user,
            relation: 'myself',
            friendsIds,
            blocksIds,
            refetch: () => {
                return { user: getState() };
            }
        };
    }

    const { friendsIds, type, user } = query.data || {};

    return {
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        user,
        relation: type.message,
        friendsIds,
        blocksIds: [],
        refetch: query.refetch
    };
};
