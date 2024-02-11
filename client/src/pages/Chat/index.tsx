import  { useState } from 'react';
import "./chatBody.css";
import ChatList from "../../components/chat/chatList/ChatList";
import ChatProfile from "../../components/chat/chatprofile/ChatProfile";
import ChatContent from '../../components/chat/chatcontent/ChatContent';
import { useParams } from 'react-router-dom';
import { useChatSocketStore } from '../../stores/ChatSocketStore';
import { useNavigate } from 'react-router-dom';

interface Contact {
  image: string;
  id: string;
  name: string;
  time: string;
}

export function Chat()  {

  const { userId } = useParams();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const navigate = useNavigate();
  const {socket, pushMessage, clearMessage } = useChatSocketStore();    

  const handleSearch = (searchText: string) => {
    console.log(`Searching for: ${searchText}`);
  };

  const handleContactClick = (contact: Contact) => {
    // clearMessage();
    setSelectedContact(contact);
    navigate(`/chat/${contact.id}`);
  };

  return (
    <div className="main__chatbody">
      <ChatList onSearch={handleSearch} onContactClick={handleContactClick} selectedContact={selectedContact} />
      <ChatContent userId={userId} selectedContact={selectedContact}/>
      <ChatProfile onContactClick={handleContactClick} selectedContact={selectedContact}  />
    </div>
  );
}