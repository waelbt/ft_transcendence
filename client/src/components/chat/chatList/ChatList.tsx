import  { useState, ChangeEvent } from 'react';
import "./ChatList.css";
import { CiSearch } from "react-icons/ci";


interface SearchBarProps {
  onSearch: (searchText: string) => void;
}
interface Contact {
  image: string;
  id: number;
  name: string;
  time: string;
}

const ChatList: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState<string>("");
  // const [containerColor, setContainerColor] = useState<string>('red');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    // You can also perform the search in real-time here if needed
    onSearch(e.target.value);
  };

  // const changeColor = (color: string) => {
  //   setContainerColor(color); // Change the container color on click
  // };

    const contacts: Contact[] = [
    {
      image:
      "https://cdn.intra.42.fr/users/9ebdebc297c3247c80f670eb54451f8b/sel-ouaf.jpg",
      id: 1,
      name: "mehdi sla dz",
      time: '09:45',
    },
    {
      image:
        "https://cdn.intra.42.fr/users/440a1a4a4ffbd36581c07bc5a146e82e/mbouhaba.jpg",
      id: 2,
      name: "simo",
      time: '09:45',
    },
    {
      image:
        "https://cdn.intra.42.fr/users/ea4d0a8aa80f54aaf6e2904e00258a09/mannahri.jpg",
      id: 3,
      name: "wae",
      time: '09:45',
    },
    {
      image:
      "https://cdn.intra.42.fr/users/a940f4bad2520efbf56a12ef2190d7b5/waboutzo.jpg",
      id: 4,
      name: "soufiane",
      time: '09:45',
    },
    {
      image:
       "https://cdn.intra.42.fr/users/7d6ece176a0ad174e2b3aa903ba9418b/arahmoun.JPG",
      id: 4,
      name: "yyy",
      time: '09:45',
    },
    {
      image:
      "https://cdn.intra.42.fr/users/a940f4bad2520efbf56a12ef2190d7b5/waboutzo.jpg",
      id: 5,
      name: "soufiane",
      time: '09:45',
    },
    {
      image:
       "https://cdn.intra.42.fr/users/7d6ece176a0ad174e2b3aa903ba9418b/arahmoun.JPG",
      id: 4,
      name: "yyy",
      time: '09:45',
    },
    {
      image:
      "https://cdn.intra.42.fr/users/a940f4bad2520efbf56a12ef2190d7b5/waboutzo.jpg",
      id: 4,
      name: "soufiane",
      time: '09:45',
    },
    {
      image:
        "https://cdn.intra.42.fr/users/ea4d0a8aa80f54aaf6e2904e00258a09/mannahri.jpg",
      id: 3,
      name: "wae",
      time: '09:45',
    },
  ];

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
        <div key={contact.id} className="conversation-item"  >
           
          <img src={contact.image} alt={contact.name} />
          <div>
            <p>{contact.name}</p>
            <p> {contact.time}</p>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default ChatList;