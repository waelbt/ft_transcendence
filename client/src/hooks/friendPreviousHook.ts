import { useQuery } from '@tanstack/react-query';
import { Friend } from '../../../shared/types';
import useAxiosPrivate from './axiosPrivateHook';

type useFriendPreviousProps = {
    id: string | null;
};

const useFriendPrevious = ({ id }: useFriendPreviousProps) => {
    const axiosPrivate = useAxiosPrivate();
    const fetchFriendDetails = async (): Promise<Friend> => {
        const res = await axiosPrivate.get(`/users/previo/${id}`);
        return res.data;
    };

    const query = useQuery<Friend, Error>({
        queryKey: ['friend', id],
        queryFn: fetchFriendDetails,
        enabled: !!id
    });

    return {
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        friend: query.data
    };
};

export default useFriendPrevious;
