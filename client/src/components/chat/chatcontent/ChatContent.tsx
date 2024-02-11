// Inside ChatContent.tsx
import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import './ChatContent.css';
import { useChatSocketStore } from '../../../stores/ChatSocketStore';



interface Contact {
    image: string;
    id: string;
    name: string;
    time: string;
}


interface ChatContentProps {
    selectedContact: Contact | null;
    userId: string;
}

const ChatContent: React.FC<ChatContentProps> = ({ selectedContact, userId }) => {
  const {socket, pushMessage, clearMessage, addRoom } = useChatSocketStore();
  const {rooms} = useChatSocketStore();
  // const axiosPrivate = useAxiosPrivate();

  console.log('getterofroom', rooms);

  
 
  useEffect(() => {

      socket?.on('dmMessage', (messages) => {
      console.log("Received message:", messages);  
      //  messages.forEach((message) => {
    // Push each message to the pushMessage function
      // pushMessage(message.message);
  // });
    });
    return () => {
        socket?.off('dmMessage');
        clearMessage();
    };
    }, []);

  const handleSendClick = (message: string) => {
    console.log("send to ", userId);
    socket?.emit('dm', {message: message, receiverId: userId});

    pushMessage(message);
    console.log('mymessage', message);
  };

  return (
    <div className="main__chatcontent">
      <MessageList  />
      <div className="content__footer">
        <MessageInput onSendClick={handleSendClick} maxLength={500} />
      </div>
    </div>
  );
};

export default ChatContent;
