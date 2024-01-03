import { Outlet } from 'react-router-dom';
import { UserProfileCard } from '../../components/';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useUserStore } from '../../stores';
import { request } from '../../api';

export function Profile() {
    const user = useUserStore();
    const params = useParams();
    const [profile, setProfile] = useState<null | any>(null); // ? get user interface  (dto if possible)
    // const [profile, setProfile] = useState<any>(user); // ? get user interface  (dto if possible)

    // ! user react query later
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await request.get(`users/${params.id}`);

                setProfile(res.data);
            } catch (e) {
                console.log(e);
                // ! navigae to home or error page
            }
        };

        params.id != user.id && params.id != 'me'
            ? fetchData()
            : setProfile(user);
    }, []);
    // ? [params]

    return (
        // gap-20
        <div className="flex-grow flex-col justify-center items-center inline-flex my-5 gap-10">
            <UserProfileCard {...profile} />
            {/* w-2/3 h-full */}
            <div className="w-2/3 h-full p-2 bg-white rounded-[20px] shadow flex-col justify-start items-start inline-flex">
                <Outlet context={profile} />
            </div>
        </div>
    );
}
