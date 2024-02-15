import { ChangeEvent, useEffect, useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import useAxiosPrivate from '../../hooks/axiosPrivateHook';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useChatStore } from '../../stores/chatStore';
import { Message } from '../../../../shared/types';
import { Avatar } from '../../components';
import { useUserStore } from '../../stores/userStore';
import { isAxiosError } from 'axios';
import toast from 'react-hot-toast';
// import { useChatStore } from '../../stores/chatStore';

let id = 'db iji ';
export function Chat() {
    const { roomId } = useParams();
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<string[]>([]); // Array to store messages
    const axiosPrivate = useAxiosPrivate();
    // const { socket } = useChatStore();
    const { addUserBlockId } = useUserStore();
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };
    const navigate = useNavigate();

    const sendMessage = () => {
        if (message.trim()) {
            setMessages((prevMessages) => [message, ...prevMessages]);
            // socket?.emit('dm', { message: message });
            setMessage('');
        }
    };

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axiosPrivate.get(`/chat/dm/${roomId}`);
                console.log(res.data);
                setMessages([res.data.messages[0].message]);
            } catch (error) {
                console.error('There was a problem fetching messages:', error);
            }
        };

        // fetchMessages();
        // socket?.on('dmMessage', (message: Message) => {
        //     setMessages((prevMessages) => [message.message, ...prevMessages]);
        // });

        // return () => {
        //     socket?.off('dmMessage');
        // };
    }, []);

    const InvitePlayer = () => {};

    const blockUser = async () => {
        try {
            await axiosPrivate.post(`/users/blockUser/${id}`);
            addUserBlockId(id);
            navigate('/chat/');
        } catch (error) {
            if (isAxiosError(error)) toast.error(error.response?.data?.message);
        }
    };
    return (
        <div className=" flex-grow h-full flex gap-0 ">
            <div className="flex flex-col w-[70%] items-center justify-end ">
                {/* content */}
                <div className="flex-grow w-full bg-gray-100 z-[0] pb-5 overflow-y-auto flex flex-col relative justify-end">
                    {/* Background div */}
                    <img
                        className="absolute top-0 left-0 z-[-1] w-full h-full object-cover"
                        src="../../..//chat-bg.png" // Ensure this path is correct
                        alt="Chat Background"
                    />

                    {/* Messages */}
                    <div className="overflow-y-auto h-full flex flex-col-reverse justify-start">
                        {messages.map((msg, index) => (
                            <>
                                <div
                                    key={index}
                                    className="flex flex-row items-end z-[10] mx-5 gap-2 "
                                >
                                    <div
                                        key={index}
                                        className="rounded-lg rounded-tl-none my-1 p-2 text-sm  flex flex-col relative speech-bubble-left text-white max-w-[320px]  bg-gray-700"
                                        style={{ wordWrap: 'break-word' }}
                                    >
                                        {msg}
                                    </div>
                                    <div className="text-gray-600 text-xs leading-none  bottom-0">
                                        8:45 AM
                                    </div>
                                </div>
                                <div
                                    key={index}
                                    className="flex flex-row-reverse items-end z-[10] mx-5 gap-2 "
                                >
                                    <div
                                        key={index}
                                        className="pl-4 rounded-tl-none max-w-[320px] bg-blue-800 text-white  rounded-lg rounded-tr-none my-1 p-2 text-sm  flex flex-col relative speech-bubble-right"
                                        style={{ wordWrap: 'break-word' }}
                                    >
                                        {msg}
                                    </div>

                                    <div className="text-gray-600 text-xs  leading-none  bottom-0  ">
                                        8:45 AM
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>

                <div className="flex items-center w-full h-[8%] gap-2 border border-stone-300  bg-white py-2 justify-center ">
                    <input
                        type="text"
                        value={message}
                        onChange={handleInputChange}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="send message"
                        className="h-full bg-gray-100 w-full ml-5 border border-stone-300 rounded justify-start pl-4 items-center inline-flex bg-transparent text-neutral-700 text-sm font-semibold font-['Poppins'] outline-none"
                    />
                    <RiSendPlaneFill
                        size={38}
                        className="text-blue-800 mr-5 cursor-pointer"
                        onClick={sendMessage}
                    />
                </div>
            </div>
            <div className="flex flex-col bg-white border-l border-stone-300 flex-grow items-center justify-center gap-10">
                <div className="flex flex-col items-center justify-center gap-2">
                    <Avatar
                        imageUrl={`${import.meta.env.VITE_DEFAULT_AVATAR}1.png`}
                        style="w-32 h-32 bg-black rounded-[150px]  mr-2 flex-shrink-0 ring ring-black"
                    />
                    <div className="text-black text-[22px] font-normal font-['Acme']">
                        Dos404
                    </div>
                </div>
                <div className="flex-col justify-start items-center gap-5 flex">
                    <NavLink
                        className="justify-start items-center gap-0.5 inline-flex"
                        to={`/profile/${id}`}
                    >
                        <div className="text-neutral-600 text-2xl font-normal font-['Acme'] leading-none cursor-pointer">
                            See Profile
                        </div>
                    </NavLink>
                    <div
                        className="justify-start items-center gap-0.5 inline-flex"
                        onClick={InvitePlayer}
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
