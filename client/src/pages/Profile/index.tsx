import { Outlet } from 'react-router-dom';
import { UserProfileCard } from '../../components/';

export function Profile() {
    return (
        // gap-20
        <div className="flex-grow flex-col justify-center items-center inline-flex gap-14">
            <UserProfileCard />
            {/* w-2/3 h-full */}
            <div className="w-2/3 p-2.5 bg-white rounded-[20px] shadow flex-col justify-start items-start inline-flex">
                <Outlet />
            </div>
        </div>
    );
}
