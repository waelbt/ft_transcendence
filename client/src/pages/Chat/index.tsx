import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import useAxiosPrivate from '../../hooks/axiosPrivateHook';
import { NavLink, useParams } from 'react-router-dom';
import { useChatLayoutStore } from '../../stores/chatLayoutStore';
import { Message, RoomsList } from '../../../../shared/types';
import { Avatar } from '../../components';
import { useUserStore } from '../../stores/userStore';
import toast from 'react-hot-toast';
import { DateFormatter } from '../../tools/date_parsing';
import { MAX_MESSAGE_LENGTH } from '../../constants';
import { useDmStore } from '../../stores/dmStore';
import useGameStore from '../../stores/gameStore';
import { UserStatus } from '../../components/Avatar';

export function Chat() {
    const { id } = useParams();
    const [message, setMessage] = useState<string>('');
    const axiosPrivate = useAxiosPrivate();
    const { socket } = useChatLayoutStore();
    const { messages, currentDm, pushMessage, updateState, isForbbiden } =
        useDmStore();
    const { addUserBlockId, id: userId } = useUserStore();
    const contentRef = useRef<HTMLDivElement>(null);
    const { pushRoom } = useChatLayoutStore();
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= MAX_MESSAGE_LENGTH)
            setMessage(e.target.value);
    };

    const { socket: gameSocket, updateState: updateStateGame } = useGameStore();

    const sendMessage = () => {
        if (message.trim() && socket) {
            socket.emit('dm', { message, id });
            setMessage('');
        }
    };
    useEffect(() => {
        const fetchMessages = async () => {
            if (id) {
                try {
                    const res = await axiosPrivate.get(`/chat/dm/${id}`);
                    updateState({
                        currentDm: res.data.users[0],
                        messages: res.data.messages
                    });
                } catch (error) {
                    toast.error('There was a problem fetching messages.');
                }
            }
        };

        const messageListener = (message: Message) => {
            if (id && message.id === +id) {
                pushMessage(message);
            }
        };
        if (!socket) return;

        // const forbiddenListener = ({ id }: { id: string }) => {
        //     updateState({ isForbbiden: true });
        //     unpushRoom(+id, false);
        // };

        // socket.on('forbidden', forbiddenListener);

        socket.on('dm', messageListener);
        socket.on('checkDm', pushRoom);

        fetchMessages();

        return () => {
            socket.off('checkDm', pushRoom);
            socket.off('dm', messageListener);
        };
    }, [socket, id, pushMessage, axiosPrivate, updateState]);

    useEffect(() => {
        contentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const blockUser = async () => {
        if (currentDm?.id) {
            try {
                await axiosPrivate.post(`/users/blockUser/${currentDm.id}`);
                addUserBlockId(currentDm.id);
            } catch (error) {
                toast.error('Error blocking user.');
            }
        }
    };
    const { id: ID } = useUserStore();

    useEffect(() => {
        gameSocket?.on('gameCanceled', (message) => {
            toast.error(message);
        });

        return () => {
            gameSocket?.off('gameCanceled');
        };
    }, [gameSocket]);

    return (
        <div className=" flex-grow h-full flex gap-0  ">
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
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex z-[10] mx-5  gap-2 ${
                                    msg.senderId !== userId
                                        ? 'flex-row'
                                        : 'flex-row-reverse'
                                } items-end`}
                            >
                                <div
                                    key={index}
                                    className={`rounded-lg my-1 p-2  flex flex-col relative text-sm font-normal font-['Acme']      ${
                                        msg.senderId !== userId
                                            ? 'rounded-tl-none speech-bubble-left bg-gray-700'
                                            : 'rounded-tr-none speech-bubble-right bg-blue-800'
                                    } max-w-[320px] text-white`}
                                    style={{ wordWrap: 'break-word' }}
                                >
                                    {msg.message}
                                </div>
                                <div className="text-gray-600  leading-none bottom-0 text-xs font-normal font-['Acme']">
                                    {DateFormatter(msg.createdAt)}
                                </div>
                            </div>
                        ))}
                        <div ref={contentRef}></div>
                    </div>
                </div>
                {/* 8:45 AM */}
                <div
                    //  ${isblocked ? 'hidden' : ''}
                    className="flex items-center w-full h-[8%] gap-2 border border-stone-300  bg-white py-2 justify-center"
                >
                    {/* {!isForbbiden ? (
                        <> */}
                    <input
                        type="text"
                        value={message}
                        onChange={handleInputChange}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="send message"
                        className="h-full bg-gray-100 w-full ml-5 border border-stone-300 rounded justify-start pl-4 items-center inline-flex text-neutral-700  outline-none py-5 text-base font-normal font-['Acme']"
                    />
                    <div className=" text-stone-500  w-10 text-xs flex flex-col">
                        <div className="inline-flex justify-between">
                            <div>{message.length}</div>
                        </div>
                        <div>{MAX_MESSAGE_LENGTH}</div>
                    </div>
                    <RiSendPlaneFill
                        size={38}
                        className="text-blue-800 mr-5 cursor-pointer"
                        onClick={sendMessage}
                    />
                    {/* </>
                    ) : (
                        <div>you can't send messages to this group </div>
                    )} */}
                </div>
            </div>
            <div
                className="flex flex-col bg-white border-l border-stone-300 flex-grow items-center justify-center gap-10"
                // style={
                //     isForbbiden
                //         ? {
                //               filter: 'blur(4px)',
                //               pointerEvents: 'none'
                //           }
                //         : {}
                // }
            >
                <div className="flex flex-col items-center justify-center gap-2">
                    <Avatar
                        imageUrl={currentDm?.avatar}
                        style="w-32 h-32 bg-black rounded-[150px]  mr-2 flex-shrink-0 ring ring-stone-700"
                        userStatus={currentDm?.status as UserStatus}
                        avatarUserId={currentDm?.id as string}
                    />
                    <div className="text-black text-[22px] font-normal font-['Acme']">
                        {currentDm?.nickName}
                    </div>
                </div>
                <div className="flex-col justify-start items-center gap-5 flex">
                    <NavLink
                        className="justify-start items-center gap-0.5 inline-flex"
                        to={`/profile/${currentDm?.id}`}
                    >
                        <div className="text-neutral-600 text-2xl font-normal font-['Acme'] leading-none cursor-pointer">
                            See Profile
                        </div>
                    </NavLink>
                    <div
                        className="justify-start items-center gap-0.5 inline-flex"
                        onClick={() => {
                            gameSocket?.emit('friends', {
                                userid: currentDm?.id,
                                myid: ID
                            });
                        }}
                    >
                        <div className="text-sky-500 text-2xl font-normal font-['Acme'] leading-none cursor-pointer">
                            Challenge
                        </div>
                    </div>
                    <div
                        className="justify-start items-center gap-0.5 inline-flex cursor-pointer"
                        onClick={blockUser}
                    >
                        <div className="text-red-600 text-2xl font-normal font-['Acme'] leading-none">
                            Block
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
