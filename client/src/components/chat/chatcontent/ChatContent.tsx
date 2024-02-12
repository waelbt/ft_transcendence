// Inside ChatContent.tsx
import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
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
  friendId: string; // This is the friend's ID
  id: number;
  messages: Message[];
  roomTitle: string;
  updatedAt: string;
  users: any[];
}

interface ChatContentProps {
    // contacts: Contact[];
    selectedContact: Contact | null;
    userId: string;
    response: Room[];
}

const ChatContent: React.FC<ChatContentProps> = ({ response, userId, selectedContact }) => {
  const { id } = useUserStore();
  const {socket, pushMessage, clearMessage, addRoom } = useChatSocketStore();
  const [conversationMessages, setConversationMessages] = useState<Message[]>([]);
  const { messages } = useChatSocketStore();
  console.log('chatsokcet====', messages);
  // const {rooms} = useChatSocketStore();
  // const axiosPrivate = useAxiosPrivate();
  // console.log('getterofroom', rooms);

  
 console.log('response in chat content == ', response)

 useEffect(() => {
  if (selectedContact && response) {

    const room = response.find(room => room.roomTitle === id + selectedContact.id || room.roomTitle === selectedContact.id + id);
    if (room) {
      setConversationMessages(room.messages);
      console.log('messagesof conver == ', room.messages)
    }
  }
  // else{
  //   setConversationMessages(messages)
  // }
}, [selectedContact, response, userId]);

const handleSendClick = (message: string) => {
  console.log("send to ", userId);
  socket?.emit('dm', { message: message, receiverId: userId });
  pushMessage(message);
  console.log('mymessage', message);
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
