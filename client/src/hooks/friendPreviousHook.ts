import { useQuery } from '@tanstack/react-query';
import { Friend } from '../../../shared/types';
import useAxiosPrivate from './axiosPrivateHook';

const useFriendPrevious = (friendId: string | null) => {
    const axiosPrivate = useAxiosPrivate();

    const fetchFriendDetails = async (): Promise<Friend> => {
        const res = await axiosPrivate.get(`/users/previo/${friendId}`);
        return res.data;
    };

    const query = useQuery<Friend, Error>({
        queryKey: ['friend', friendId],
        queryFn: fetchFriendDetails,
        enabled: !!friendId
    });

    return {
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        success: query.isSuccess,
        friend: query.data
    };
};

export default useFriendPrevious;
