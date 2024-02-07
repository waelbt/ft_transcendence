import  { useState } from 'react';
import "./chatBody.css";
import ChatList from "../../components/chat/chatList/ChatList";
import ChatContent from "../../components/chat/chatcontent/ChatContent";
import ChatProfile from "../../components/chat/chatprofile/ChatProfile";


interface Contact {
  image: string;
  id: number;
  name: string;
  time: string;
}

export function Chat()  {

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleSearch = (searchText: string) => {
    // apah
    console.log(`Searching for: ${searchText}`);
  };

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
  };

  return (
    <div className="main__chatbody">
      <ChatList onSearch={handleSearch} onContactClick={handleContactClick} selectedContact={selectedContact} />
      <ChatContent selectedContact={selectedContact}/>
      <ChatProfile userProfileImage="https://cdn.intra.42.fr/users/440a1a4a4ffbd36581c07bc5a146e82e/mbouhaba.jpg" userName="Dos os" />
    </div>
  );
}
