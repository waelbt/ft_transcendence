import './ChatProfile.css';
import  { useState,  useEffect } from 'react';

import contre from '../images/contre.png';
import sortie from '../images/sortie.png';
import interdit from '../images/interdit.png';
import { useChatSocketStore } from '../../../stores/ChatSocketStore';
import useAxiosPrivate from '../../../hooks/axiosPrivateHook';

interface ChatProfileProps {
  onContactClick: (contact: Contact) => void;
  selectedContact: Contact | null; 
}

interface Contact {
  avatar: string;
  id: string;
  nickName: string;
  time: string;
}

const ChatProfile: React.FC<ChatProfileProps> = ({ onContactClick, selectedContact }) => {

  // const [contacts, setContacts] = useState<Contact[]>([]);
  // const axiosPrivate = useAxiosPrivate();
  // useEffect(() => {
  //   // Fetch backend endpoint when the component mounts
  //   fetchUserData();
  // }, []);

  // const fetchUserData = async () => {
  //   try {
      
  //     const response = await axiosPrivate.get('/chat/mydms');
  //     console.log('response', response.data)
  //     const newContacts: Contact[] = [];
  //     response.data.forEach((room: any) => {
  //       const users = room.users;
  //       users.forEach((user: any) => {
  //         const contact: Contact = {
  //           avatar: user.avatar,
  //           id: user.id,
  //           nickName: user.nickName,
  //           time: user.time 
  //         };
  //         console.log('contact.nickName= ', contact.nickName)
  //         newContacts.push(contact);
  //       });
  //     });
  //     setContacts(newContacts);
  //   } catch (error) {
  //     console.error('Error fetching contacts:', error);
      
  //   }
  // };

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