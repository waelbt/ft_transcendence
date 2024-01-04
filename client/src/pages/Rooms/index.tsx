
import RoomList from "../../components/room/roomlist/RoomList"

import "./Room_Body.css";

export function Rooms() {

  
  const handleSearch = (searchText: string) => {
    // Your search logic here
    console.log(`Searching for: ${searchText}`);
  };

  return (
    <div className="room_body">
        <RoomList onSearch={handleSearch} />
        {/* <RoomContent /> */}

    </div>
      
  );
}
  