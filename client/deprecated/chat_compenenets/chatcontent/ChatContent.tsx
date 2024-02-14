import React, { useState, useEffect } from 'react';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import './ChatContent.css';
import { useChatSocketStore } from '../../../stores/ChatSocketStore';
import { useUserStore } from '../../../stores/userStore';
import { useParams } from 'react-router-dom';

interface Contact {
  image: string;
  id: string;
  name: string;
  time: string;
}

interface Message {
  message: string;
  senderId: string;
  receiverId: string;
  timestamp: string;
}

interface Room {
  createdAt: string;
  friendId: string;
  id: number;
  messages: Message[];
  roomTitle: string;
  updatedAt: string;
  users: any[];
}

interface ChatContentProps {
  selectedContact: Contact | null;
  userId: string;
  response: Room[];
}

export const ChatContent: React.FC = () => {
  const {id} = useParams();
  const { id : userId } = useUserStore();
  const { socket, pushMessage, messages,clearMessage, addRoom } = useChatSocketStore();
  

  useEffect(() => {
    socket?.emit('checkDm', { friendId: id });
    const handleCheckDM = (room: any) => {
      console.log('check', room);
      room.messages.forEach((message: any) => {
          pushMessage(message.message);
        });
      console.log('to navigate'); 
      };

  socket?.on('checkDM', handleCheckDM);

    // return socket?.off('checkDM')
  }, [id,socket])

  // // const {messages} = useChatSocketStore();
  // useEffect(() => {
  //   if (selectedContact && response) {
  //     const room = response.find(room => room.roomTitle === id + selectedContact.id || room.roomTitle === selectedContact.id + id);
  //     if (room) {
  //       setConversationMessages(room.messages);
  //     }
  //   }

  // }, [id]);

  // useEffect(() => {
  //   const handleNewMessage = (messages: Message[]) => {
  //     setConversationMessages(prevMessages => [...prevMessages, ...messages]);
  //     // console.log('conversationsMessages:', conversationMessages);
  //   };

  //   socket?.on('dmMessage', handleNewMessage);

  //   return () => {
  //     socket?.off('dmMessage', handleNewMessage);
  //   };
  // }, [socket, conversationMessages]);

  const handleSendClick = (message: string) => {
    socket?.emit('dm', { message: message, receiverId: userId });
    pushMessage(message);
  };

  return (
    <div className="main__chatcontent">
      {/* <MessageList  /> */}
      <div className="message-list">
      {messages && messages.map((message, index) => (
         
        <div className={`message-item ${message.senderId === id ? 'my-message' : 'other-message'}`} >
          <p>{message.message}</p>
        </div>
      ))}
    </div>
      <div className="content__footer">
        <MessageInput onSendClick={handleSendClick} maxLength={500} />
      </div>
    </div>
  );
};

// export default ChatContent;
