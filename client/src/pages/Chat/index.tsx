import React, { useState, useEffect } from 'react';
import "./chatBody.css";
import ChatList from "../../components/chat/chatList/ChatList";
import ChatProfile from "../../components/chat/chatprofile/ChatProfile";
import ChatContent from '../../components/chat/chatcontent/ChatContent';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { useChatSocketStore } from '../../stores/ChatSocketStore';
import useAxiosPrivate from '../../hooks/axiosPrivateHook';

interface Contact {
  avatar: string;
  id: string;
  nickName: string;
  time: string;
}

export function Chat()  {
  const { userId } = useParams();
  console.log('userparam', userId)
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null); // State to hold the selected contact
  const [response, setResponse] = useState<any>(null);
  const navigate = useNavigate();
  const {socket, pushMessage, clearMessage } = useChatSocketStore();    
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    fetchdms();
  }, []);

  const handleSearch = (searchText: string) => {
    console.log(`Searching for: ${searchText}`);
  };
  
  const handleContactClick = (contact: Contact) => {
    // setSelectedContact(contact); 
    navigate(`content/${contact.id}`);
  };

  const fetchdms = async () => {
    try {
      
      const response = await axiosPrivate.get('/chat/mydms');
      console.log("reeeesssss = ", response)
      setResponse(response.data); 
      const newContacts: Contact[] = [];
      response.data.forEach((room: any) => {
        const users = room.users;
        users.forEach((user: any) => {
          const contact: Contact = {
            avatar: user.avatar,
            id: user.id,
            nickName: user.nickName,
            time: user.time 
          };
          console.log('contact.nickName= ', contact.id)
          newContacts.push(contact);
        });
      });
      setContacts(newContacts);
    } catch (error) {
      console.error('Error fetching mydms:', error);
    }
  };

  return (
    <div className="main__chatbody">
      <ChatList contacts={contacts} onSearch={handleSearch} onContactClick={handleContactClick} />
      <Outlet/> 
      {/* <ChatContent response={response} userId={userId} selectedContact={selectedContact}/>
      <ChatProfile selectedContact={selectedContact} />  */}
    </div>
  );
}

export default Chat;
