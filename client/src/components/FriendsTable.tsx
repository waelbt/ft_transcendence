import { useEffect, useState } from 'react';
import { Friend } from '../../../shared/types';
import { BsThreeDotsVertical } from 'react-icons/bs';
// import DropDownMenu from './DropDownMenu';
// import { TbMessageCircle2Filled } from 'react-icons/tb';
type FriendsTableProps = {
    friends: Friend[];
};

function FriendsTable({ friends }: FriendsTableProps) {
    const [openMenu, setOpenMenu] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    useEffect(() => {
        console.log(typeof friends);
    }, [friends]);

    return (
        <div className="relative flex-col justify-start items-start inline-flex">
            {friends.map((friend: Friend, index) => (
                <div
                    className="  py-4 border-b border-gray-200 justify-center items-center gap-[1104.88px] inline-flex "
                    key={friend.id}
                >
                    <div className="self-stretch justify-center items-center gap-2.5 inline-flex px-8">
                        <div className=" avatar">
                            <div className="w-12 rounded-full">
                                <img src={friend.avatar} />
                            </div>
                        </div>
                        <div className="self-stretch p-2.5 flex-col justify-center items-start gap-[5px] inline-flex">
                            <div className="text-black text-sm font-normal font-['Acme']">
                                {friend.name}
                            </div>
                            <div className="text-zinc-500 text-xs font-normal font-['Acme']">
                                {friend.status}
                            </div>
                        </div>
                    </div>
                    {/* <div className=" self-stretch p-2.5 justify-center items-center gap-2.5 inline-flex"> */}
                        {/* <button className="p-2 bg-neutral-100 rounded-3xl flex-col justify-center items-center">
                            <TbMessageCircle2Filled className="text-gray-500" /> //! message redirect buttom
                        </button> */}
                        <button
                            className="p-2 bg-neutral-100 rounded-3xl flex-col justify-center items-center"
                            onClick={() => {
                                setOpenMenu(true);
                                setActiveIndex(
                                    index !== activeIndex ? index : -1
                                );
                            }}
                        >
                            <BsThreeDotsVertical className="text-gray-500" />
                        </button>
                    {/* </div> */}
                </div>
            ))}
            
        </div>
    );
}

export default FriendsTable;
// {openMenu && activeIndex === index && (
//     <div className="z-100 aboslute top-0 left-0">
//         <DropDownMenu actions={friend.actions} />
//     </div>
// )}