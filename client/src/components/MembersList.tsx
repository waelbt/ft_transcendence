import { FaCrown, FaPlus } from 'react-icons/fa';
import { IoShield } from 'react-icons/io5';
import { useRoomStore } from '../stores/roomStore';
import { Fragment, useEffect, useState } from 'react';
import { Avatar, Modal } from '.';
import { useUserStore } from '../stores/userStore';
import { useNavigate } from 'react-router-dom';
import { useChatLayoutStore } from '../stores/chatLayoutStore';
import AddMembers from './AddMembers';

const EventButton = ({ task, label }: { task: () => void; label: string }) => {
    return (
        <div
            className="self-stretch px-5 py-2 cursor-pointer bg-zinc-700 rounded-sm flex-col justify-center items-center gap-2.5 flex text-white text-lg font-normal font-['Acme']"
            onClick={() => task()}
        >
            {label}
        </div>
    );
};

function MembersList() {
    const { id, roomTitle, users, owner, isAdmin, isMuted, admins } =
        useRoomStore();
    const [isEventOpen, setIsEventOpen] = useState(false);
    const { id: userID } = useUserStore();
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [actions, setActions] = useState<string[]>([]);
    const { socket } = useChatLayoutStore();
    const [showMembersModel, setShowMembersModel] = useState<boolean>(false);
    const [isEventMute, setIsEventMute] = useState<boolean>(false);
    const muteOptions = [
        { label: 'Mute for 1 min', duration: 1 },
        { label: 'Mute for 1 hour', duration: 60 },
        { label: 'Mute for 1 day', duration: 1440 }
    ];

    useEffect(() => {
        let updatedActions = ['Ban', 'Kick'];

        if (owner[0] == userID && selectedId) {
            updatedActions = [
                isAdmin(selectedId) ? 'Unset Admin' : 'Set As Admin',
                ...updatedActions
            ];
        }

        if (selectedId) {
            updatedActions = [
                isMuted(selectedId) ? 'Unmute' : 'Mute',
                ...updatedActions
            ];
        }

        setActions(updatedActions);
    }, [selectedId, owner, admins]);

    return (
        <div className="flex-grow  relative w-full max-h-[450px] overflow-y-auto gap-4 flex flex-col items-center justify-start  border border-stone-400 rounded-md  bg-slate-100 px-4 py-4 ">
            <div
                className="absolute bottom-5 right-5"
                onClick={() => setShowMembersModel(true)}
            >
                <FaPlus
                    size={33}
                    className="cursor-pointer  text-black"
                    // onClick=()
                />
            </div>
            {users.map((member, index) => (
                <Fragment key={'users' + index}>
                    <div
                        className={`flex w-full justify-start items-center  gap-2 ${
                            member.id !== userID ? 'cursor-pointer' : ''
                        } `}
                        onClick={() => {
                            if (
                                isAdmin(userID) &&
                                member.id !== userID &&
                                owner[0] !== member.id
                            ) {
                                setSelectedId(member.id);
                                setIsEventOpen(true);
                            } else if (member.id !== userID)
                                navigate(`/profile/${member.id}`);
                        }}
                    >
                        <Avatar
                            imageUrl={member.avatar}
                            style="w-14 h-14 bg-black  rounded-[150px]  mr-2 flex-shrink-0  ring ring-lime-400 ring-offset-base-100 ring-offset-0"
                        />
                        <div className="text-2xl font-normal font-['Acme']">
                            {member.nickName}
                        </div>
                        {owner[0] === member.id ? (
                            <FaCrown size={22} className="text-yellow-500" />
                        ) : isAdmin(member.id) ? (
                            <IoShield size={22} className="text-red-800" />
                        ) : null}
                    </div>
                    <Modal
                        removable={true}
                        isEventOpen={showMembersModel}
                        closeEvent={() => setShowMembersModel(false)}
                    >
                        <AddMembers />
                    </Modal>
                    <Modal
                        removable={false}
                        isEventOpen={isEventOpen}
                        closeEvent={() => setIsEventOpen(false)}
                    >
                        <div className=" bg-white px-16 pt-11 pb-4 rounded-[20px] shadow border border-stone-300 flex-col justify-start items-center gap-2.5 inline-flex">
                            {!isEventMute ? (
                                <>
                                    <EventButton
                                        task={() =>
                                            navigate(`/profile/${member.id}`)
                                        }
                                        label="View Profile"
                                    />
                                    {actions.map((action, index) => (
                                        <EventButton
                                            key={`action${index}`}
                                            task={() => {
                                                if (action === 'Mute')
                                                    setIsEventMute(true);
                                                else {
                                                    socket?.emit(action, {
                                                        userId: selectedId,
                                                        roomId: id,
                                                        roomTitle
                                                    });
                                                    setIsEventOpen(false);
                                                }
                                            }}
                                            label={action}
                                        />
                                    ))}
                                </>
                            ) : (
                                <div className="flex flex-col gap-4 bg-white p-4 rounded-md">
                                    <div className="font-['Acme'] font-normal text-3xl">
                                        Mute messages
                                    </div>
                                    {muteOptions.map((option, index) => (
                                        <div
                                            key={'muteOptions' + index}
                                            className="font-['Acme'] text-gray-800 font-normal text-xl cursor-pointer hover:bg-gray-300 p-2"
                                            onClick={() => {
                                                socket?.emit('Mute', {
                                                    userId: selectedId,
                                                    roomId: id,
                                                    roomTitle,
                                                    muteDuration:
                                                        option.duration
                                                });
                                                setIsEventOpen(false);
                                                setIsEventMute(false);
                                            }}
                                        >
                                            {option.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div
                                className="self-stretch mt-4 px-1 py-2 cursor-pointer bg-red-800 rounded-sm flex-col justify-center items-center gap-2.5 flex text-white text-lg font-normal font-['Acme']"
                                onClick={() => {
                                    setIsEventOpen(false);
                                    setIsEventMute(false);
                                    setSelectedId('');
                                }}
                            >
                                cancel
                            </div>
                        </div>
                    </Modal>
                </Fragment>
            ))}
        </div>
    );
}

export default MembersList;
