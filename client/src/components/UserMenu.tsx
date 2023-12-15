// import React from 'react';
import { LuLogOut } from 'react-icons/lu';
import { IoMdSettings } from 'react-icons/io';
// ! edit men b3d 
function UserMenu() {
    return (
        <div className="w-[344px] h-[220px] p-2.5 bg-white rounded-[10px] shadow flex-col justify-start items-center inline-flex">
            <div className="self-stretch p-2.5 border-b border-neutral-300 justify-start items-center gap-2.5 inline-flex">
                <div className="avatar online">
                    <div className="w-8 h-8 rounded-full">
                        <img src="https://tecdn.b-cdn.net/img/new/avatars/2.webp" />
                    </div>
                </div>
                <div className="text-black text-xl font-normal font-['Acme']">
                    dos404
                </div>
            </div>
            <div className="self-stretch p-2.5 justify-start items-center gap-2.5 inline-flex">
                <div className="p-2.5 bg-neutral-100 rounded-[50px] justify-start items-center gap-2.5 flex">
                    <IoMdSettings size={24} />
                </div>
                <div className="text-zinc-600 text-xl font-normal font-['Acme']">
                    Setting & privacy
                </div>
            </div>
            <div className="self-stretch p-2.5 justify-start items-center gap-2.5 inline-flex">
                <div className="p-2.5 bg-neutral-100 rounded-[50px] justify-start items-center gap-2.5 flex">
                    <LuLogOut size={24} />
                </div>
                <div className="text-zinc-600 text-xl font-normal font-['Acme']">
                    logout
                </div>
            </div>
        </div>
    );
}

export default UserMenu;
