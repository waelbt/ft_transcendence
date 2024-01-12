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
        <div className="flex-col h-full justify-center items-center inline-flex my-5 gap-10 ">
            {/* //! profile */}
            <UserProfileCard {...profile} isLoading={isLoading} />
            <div className='flex-grow w-full debug items-start justify-start'>
                <Outlet />
            </div>
            {/* This div takes up all remaining space */}
            {/* <div className="flex-grow"></div> */}
        </div>
    );
}

{
    /* <div className="flex-shrink w-full h-full p-2 bg-white rounded-[20px] shadow flex-col justify-start items-start inline-flex"> */
}
{
    /* <Outlet context={profile} /> */
}
{
    /* </div> */
}
// ! user react query later
// useEffect(() => {
//     const fetchData = async () => {
//         try {
//             const res = await axiosPrivate.get(`users/${id}`);
//             console.log(res.data);
//             setProfile(res.data);
//         } catch (e) {
//             // ! serve error page in this case not found and forrebiden
//             console.log(e);
//             // ! navigae to home or error page
//         }
//     };

//     id != user.id && id != 'me'
//         ? fetchData()
//         : setProfile(user);
// }, [params]);
