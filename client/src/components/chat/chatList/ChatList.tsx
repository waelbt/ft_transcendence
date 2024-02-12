import  { useState, ChangeEvent, useEffect } from 'react';
import "./ChatList.css";
import { CiSearch } from "react-icons/ci";
// import { useChatSocketStore } from '../../../stores/ChatSocketStore';
import useAxiosPrivate from '../../../hooks/axiosPrivateHook';


interface ChatListProps {
  onSearch: (searchText: string) => void;
  onContactClick: (contact: Contact) => void;
  contacts: Contact[];
}

interface Contact {
  avatar: string;
  id: string;
  nickName: string;
  time: string;
}

const ChatList: React.FC<ChatListProps> = ({ contacts, onSearch, onContactClick}) => {
  const [searchText, setSearchText] = useState<string>("");
  // const {socket, pushMessage } = useChatSocketStore();    
  const axiosPrivate = useAxiosPrivate();

  console.log('contacts chatlist == ', contacts)
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="main__chatlist">
      <div className="chatlist_search">
        <div className="search-bar">
          <CiSearch className="icon"/>
          <input
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={handleInputChange}
          />
        </div>
        <div className="image-list-container" >

          <div className="circular-image">
            <img src="https://cdn.intra.42.fr/users/440a1a4a4ffbd36581c07bc5a146e82e/mbouhaba.jpg" alt="Image 1" />
          </div>

          <div className="circular-image">
            <img src="https://cdn.intra.42.fr/users/7d6ece176a0ad174e2b3aa903ba9418b/arahmoun.JPG" alt="Image 2" />
          </div>

          <div className="circular-image">
            <img src="https://cdn.intra.42.fr/users/ea4d0a8aa80f54aaf6e2904e00258a09/mannahri.jpg" alt="Image 3" />
          </div>

          <div className="circular-image">
            <img src="https://cdn.intra.42.fr/users/a940f4bad2520efbf56a12ef2190d7b5/waboutzo.jpg" alt="Image 3" />
          </div>

          <div className="circular-image">
            <img src="https://cdn.intra.42.fr/users/9ebdebc297c3247c80f670eb54451f8b/sel-ouaf.jpg" alt="Image 3" />
          </div>

          <div className="circular-image">
            <img src="https://cdn.intra.42.fr/users/a940f4bad2520efbf56a12ef2190d7b5/waboutzo.jpg" alt="Image 3" />
          </div>

          <div className="circular-image">
            <img src="https://cdn.intra.42.fr/users/440a1a4a4ffbd36581c07bc5a146e82e/mbouhaba.jpg" alt="Image 1" />
          </div>

          <div className="circular-image">
            <img src="https://cdn.intra.42.fr/users/9ebdebc297c3247c80f670eb54451f8b/sel-ouaf.jpg" alt="Image 3" />
          </div>

        </div>
        {/* <hr/>     */}
      </div>
      <div className="conversation">
        {contacts.map((contact) => (
            <div
              key={contact.id}
              className="conversation-item"
              onClick={() => onContactClick(contact)}
            >
              <img src={contact.avatar} alt={contact.nickName} />
              <div>
                <p>{contact.nickName}</p>
                <p>{contact.time}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatList;



