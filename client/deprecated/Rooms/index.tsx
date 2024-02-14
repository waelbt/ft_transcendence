import RoomContent from "../../components/room_componenets/roomcontent/RoomContent"
import RoomInfo from "../../components/room_componenets/roominfo/RoomInfo"
import RoomList from "../../components/room_componenets/roomlist/RoomList";

import "./Room_Body.css";

export function Rooms() {
 

  const roomData = {
    roomName: 'groupe 1',
    roomImage: 'https://cdn.intra.42.fr/users/9ebdebc297c3247c80f670eb54451f8b/sel-ouaf.jpg',
    memberCount: 3,
    members: [
      { id: 1, name: 'Member 1', profileImage: 'https://cdn.intra.42.fr/users/ea4d0a8aa80f54aaf6e2904e00258a09/mannahri.jpg' },
      { id: 2, name: 'Member 2', profileImage: 'https://cdn.intra.42.fr/users/440a1a4a4ffbd36581c07bc5a146e82e/mbouhaba.jpg' },
      { id: 3, name: 'Member 3', profileImage: 'https://cdn.intra.42.fr/users/9ebdebc297c3247c80f670eb54451f8b/sel-ouaf.jpg' },
    ],
  };

  const handleExitRoom = () => {
    // Handle exit room logic here
    console.log('Exiting room');
  };

  return (
    <div className="room_body">
        <RoomList  />
        <RoomContent />
        <RoomInfo
        roomName={roomData.roomName}
        roomImage={roomData.roomImage}
        memberCount={roomData.memberCount}
        members={roomData.members}
        onExitRoom={handleExitRoom}
        />

    </div>
      
  );
}
