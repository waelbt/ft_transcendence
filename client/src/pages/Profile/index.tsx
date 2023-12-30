import { Outlet } from 'react-router-dom';
import { UserProfileCard } from '../../components/';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useUserStore } from '../../stores';

export function Profile() {
    const user = useUserStore();
    const params = useParams();
    const [profile, setProfile] = useState<null | any>(null); // ? get user interface  (dto if possible)

    return (
        // gap-20
        <div className="flex-grow flex-col justify-center items-center inline-flex gap-14">
            <UserProfileCard />
            {/* w-2/3 h-full */}
            <div className="w-2/3 p-2.5 bg-white rounded-[20px] shadow flex-col justify-start items-start inline-flex">
                <Outlet context={profile}/>
            </div>
        </div>
    );
}
