import './ChatProfile.css';
import  { useState,  useEffect } from 'react';

import contre from '../images/contre.png';
import sortie from '../images/sortie.png';
import interdit from '../images/interdit.png';
import { useChatSocketStore } from '../../../stores/ChatSocketStore';
import useAxiosPrivate from '../../../hooks/axiosPrivateHook';

interface ChatProfileProps {
  selectedContact: Contact | null; 
}

interface Contact {
  avatar: string;
  id: string;
  nickName: string;
  time: string;
}

const ChatProfile: React.FC<ChatProfileProps> = ({ selectedContact }) => {


  return (
    <div className="chat-profile"><center>
      <div className="profile-image">
        <img  src={selectedContact?.avatar} alt={`Profile of ${selectedContact?.nickName}`} />
      </div>
      <div className="user-details">
        <p className="user-name">{selectedContact?.nickName}</p>
      </div>
      <div className="action-buttons">
        
        <div className="challengcontainer" >
          <img  src={contre} alt="vs" width={24}  height={24}/>
          <button className="challenge-button">
          Challenge</button>
        </div>

        <div className="seeprofilecontainer">
          <img  src={sortie} alt="profile" width={24}  height={24}/>
          <button className="see-profile-button">See Profile</button>
        </div>
        
        <div className="blockcontainer">
          <img  src={interdit} alt="profile" width={18}  height={18}/>
          <button className="block-button">Block</button>
        </div>
        
      </div>
      </center>
    </div>
  );
};

export default ChatProfile;