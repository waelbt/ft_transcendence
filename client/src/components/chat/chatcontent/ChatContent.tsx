import React, { useState, useEffect } from 'react';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import './ChatContent.css';
import { useChatSocketStore } from '../../../stores/ChatSocketStore';
import { useUserStore } from '../../../stores/userStore';

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

const ChatContent: React.FC<ChatContentProps> = ({ response, userId, selectedContact }) => {
  const { id } = useUserStore();
  const { socket, pushMessage, clearMessage, addRoom } = useChatSocketStore();
  const [conversationMessages, setConversationMessages] = useState<Message[]>([]);
  // const {messages} = useChatSocketStore();
  useEffect(() => {
    if (selectedContact && response) {
      const room = response.find(room => room.roomTitle === id + selectedContact.id || room.roomTitle === selectedContact.id + id);
      if (room) {
        setConversationMessages(room.messages);
      }
    }

  }, [selectedContact, response, userId]);

  useEffect(() => {
    const handleNewMessage = (messages: Message[]) => {
      setConversationMessages(prevMessages => [...prevMessages, ...messages]);
      // console.log('conversationsMessages:', conversationMessages);
    };

    socket?.on('dmMessage', handleNewMessage);

    return () => {
      socket?.off('dmMessage', handleNewMessage);
    };
  }, [socket, conversationMessages]);

  const handleSendClick = (message: string) => {
    socket?.emit('dm', { message: message, receiverId: userId });
    // pushMessage(message);
  };

  return (
    <div className="main__chatcontent">
      <MessageList messages={conversationMessages} />
      <div className="content__footer">
        <MessageInput onSendClick={handleSendClick} maxLength={500} />
      </div>
    </div>
  );
};

export default ChatContent;
