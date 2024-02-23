import { FaCrown } from 'react-icons/fa';
import { IoShield } from 'react-icons/io5';
import { useRoomStore } from '../stores/roomStore';
import { Fragment, useEffect, useState } from 'react';
import { Avatar, Modal } from '.';
import { useUserStore } from '../stores/userStore';
import { useNavigate } from 'react-router-dom';
// import { useChatLayoutStore } from '../stores/chatLayoutStore';

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
    // const [isEventMute, setIsEventMute] = useState(false);
    // const muteOptions = [
    //     { label: 'Mute for 1 min', duration: 1 },
    //     { label: 'Mute for 1 hour', duration: 60 },
    //     { label: 'Mute for 1 day', duration: 1440 }
    // ];
    // const actions = ['Ban', 'Kick'];
    // const { socket } = useChatLayoutStore();

    useEffect(() => {
        let updatedActions = ['Ban', 'Kick'];

        if (owner[0] == userID) {
            // updatedActions = [admins.includes selectedId  'Set As Admin', ...updatedActions];
        }
        // ! mute unmute
        // ! set as admin unset admin
    }, [selectedId, owner, admins]);

    return (
        <div className="flex-grow w-full max-h-[450px] overflow-y-auto gap-4 flex flex-col items-center justify-start  border border-stone-400 rounded-md  bg-slate-100 px-4 py-4 ">
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
                            // FaCrownisMuted
                            <FaCrown size={22} className="text-yellow-500" />
                        ) : isAdmin(member.id) ? (
                            <IoShield className="text-red-800" />
                        ) : (
                            <div></div>
                        )}
                    </div>

                    <Modal
                        removable={false}
                        isEventOpen={isEventOpen}
                        closeEvent={() => setIsEventOpen(false)}
                    >
                        <div className=" bg-white px-16  pt-11 pb-[15px] rounded-[20px] shadow border border-stone-300 flex-col justify-start items-center gap-2.5 inline-flex">
                            <EventButton
                                task={() => navigate(`/profile/${member.id}`)}
                                label="View Profile"
                            />
                            {actions.map((action) => (
                                <div>{action}</div>
                            ))}
                            {/* <div
                                className="self-stretch px-5 py-2 cursor-pointer bg-zinc-700 rounded-sm flex-col justify-center items-center gap-2.5 flex text-white text-lg font-normal font-['Acme']"
                                onClick={() =>
                                    navigate(`/profile/${member.id}`)
                                }
                            >
                                View Profile EventButton
                            </div> */}
                        </div>
                    </Modal>
                </Fragment>
            ))}
        </div>
    );
}

export default MembersList;

{
    /* <div className=" bg-white px-16  pt-11 pb-[15px] rounded-[20px] shadow border border-stone-300 flex-col justify-start items-center gap-2.5 inline-flex">
    {!isEventMute ? (
        <>
            <div
                className="self-stretch px-5 py-2 cursor-pointer bg-zinc-700 rounded-sm flex-col justify-center items-center gap-2.5 flex text-white text-lg font-normal font-['Acme']"
                onClick={() => navigate(`/profile/${member.id}`)}
            >
                View Profile
            </div>
            <div
                key={index}
                className="self-stretch px-5 py-2 cursor-pointer bg-zinc-700 rounded-sm flex-col justify-center items-center gap-2.5 flex text-white text-lg font-normal font-['Acme']"
                onClick={() => {
                    isMuted(selectedId)
                        ? (socket?.emit(
                              'Unmute',
                              {
                                  userId: selectedId,
                                  roomId: id,
                                  roomTitle
                              }
                              // ! unmute function from the server
                          ),
                          setIsEventOpen(false))
                        : setIsEventMute(true);
                }}
            >
                {isMuted(selectedId) ? 'Unmute' : 'Muted'}
            </div>
            {owner[0] === userID && (
                <div
                    key={index}
                    className="self-stretch px-5 py-2 cursor-pointer bg-zinc-700 rounded-sm flex-col justify-center items-center gap-2.5 flex text-white text-lg font-normal font-['Acme']"
                    onClick={() => {
                        socket?.emit(
                            !isAdmin(selectedId)
                                ? 'Unset Admin'
                                : 'Set As Admin',
                            {
                                userId: selectedId,
                                roomId: id,
                                roomTitle
                            }
                        );
                        setIsEventOpen(false);
                        setIsEventMute(false);
                        setSelectedId(member.id);
                    }}
                >
                    {!isAdmin(member.id) ? 'Unset Admin' : 'Set As Admin'}
                </div>
            )}
            {actions.map((action, index) => (
                <div
                    key={'actions' + index}
                    className="self-stretch px-5 py-2 cursor-pointer bg-zinc-700 rounded-sm flex-col justify-center items-center gap-2.5 flex text-white text-lg font-normal font-['Acme']"
                    onClick={() => {
                        socket?.emit(action, {
                            userId: selectedId,
                            roomId: id,
                            roomTitle
                        });
                        setIsEventOpen(false);
                        setIsEventMute(false);
                    }}
                >
                    {action}
                </div>
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
                        console.log(member.id);
                        socket?.emit('Mute', {
                            userId: selectedId,
                            roomId: id,
                            roomTitle,
                            muteDuration: option.duration
                        });
                        setIsEventOpen(false);
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
</div>; */
}
