import { useEffect } from 'react';
import { VersusIcon } from '../../assets/custom-icons';
import { Avatar } from '../../components';
import useGameStore from '../../stores/gameStore';
import { useUserStore } from '../../stores/userStore';
import useFriendPrevious from '../../hooks/friendPreviousHook';

export const play = () => {
    const { opponentId } = useGameStore();
    const { avatar, nickName } = useUserStore();
    const { friend: opponent } = useFriendPrevious(
        opponentId ? opponentId : ''
    );

    return (
        <div className="flex-col justify-center items-center">
            <div className="px-4 py-2.5 bg-white rounded-[100px] shadow justify-start items-center gap-[50px] inline-flex">
                <div className="justify-center items-center gap-2.5 flex">
                    <Avatar
                        imageUrl={avatar}
                        style="w-[90px] h-[98px] relative rounded-[80px] border-2 border-black"
                    />
                    <div className="text-black text-[40px] font-normal font-['Acme']">
                        {nickName}
                    </div>
                </div>
                <div className="justify-center items-center gap-5 flex">
                    <div className="text-black text-[50px] font-normal font-['Acme']">
                        0
                    </div>
                    <div className="flex-col justify-center items-center gap-[5px] inline-flex">
                        {/* <div className="w-[65px] h-[65px] relative"></div> */}
                        <VersusIcon />
                        <div className="text-black text-[22px] font-normal font-['Acme']">
                            1:01
                        </div>
                    </div>
                    <div className="text-black text-[50px] font-normal font-['Acme']">
                        0
                    </div>
                </div>
                <div className="justify-center items-center gap-2.5 flex">
                    <div className="text-black text-[40px] font-normal font-['Acme']">
                        {opponent?.name}
                    </div>
                    <div>
                        <Avatar
                            imageUrl={opponent?.avatar}
                            style="w-[90px] h-[98px] relative rounded-[80px] border-2 border-black"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
