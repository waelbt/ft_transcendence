import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { AchievementIcon, JoinIcon } from '../assets/custom-icons';
import ProgressBar from './ProgressBar';
import { Avatar } from '.';
import { FC, useEffect, useState } from 'react';
import { BiSolidDownArrow } from 'react-icons/bi';
import 'react-loading-skeleton/dist/skeleton.css';
import Popup from 'reactjs-popup';
import useAxiosPrivate from '../hooks/axiosPrivateHook';
import { useUserStore } from '../stores/userStore';
// import { ACTIONS_ENDPOINTS } from '../constants';

type UserProfileCardProps = {
    id: string;
    avatar: string;
    nickName: string;
    fullName: string;
    createdAt: string;
    status: true;
    exp: 0;
    level: 0;
    isCurrentUser: boolean;
    relationship: string;
};

const UserProfileCard: FC<UserProfileCardProps> = (props) => {
    const navLinks = ['history', 'achivements', 'friends'];
    const { removeUserFriendId, addUserBlockId, addUserFriendId } =
        useUserStore();
    if (props.isCurrentUser) {
        navLinks.push('setting'); //! protect this
    }
    const navigate = useNavigate();
    const [actions, setActions] = useState<string[]>(['Block user']);
    const axiosPrivate = useAxiosPrivate();
    const [relation, setRelation] = useState<string>(props.relationship);
    const actionToNewRelation: { [key: string]: string } = {
        'Remove Friend': 'not friend',
        'Block User': 'blocked',
        'Send Request': 'invitation sender',
        'Cancel Request': 'not friend',
        'Accept Request': 'friend',
        'Decline Request': 'not friend'
    };

    useEffect(() => {
        if (props.relationship) {
            if (props.relationship == 'blocked') navigate('/error/403');
            let updatedActions = ['Block User']; // Default action

            switch (props.relationship) {
                case 'friend':
                    updatedActions = [
                        // 'Send Message',
                        'Remove Friend',
                        ...updatedActions
                    ];
                    break;
                case 'not friend':
                    updatedActions = ['Send Request', ...updatedActions];
                    break;
                case 'pending':
                    updatedActions = ['Cancel Request', ...updatedActions];
                    break;
                case 'invitation receiver':
                    updatedActions = [
                        'Accept Request',
                        'Decline Request',
                        ...updatedActions
                    ];
                    break;
            }
            setActions(updatedActions);
        }
    }, [relation]);
    const actionEndpoints: { [key in string]: string } = {
        'Remove Friend': `/friends/removeFriend/${props.id}`,
        'Block User': `/users/blockUser/${props.id}`,
        'Send Request': `/friends/sendFriendRequest/${props.id}`,
        'Cancel Request': `/users/unblockUser/${props.id}`,
        'Accept Request': `/friends/acceptFriendRequest/${props.id}`,
        'Decline Request': `/friends/rejectFriendRequest/${props.id}`
    };
    const actionEffects: { [key in string]: (id: string) => void } = {
        'Remove Friend': (id) => removeUserFriendId(id),
        'Block User': (id) => addUserBlockId(id),
        'Accept Request': (id) => addUserFriendId(id)
    };

    const handleAction = async (action: string) => {
        const endpoint = actionEndpoints[action];
        if (!endpoint) {
            console.error(`No endpoint found for action: ${action}`);
            return;
        }

        try {
            const response = await axiosPrivate.post(endpoint);
            console.log('Action response:', response);

            const effect = actionEffects[action];
            if (effect) {
                effect(props.id);
            }
            if (actionToNewRelation[action]) {
                setRelation(actionToNewRelation[action]);
            }
        } catch (error) {
            console.error(`Error executing action '${action}':`, error);
        }
    };

    return (
        <>
            <div className=" px-2.5 rounded-[20px] shadow justify-start items-center gap-5 inline-flex bg-white mt-4">
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
                        <ProgressBar value={20} color="bg-blue-500" />
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
                        {!props.isCurrentUser && (
                            <Popup
                                trigger={
                                    <div
                                        className={`group px-2.5 text-white py-[21px] justify-center items-center gap-2.5 inline-flex  border-b-4 border-white  hover:border-neutral-100 hover:bg-neutral-100 rounded cursor-pointer`}
                                    >
                                        <div className="text-neutral-500 text-xl font-normal font-['Acme']">
                                            More
                                        </div>
                                        <BiSolidDownArrow
                                            className="text-neutral-500"
                                            size={12}
                                        />
                                    </div>
                                }
                                position="bottom center"
                                nested
                            >
                                <div className="py-[5px] w-[200px] bg-white rounded-[10px] shadow flex-col justify-start items-center inline-flex divide-y divide-gray-100 ">
                                    {actions?.map((action) => (
                                        <div
                                            key={action}
                                            className="text-zinc-600 text-lg font-normal font-['Acme'] self-stretch p-2.5 border-b border-gray-200 justify-center items-center gap-2.5 inline-flex cursor-pointer hover:bg-neutral-100"
                                            onClick={() => handleAction(action)}
                                        >
                                            {action}
                                        </div>
                                    ))}
                                </div>
                            </Popup>
                        )}
                    </div>
                </div>
                <div className="px-3 py-3 rounded-2xl flex-col justify-center items-center gap-3 inline-flex">
                    <div className="px-1 py-1 justify-center items-center gap-2.5 inline-flex">
                        <AchievementIcon />
                        <div className="text-amber-500 text-3xl font-normal font-['Acme']">
                            0/13 achievement
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
