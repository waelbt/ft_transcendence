import React, { useState, useEffect } from 'react';
import MessageInput from './MessageInput';
import './ChatContent.css';
import { useChatSocketStore } from '../../../stores/ChatSocketStore';
import { useUserStore } from '../../../stores/userStore';
import { useParams } from 'react-router-dom';
import contre from '../images/contre.png';
import sortie from '../images/sortie.png';
import interdit from '../images/interdit.png';
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
      // room.messages.forEach((message: any) => {
      //     pushMessage(message.message);
      //   });
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
      <div className="chat-profile"> <center>
      <div className="profile-image">
        {room && room.users.map((user, index) => (
          user.id !== userId && (
            <div key={index} className="user-profile">
              <img src={user.avatar} alt={`Profile of ${user.name}`} />
              <p className="user-name">{user.nickName}</p>
            </div>
          )
        ))}
      </div>
        {/* <div className="user-details">
          <p className="user-name">maryam</p>
        </div> */}
        <div className="action-buttons">
          
          <div className="challengcontainer" >
            <img  src={contre} alt="vs" width={35}  height={35}/>
            <button className="challenge-button">
            Challenge</button>
          </div>

          <div className="seeprofilecontainer">
            <img  src={sortie} alt="profile" width={35}  height={35}/>
            <button className="see-profile-button">See Profile</button>
          </div>
          
          <div className="blockcontainer">
            <img  src={interdit} alt="profile" width={25}  height={25}/>
            <button className="block-button">Block</button>
          </div>
          
        </div>
      </center>
      </div>
      <div className="content__footer">
        <MessageInput onSendClick={handleSendClick} maxLength={500} />
      </div>
    </div>
  );
};
