import React, { useState, useEffect } from 'react';
import MessageInput from './MessageInput';
import './ChatContent.css';
import { useChatSocketStore } from '../../../stores/ChatSocketStore';
import { useUserStore } from '../../../stores/userStore';
import { useParams } from 'react-router-dom';

// interface Contact {
//   image: string;
//   id: string;
//   name: string;
//   time: string;
// }

interface Message {
  message: string;
  senderId: string;
  receiverId: string;
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

export const ChatContent: React.FC = () => {
  const { id } = useParams();
  const { id: userId } = useUserStore();
  const { socket } = useChatSocketStore();
  const [room, setRoom] = useState<Room | null>(null);



  useEffect(() => {
    socket?.emit('checkDm', { friendId: id });
    const handleCheckDM = (room: Room) => {
      console.log('Received room:', room);
      console.log('loooooooooooooog', room.id)
      setRoom(room); 
    };

    socket?.on('checkDM', handleCheckDM);

    return () => {
      socket?.off('checkDM', handleCheckDM);
    };
  }, [id, socket]);

  const handleSendClick = (message: string) => {
    socket?.emit('dm', { message: message, receiverId: userId });
  };

  return (
    <div className="main__chatcontent">
      <div className="message-list">
        {room &&
          room.messages.map((message, index) => (
            <div key={index} className={`message-item ${message.senderId === userId ? 'my-message' : 'other-message'}`}>
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
