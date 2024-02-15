import { ChangeEvent, useEffect, useState } from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';
import useAxiosPrivate from '../../hooks/axiosPrivateHook';
import { useParams } from 'react-router-dom';
import { useChatStore } from '../../stores/chatStore';
import { Message } from '../../../../shared/types';
// import { useChatStore } from '../../stores/chatStore';

export function Chat() {
    const { roomId } = useParams();
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<string[]>([]); // Array to store messages
    const axiosPrivate = useAxiosPrivate();
    const { socket } = useChatStore();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const sendMessage = () => {
        if (message.trim()) {
            // Check if message is not just whitespace
            // setMessages((prevMessages) => [message, ...prevMessages]);
            socket?.emit('dm', { message: message });
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

        fetchMessages();
        socket?.on('dmMessage', (message: Message) => {
            setMessages((prevMessages) => [message.message, ...prevMessages]);
        });

        return () => {
            socket?.off('dmMessage');
        };
    }, []);

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
                            <div
                                key={index}
                                className="flex flex-col z-[10] mx-5"
                            >
                                <div
                                    key={index}
                                    className="mr-auto pl-4 rounded-lg rounded-tl-none  max-w-[320px] my-1 p-2 text-sm bg-white flex flex-col  speech-bubble-left "
                                    style={{ wordWrap: 'break-word' }}
                                >
                                    {msg}
                                </div>
                                <div className="text-gray-600 text-xs text-right leading-none  bottom-0 right-1 ">
                                    8:45 AM
                                </div>
                            </div>
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
            <div className="flex flex-col bg-white border-l border-stone-300 flex-grow"></div>
        </div>
    );
}
