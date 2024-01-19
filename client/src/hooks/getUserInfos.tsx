import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from './axiosPrivateHook';

export const useGetUserInfos = (endpoint: string, key: string[]) => {
    const axiosPrivate = useAxiosPrivate();

    const fetchData = async () => {
        const { data } = await axiosPrivate.get(endpoint);
        console.log('data  ', data);

        return data;
    };

    const query = useQuery({
        queryKey: key,
        queryFn: fetchData
    });
    return {
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        data: query.data,
        refetch: query.refetch
    };
};
