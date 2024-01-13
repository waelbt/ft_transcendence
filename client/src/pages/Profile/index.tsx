import { Outlet } from 'react-router-dom';
import { UserProfileCard } from '../../components/';
import { useParams } from 'react-router-dom';
// import { useUserStore } from '../../stores/userStore';
import { useUserProfile } from '../../hooks/usersdataHook';

export function Profile() {
    // const user = useUserStore();
    const { id } = useParams();
    const { profile, isLoading, isError } = useUserProfile(id as string);

    if (isLoading) {
        return <div>Loading...</div>; // or your custom loader component
    }

    if (isError) {
        // Handle error
        return <div>Error fetching profile</div>;
    }

    return (
        <div className="flex-col h-full justify-center items-center inline-flex my-5 gap-5 ">
            {/* //! profile */}
            <UserProfileCard {...profile} isLoading={isLoading} />
            <div className="flex-grow max-h-[560px] w-full bg-white p-1 items-start justify-start mb-2 rounded-[20px] shadow ">
                <Outlet />
            </div>
        </div>
    );
}
