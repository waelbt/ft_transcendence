import { useQuery } from '@tanstack/react-query';
import { Friend } from '../../../shared/types';
    
type UseFriendDetailsProps = {
    friendId: string;
};

const useFriendDetails = ({ friendId }: UseFriendDetailsProps) => {
    const fetchFriendDetails = async (): Promise<Friend> => {
        const response = await fetch(
            `http://localhost:3000/friendDetails/${friendId}`
        );
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    };

    const query = useQuery<Friend, Error>({
        queryKey: ['friend', friendId],
        queryFn: fetchFriendDetails
    });

    return {
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        friend: query.data
    };
};

export default useFriendDetails;
