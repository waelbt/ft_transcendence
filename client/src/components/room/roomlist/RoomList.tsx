import  { useState, ChangeEvent } from 'react';
import { IoMdAddCircle } from "react-icons/io";
import "./RoomList.css";


interface SearchBarProps {
  onSearch: (searchText: string) => void;
}

const RoomList: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchText, setSearchText] = useState<string>("");
  
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
      // You can also perform the search in real-time here if needed
      onSearch(e.target.value);
    };

    const contacts: Contactr[] = [
        {
          image:
          "https://cdn.intra.42.fr/users/9ebdebc297c3247c80f670eb54451f8b/sel-ouaf.jpg",
          id: 1,
          name: "groupe1",
          time: '09:45',
        },
        {
          image:
            "https://cdn.intra.42.fr/users/440a1a4a4ffbd36581c07bc5a146e82e/mbouhaba.jpg",
          id: 2,
          name: "groupe2",
          time: '09:45',
        },
        {
          image:
            "https://cdn.intra.42.fr/users/ea4d0a8aa80f54aaf6e2904e00258a09/mannahri.jpg",
          id: 3,
          name: "groupe",
          time: '09:45',
        },
        {
          image:
          "https://cdn.intra.42.fr/users/a940f4bad2520efbf56a12ef2190d7b5/waboutzo.jpg",
          id: 4,
          name: "groupe",
          time: '09:45',
        },
        {
          image:
           "https://cdn.intra.42.fr/users/7d6ece176a0ad174e2b3aa903ba9418b/arahmoun.JPG",
          id: 4,
          name: "groupe",
          time: '09:45',
        },
        {
          image:
          "https://cdn.intra.42.fr/users/a940f4bad2520efbf56a12ef2190d7b5/waboutzo.jpg",
          id: 5,
          name: "groupe",
          time: '09:45',
        },
        {
          image:
          "https://cdn.intra.42.fr/users/a940f4bad2520efbf56a12ef2190d7b5/waboutzo.jpg",
          id: 4,
          name: "groupe",
          time: '09:45',
        },
        {
          image:
           "https://cdn.intra.42.fr/users/7d6ece176a0ad174e2b3aa903ba9418b/arahmoun.JPG",
          id: 4,
          name: "groupe",
          time: '09:45',
        },
      ];

    return (
        <div className="main__roomlist">
          <div className="room_search">
            <div className="Room-search-bar">
              <input
                type="text"
                placeholder="Search"
                value={searchText}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="conversation-room">
                  {contacts.map((contactr) => (
              <div key={contactr.id} className="conversation-room-item">
                  <img src={contactr.image} alt={contactr.name} />
                <div>
                  <p>{contactr.name}</p>
                  <p> {contactr.time}</p>
                </div>
              </div>))}  
              <div className="create_room">
                <button className='addplus'>
                <IoMdAddCircle size={50} color="55c255"/>
                </button>
              </div>
          </div>
        </div>
      );

}  

export default RoomList;