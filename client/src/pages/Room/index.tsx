import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import useAxiosPrivate from '../../hooks/axiosPrivateHook';
import { NavLink, useParams } from 'react-router-dom';
import { useChatStore } from '../../stores/chatStore';
import { Message } from '../../../../shared/types';
import { Avatar } from '../../components';
import { useUserStore } from '../../stores/userStore';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
import { DateFormatter } from '../../tools/date_parsing';
import { MAX_MESSAGE_LENGTH } from '../../constants';

export function Room() {
    const { roomId } = useParams();
    const [message, setMessage] = useState<string>('');
    const axiosPrivate = useAxiosPrivate();
    const { socket, updateState, messages, pushMessage } = useChatStore();
    const { id: userId } = useUserStore();
    const contentRef = useRef<HTMLDivElement>(null);
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length <= MAX_MESSAGE_LENGTH)
            setMessage(e.target.value);
    };
    // const [isblocked, setIsblocked] = useState<boolean>(false);
    // const navigate = useNavigate();

    const sendMessage = () => {
        if (message.trim()) {
            // setMessages((prevMessages) => [message, ...prevMessages]);
            socket?.emit('message', { message: message, roomId: roomId });
            setMessage('');
        }
    };

    useEffect(() => {
        contentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axiosPrivate.get(`/chat/room/${roomId}`);
                console.log('www', res);
                updateState({
                    messages: res.data.messages
                });
            } catch (error) {
                console.error('There was a problem fetching messages:', error);
            }
        };

        fetchMessages();
        socket?.on('message', (message: Message) => {
            if (roomId) {
                if (message.dmId === +roomId) pushMessage(message);
            }
        });

        return () => {
            socket?.off('message');
        };
    }, [roomId]);

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
                                    className={`rounded-lg my-1 p-2 text-sm flex flex-col relative ${
                                        msg.senderId !== userId
                                            ? 'rounded-tl-none speech-bubble-left bg-gray-700'
                                            : 'rounded-tr-none speech-bubble-right bg-blue-800'
                                    } max-w-[320px] text-white`}
                                    style={{ wordWrap: 'break-word' }}
                                >
                                    {msg.message}
                                </div>
                                <div className="text-gray-600 text-xs leading-none bottom-0">
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
                    <input
                        type="text"
                        value={message}
                        onChange={handleInputChange}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="send message"
                        className="h-full bg-gray-100 w-full ml-5 border border-stone-300 rounded justify-start pl-4 items-center inline-flex text-neutral-700 text-sm font-semibold font-['Poppins'] outline-none"
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
                </div>
            </div>
            <div className="flex flex-col bg-white border-l border-stone-300 flex-grow items-center justify-center gap-10"></div>
        </div>
    );
}
