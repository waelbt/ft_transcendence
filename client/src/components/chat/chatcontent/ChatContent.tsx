import React, { useState, useEffect } from 'react';
// import { IoSend } from 'react-icons/io5';
// import { BsEmojiSmile } from 'react-icons/bs';
import { io } from 'socket.io-client';
import MessageInput from "./MessageInput";
import MessageList from './MessageList';
import './ChatContent.css';

const socket = io('http://localhost:4000/chat');

export const ChatContent: React.FC = () => {
  const [messages, setMessages] = useState([
    { isMyMessage: true, message: 'Hello!' },
    { isMyMessage: false, message: 'Hi there!' },
    { isMyMessage: true, message: 't9sser' },
  ]);

  useEffect(() => {
    socket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  const handleSendClick = (message: string) => {
    const messageData = { isMyMessage: true, message };
    socket.emit('message', messageData);
  };

  // const handleEmojiClick = () => {
  //   console.log('Emoji button clicked!');
  // };

  return (
    <div className="main__chatcontent">
      <MessageList messages={messages} />
      <div className="content__footer">
        <MessageInput onSendClick={handleSendClick} maxLength={500} />

      </div>
    </div>
  );
};

export default ChatContent;