import { useParams } from 'react-router';
import { MessageIcon } from '../assets/custom-icons';
import { useEffect, useState } from 'react';
import { Avatar } from '.';
import { DEFAULT_PATH } from '../constants';
import { BsFillSendFill } from 'react-icons/bs';
// import { useSocketStore } from '../stores/socketStore';
import { io } from 'socket.io-client';
import { useUserStore } from '../stores/userStore';

function GlobalChat() {
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState([]);
    const [socket, setSocket] = useState<any>(null);
    const { accessToken } = useUserStore();
    useEffect(() => {
        // Connect to the Socket.IO server
        const newSocket = io('http://localhost:4000/chat', {
            auth: {
                accessToken: accessToken
            }
        }); // Replace with your server URL
        setSocket(newSocket);

        // Event listener for receiving messages
        newSocket.on('globalMessage', (data) => {
            console.log(data);
            alert(data);
        });

        // Cleanup function to disconnect the socket when the component unmounts
        return () => {
            newSocket.disconnect();
        };
    }, []); // Run this effect only once when the component mounts

    const sendMessage = () => {
        // Emit a 'message' event to the server
        socket.emit('globalChat', message);

        // Clear the input field after sending the message
        setMessage('');
    };
    return (
        <div className="w-[380px] self-stretch p-2.5 bg-white rounded-[20px] shadow flex-col justify-center items-center gap-[13px] inline-flex mt-9 mb-7">
            {/* header */}
            <div className="self-stretch px-2.5 py-[15px] border-b border-neutral-300 justify-between items-center inline-flex">
                <div className="justify-start items-center gap-[5px] flex">
                    <MessageIcon />
                    <div className="text-black text-sm font-normal font-['Acme'] leading-[18.20px] tracking-tight">
                        General Chat
                    </div>
                </div>
                <div className="justify-center items-center gap-[5px] flex">
                    <div className="text-neutral-500 text-sm font-normal font-['Acme']">
                        147
                    </div>
                    <ul className="flex -space-x-4 rtl:space-x-reverse">
                        {Array.from({ length: 3 }, (_, index) => (
                            <li key={index}>
                                <Avatar
                                    imageUrl={`${DEFAULT_PATH}${index + 1}.png`}
                                    style="w-6 h-6 bg-black rounded-[150px] border border-white"
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {/* message */}
            <div className="flex-grow overflow-auto"></div>
            {/* input */}
            <div className="w-[340px] px-5 bg-zinc-100 rounded-[10px] justify-between items-center gap-[30px] inline-flex space">
                <input
                    type="text"
                    placeholder="write your message....."
                    className="h-14 text-neutral-400 bg-zinc-100 text-sm font-normal outline-none font-['Acme'] flex-grow "
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <div className="cursor-pointer" onClick={sendMessage}>
                    <BsFillSendFill className="text-blue-500" size={22} />
                </div>
            </div>
        </div>
    );
}

export default GlobalChat;
