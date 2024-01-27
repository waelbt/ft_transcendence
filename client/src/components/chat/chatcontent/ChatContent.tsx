import React, { useState, useEffect } from 'react';
import { IoSend } from 'react-icons/io5';
import { BsEmojiSmile } from 'react-icons/bs';
import { io } from 'socket.io-client';
// import WebSocket from "./WebSocket.tsx";
import MessageList from './MessageList';
import './ChatContent.css';

const socket = io('http://localhost:4000/chat');

export const ChatContent: React.FC = () => {
    const [currentMessage, setCurrentMessage] = useState('');

    const [messages, setMessages] = useState([
        { isMyMessage: true, message: 'Hello!' },
        { isMyMessage: false, message: 'Hi there!' },
        { isMyMessage: true, message: 't9sser' },
        { isMyMessage: false, message: 'no thanks' },
        { isMyMessage: true, message: '7iyed' }
    ]);

    useEffect(() => {
        socket.on('receive_message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('receive_message');
        };
    }, []);

    const handleSendClick = () => {
        // Emit the message to the server
        const messageData = { isMyMessage: true, message: currentMessage };
        socket.emit('send_message', messageData);
        setCurrentMessage('');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentMessage(e.target.value);
    };

    const handleEmojiClick = () => {
        // Handle Emoji button click
        // console.log('Emoji button clicked!');
    };

    return (
        <div className="main__chatcontent">
            <MessageList messages={messages} />
            <div className="content__footer">
                <div className="sendNewMessage">
                    <input
                        type="text"
                        placeholder="Type a message here"
                        value={currentMessage}
                        onChange={handleInputChange}
                    />
                    <button className="emoji" onClick={handleEmojiClick}>
                        <BsEmojiSmile size={24} />
                    </button>
                    <button onClick={handleSendClick}>
                        <IoSend size={24} color="#007bff" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatContent;
