import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './axiosPrivateHook';
import { useUserStore } from '../stores/userStore';

export const useGetUserInfos = (
    endpoint: string,
    key: string[],
    isCurrentUser: boolean
) => {
    const axiosPrivate = useAxiosPrivate();
    const { getState } = useUserStore();

    const fetchData = async () => {
        const { data } = await axiosPrivate.get(endpoint);
        console.log(data.type.message);
        return data;
    };

    const query = useQuery({
        queryKey: key,
        queryFn: fetchData,
        enabled: !isCurrentUser,
        initialData: getState()
    });

    return {
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        data: query.data,
        refetch: query.refetch
    };
};
