import { NavLink } from 'react-router-dom';
import { AchievementIcon, JoinIcon } from '../assets/custom-icons';
import ProgressBar from './ProgressBar';
import { Avatar } from '.';
import { FC } from 'react';

type UserProfileCardProps = {
    avatar: string;
    nickName: string;
    fullName: string;
    createdAt: string;
    status: true;
    exp: 0;
    level: 0;
};

const UserProfileCard: FC<UserProfileCardProps> = (props) => {
    // setting 
    const navLinks = ['history', 'achivements', 'friends', 'setting'];
    return (
        <>
            <div className=" px-2.5 rounded-[20px] shadow justify-start items-center gap-5 inline-flex bg-white">
                <div className="px-5 py-2.5 flex-col justify-center items-center gap-2.5 inline-flex">
                    <Avatar
                        imageUrl={props.avatar}
                        state="online"
                        style="w-40 h-40"
                    />
                    <div className="text-black text-[22px] font-normal font-['Acme']">
                        {props.nickName}
                    </div>
                </div>
                <div className="flex-col justify-center items-start inline-flex pt-4">
                    <div className="self-stretch px-10 justify-start items-start gap-2.5 inline-flex">
                        <div className="text-neutral-400 text-[22px] font-normal font-['Acme']">
                            {props.fullName}
                        </div>
                    </div>
                    <div className="w-[553px] h-[130px] px-10 py-[35px] border-l-4 border-r-4 border-gray-200 flex-col justify-center items-start gap-2.5 flex">
                        <div className="self-stretch justify-between items-start  inline-flex text-black text-xl font-normal font-['Acme']">
                            <span>level {props.level}</span>
                            <span>{props.exp}/3000</span>
                        </div>
                        <ProgressBar />
                    </div>
                    <div className="self-stretch px-10 justify-start items-start gap-2.5 inline-flex">
                        {navLinks.map((link, index) => (
                            <NavLink
                                key={index}
                                // ! :id 
                                to={`${link}`}
                                className={({ isActive }) =>
                                    `px-2.5 py-[21px] justify-center items-center gap-2.5 flex text-xl font-normal font-['Acme'] ${
                                        isActive
                                            ? 'text-black border-b-4 border-black '
                                            : ' text-neutral-500'
                                    }`
                                }
                            >
                                {link}
                            </NavLink>
                        ))}
                    </div>
                </div>
                <div className="px-3 py-3 rounded-2xl flex-col justify-center items-center gap-3 inline-flex">
                    <div className="px-1 py-1 justify-center items-center gap-2.5 inline-flex">
                        <AchievementIcon />
                        <div className="text-amber-500 text-3xl font-normal font-['Acme']">
                            0/13 achievement{' '}
                        </div>
                    </div>
                    <div className="px-1 justify-center items-center gap-1.5 inline-flex">
                        <JoinIcon />
                        <div className="text-neutral-400 text-sm font-normal font-['Acme']">
                            {/* Jan 19, 2019 */}
                            {props.createdAt}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserProfileCard;
