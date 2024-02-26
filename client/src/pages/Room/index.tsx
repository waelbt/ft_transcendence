import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import useAxiosPrivate from '../../hooks/axiosPrivateHook';
import { useParams } from 'react-router-dom';
import { useChatLayoutStore } from '../../stores/chatLayoutStore';
import { Avatar } from '../../components';
import { useUserStore } from '../../stores/userStore';
import { DateFormatter } from '../../tools/date_parsing';
import { MAX_MESSAGE_LENGTH } from '../../constants';

import GroupPanel from '../../components/GroupPanel';
import { useRoomStore } from '../../stores/roomStore';

export function Room() {
    const { id } = useParams();
    const [message, setMessage] = useState<string>('');
    const axiosPrivate = useAxiosPrivate();
    const { socket, unpushRoom } = useChatLayoutStore();
    const {
        messages,
        updateState,
        messageListener,
        userJoinedListener,
        userLeftListener,
        userkickedListener,
        canSendMessage,
        pushModerator,
        pushBan,
        pushMuted,
        unpushMuted,
        unpushModerator
    } = useRoomStore();
    const { id: userId } = useUserStore();
    const contentRef = useRef<HTMLDivElement>(null);
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= MAX_MESSAGE_LENGTH)
            setMessage(e.target.value);
    };

    // const { socket: gameSocket, updateState : updateStateGame } = useGameStore();

    // const navigate = useNavigate();

    // useEffect(() => {
    //     console.log('start startgame useEffect');
    //     gameSocket?.on('startgame', ({ room, SecondPlayer, opponentId, chosen }) => {
    //         console.log(SecondPlayer);
    //         updateStateGame({
    //             isSecondPlayer: SecondPlayer === 1,
    //             roomId: room,
    //             isGameReady: true,
    //             opponentId,
    //             gameMode: chosen
    //         });
    //         // setIsEventOpen(false);
    //         // window.location.href =(`/game/${room}`);
    //         navigate(`/game/${room}`);
    //     });

    //     return () => {
    //         gameSocket?.off('startgame');
    //         console.log('stop startgame useEffect');

    //     };
    // }, [gameSocket]);

    // useEffect(() => {
    //     socket?.on('challenge', () => {
    //         // navigate('/game');
    //         toast((t) => (
    //             <div className=" justify-center items-center flex flex-row gap-3">
    //                 <span>
    //                     you have been challenged by{' '}
    //                 </span>
    //                 <button
    //                     className=' rounded-lg border border-green-500 p-1 text-green-500'
    //                     onClick={() =>{
    //                         socket.emit('friends', {userid : '', myid:userId})
    //                         toast.dismiss(t.id)
    //                     }}
    //                 >
    //                     Accept
    //                 </button>
    //                 <button
    //                     className=' rounded-lg border border-green-500 p-1 text-green-500'
    //                     onClick={() => toast.dismiss(t.id)}
    //                 >
    //                     Cancel
    //                 </button>
    //               </div>
    //           ));
    //     });
    //     return () => {socket?.off('challenge')};
    // }, [socket]);

    // const [isblocked, setIsblocked] = useState<boolean>(false);
    // const navigate = useNavigate();
    const sendMessage = () => {
        if (message.trim()) {
            socket?.emit('message', { message, id });
            setMessage('');
        }
    };

    useEffect(() => {
        contentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        updateState({ isModifiable: false });
        const fetchMessages = async () => {
            try {
                const res = await axiosPrivate.get(`/chat/room/${id}`);
                updateState({ ...res.data });
                updateState({ id: id });
            } catch (error) {
                console.error('There was a problem fetching messages:', error);
            }
        };

        fetchMessages();
    }, [id]);

    useEffect(() => {
        if (!socket) return;

        const handlekick = ({
            id: kickedUser,
            nickname
        }: {
            id: string;
            nickname: string;
        }) => {
            userkickedListener({ id: kickedUser, nickname });
            console.log('kick ', kickedUser, '   ', userId, id);
            if (kickedUser === userId && id) unpushRoom(+id, true);
        };

        const handleBan = ({
            id: banUser,
            nickname
        }: {
            id: string;
            nickname: string;
        }) => {
            pushBan({ id: banUser, nickname });
            if (banUser === userId && id) unpushRoom(+id, true);
        };

        socket.on('unsetAdmin', unpushModerator);
        socket.on('unmuteUser', unpushMuted);
        socket.on('muteUser', pushMuted);
        socket.on('banMember', handleBan);
        socket.on('setAdmin', pushModerator);
        socket.on('kickMember', handlekick);
        socket.on('joinRoom', userJoinedListener);
        socket.on('message', messageListener);
        socket.on('leaveRoom', userLeftListener);

        return () => {
            socket.on('unsetAdmin', unpushModerator);
            socket.off('unmuteUser', unpushMuted);
            socket.off('muteUser', pushMuted);
            socket.off('banMember', handleBan);
            socket.off('setAdmin', pushModerator);
            socket.off('kickMember', handlekick);
            socket.off('joinRoom', userJoinedListener);
            socket.off('message', messageListener);
            socket.off('leaveRoom', userLeftListener);
        };
    }, [socket]);

    return (
        <div className=" flex-grow h-full flex gap-0 ">
            <div className="flex flex-col w-[70%] items-center justify-end ">
                {/* content */}
                <div className="flex-grow w-full bg-gray-200 z-[0] pb-5 overflow-y-auto flex flex-col relative justify-end">
                    {/* Background div */}
                    <img
                        className="absolute top-0 left-0 z-[-1] w-full h-full object-cover"
                        src="../../..//chat-bg.png" // Ensure this path is correct
                        alt="Chat Background"
                    />

                    {/* Messages */}
                    <div className="overflow-y-auto h-full flex flex-col justify-start mt-5">
                        {messages.map((msg, index) => {
                            if (msg.id === 0) {
                                return (
                                    <div
                                        key={index}
                                        className="flex justify-center items-center text-gray-500 font-normal font-['Acme'] text-base mt-5"
                                    >
                                        {`---------------- ${msg.message} ----------------`}
                                    </div>
                                );
                            }
                            if (userId !== msg.senderId) {
                                return (
                                    <div
                                        key={index}
                                        className="justify-start flex z-[10] mx-5 gap-2 flex-row items-center "
                                    >
                                        <div className="relative inline-block">
                                            <Avatar
                                                imageUrl={msg.avatar}
                                                style="w-11 h-11 bg-black rounded-[150px]  mr-2 flex-shrink-0  ring ring-lime-400 ring-offset-base-100 ring-offset-0"
                                            />
                                        </div>
                                        <div className="flex-col justify-start items-start gap-0.5 inline-flex">
                                            <div className="text-lime-400 text-xl  font-normal font-['Acme']">
                                                {/* {msg.senderId} */}
                                                {msg.nickName}
                                            </div>
                                            <div
                                                className="rounded-lg my-1 p-2 text-sm flex flex-col relative rounded-tr-none  bg-gray-700 max-w-[320px] text-white"
                                                style={{
                                                    wordWrap: 'break-word'
                                                }}
                                            >
                                                {msg.message}
                                            </div>
                                            {/*//! time
                                             <div className="text-gray-600 text-xs leading-none bottom-0">
                                                {DateFormatter(msg.createdAt)}
                                            </div> */}
                                        </div>
                                    </div>
                                );
                            }
                            return (
                                <div
                                    key={index}
                                    className={`flex z-[10] mx-5  gap-2 flex-row-reverse items-end`}
                                >
                                    <div
                                        key={index}
                                        className={`rounded-lg my-1 p-2 text-sm flex flex-col relative rounded-tr-none speech-bubble-right bg-blue-800 max-w-[320px] text-white`}
                                        style={{ wordWrap: 'break-word' }}
                                    >
                                        {msg.message}
                                    </div>
                                    <div className="text-gray-600 text-xs leading-none bottom-0">
                                        {DateFormatter(msg.createdAt)}
                                    </div>
                                </div>
                            );
                        })}

                        <div ref={contentRef}></div>
                    </div>
                </div>
                <div className="flex items-center w-full h-[8%] gap-2 border border-stone-300  bg-white py-2 justify-center  text-neutral-700  text-base font-normal font-['Acme']">
                    {canSendMessage(userId) ? (
                        <>
                            <input
                                type="text"
                                value={message}
                                onChange={handleInputChange}
                                onKeyDown={(e) =>
                                    e.key === 'Enter' && sendMessage()
                                }
                                placeholder="send message"
                                className="h-full bg-gray-100 w-full ml-5 border border-stone-300 rounded justify-start pl-4 items-center inline-flex outline-none "
                            />
                            <div className=" text-stone-500  w-10 text-xs flex flex-col">
                                <div className="inline-flex justify-between">
                                    <div>{message.length}</div>/
                                </div>
                                <div>{MAX_MESSAGE_LENGTH}</div>
                            </div>
                            <RiSendPlaneFill
                                size={38}
                                className="text-blue-800 mr-5 cursor-pointer"
                                onClick={sendMessage}
                            />
                        </>
                    ) : (
                        <div>you can't send messages to this group </div>
                    )}
                </div>
            </div>
            <GroupPanel />
        </div>
    );
}
