// import React from 'react';
import { HiLogout } from 'react-icons/hi';
import { IoMdSettings } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
// ! edit men b3d
function UserMenu() {
    const navigate = useNavigate();
    return (
        <div className="p-2.5 bg-white rounded-[10px] shadow flex-col justify-start items-center inline-flex">
            <li
                className="self-stretch p-2.5  border-b border-neutral-300 justify-start items-center gap-4 inline-flex hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                    navigate('/profile/history');
                }}
            >
                <div className="avatar online">
                    <div className="w-8 h-8 rounded-full">
                        <img src="https://tecdn.b-cdn.net/img/new/avatars/2.webp" />
                    </div>
                </div>
                <div className="text-black text-xl font-normal font-['Acme']">
                    dos404
                </div>
            </li>
            <li className="self-stretch p-2.5 justify-start items-center gap-4 inline-flex cursor-pointer  hover:bg-gray-100">
                <div className="p-1rounded-[50px] justify-start items-center gap-2.5 flex">
                    <IoMdSettings size={24} />
                </div>
                <div className="text-zinc-600 text-xl font-normal font-['Acme'] pr-10">
                    Setting & privacy
                </div>
            </li>
            <li className="self-stretch p-2.5 justify-start items-center gap-4 inline-flex cursor-pointer hover:bg-gray-100">
                <div className="p-1 rounded-[50px] justify-start items-center gap-2.5 flex">
                    <HiLogout size={24} />
                </div>
                <div className="text-zinc-600 text-xl font-normal font-['Acme'] pr-10" onClick={() => {
                    // call end logout end + clear the store 
                    navigate('/');
                }}>
                    logout
                </div>
            </li>
        </div>
    );
}

export default UserMenu;
