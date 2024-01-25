import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { UserProfileCard } from '../../components/';
import { useParams } from 'react-router-dom';
import { useGetUserInfos } from '../../hooks/getUserInfos';
import { useUserStore } from '../../stores/userStore';
import Skeleton from 'react-loading-skeleton';

export function Profile() {
    const { id: paramId } = useParams();
    const { id: userId } = useUserStore();
    const isCurrentUser = paramId === 'me' || paramId === userId;
    const { data, isLoading, isError, refetch } = useGetUserInfos(
        paramId as string,
        ['profile', isCurrentUser ? 'me' : (paramId as string)],
        isCurrentUser
    );

    useEffect(() => {
        if (!isCurrentUser) refetch();
    }, [paramId, refetch]);

    if (isLoading) {
        return (
            <div className="flex-col h-full justify-center items-center inline-flex gap-5">
                <div className="px-2.5 rounded-[20px] shadow justify-start items-center gap-5 inline-flex bg-white">
                    {/* Replace actual content with Skeleton components */}
                    <div className="px-5 py-2.5 flex-col justify-center items-center gap-2.5 inline-flex">
                        <Skeleton circle height={160} width={160} />
                        <Skeleton height={30} width={200} />
                    </div>
                    <div className="flex-col justify-center items-start inline-flex pt-4">
                        <Skeleton height={30} width={300} />
                        <Skeleton height={130} width={553} />
                    </div>
                    <div className="px-3 py-3 rounded-2xl flex-col justify-center items-center gap-3 inline-flex">
                        <Skeleton height={50} width={200} />
                        <Skeleton height={20} width={150} />
                    </div>
                </div>
                <div className="flex-grow max-h-[560px] w-full bg-white p-1 items-start justify-start mb-2 rounded-[20px] shadow"></div>
            </div>
        );
    }

    if (isError) {
        return <div>Error fetching profile</div>;
    }

    return (
        <div className="flex-col h-full justify-center items-center inline-flex gap-5">
            <UserProfileCard
                {...data.user}
                relationship={isCurrentUser ? null : data.type?.message}
                isCurrentUser={isCurrentUser}
            />
            <div className="flex-grow max-h-[560px] w-full bg-white p-1 items-start justify-start mb-2 rounded-[20px] shadow">
                <Outlet context={{ isCurrentUser, paramId }} />
            </div>
        </div>
    );
}
