import { FC, useEffect } from 'react';
import { useUserStore } from '../stores/userStore';
import useTimer from '../hooks/timer';
import { Avatar } from '.';
import { VersusIcon } from '../assets/custom-icons';
import Skeleton from 'react-loading-skeleton';
import { Friend } from '../../../shared/types';

type MatchPanelProps = {
    opponent: Friend | undefined;
    isStarted: boolean;
};

export const MatchPanel: FC<MatchPanelProps> = ({ opponent, isStarted }) => {
    const { avatar, nickName } = useUserStore();
    const { elapsedTime, formatTime, startTimer } = useTimer();

    useEffect(() => {
        if (isStarted) {
            startTimer();
        }
    }, [isStarted]);

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
                            {formatTime(elapsedTime)}
                        </div>
                    </div>
                    <div className="text-black text-[50px] font-normal font-['Acme']">
                        0
                    </div>
                </div>
                <div className="justify-center items-center gap-2.5 flex">
                    <div className="text-black text-[40px] font-normal font-['Acme']">
                        {opponent ? (
                            opponent.nickName
                        ) : (
                            <Skeleton width={150} height={30} />
                        )}
                    </div>
                    <div>
                        {opponent ? (
                            <Avatar
                                imageUrl={opponent?.avatar}
                                style="w-[90px] h-[98px] relative rounded-[80px] border-2 border-black"
                            />
                        ) : (
                            <Skeleton circle={true} height={98} width={90} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
