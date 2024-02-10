// import React from 'react';
import { IoMdLogOut } from "react-icons/io";
import './RoomInfo.css';

interface Member {
  id: number;
  name: string;
  profileImage: string;
}

interface RoomInfoProps {
  roomName: string;
  roomImage: string;
  memberCount: number;
  members: Member[];
  onExitRoom: () => void;
}

const RoomInfo: React.FC<RoomInfoProps> = ({
  roomName,
  roomImage,
  memberCount,
  members,
  onExitRoom,
}) => {
  return (
    <div className="room-info">
      <center>
      <div className="room-header">
        <img src={roomImage} alt="Room Profile" className="room-profile-image" />
        <div className="room-details">
          <h2>{roomName}</h2>
          <p className="member-count">
            <em>{`${memberCount} members`}</em>
          </p>
        </div>
      </div>
      <div className="members-list">
        {members.map((member) => (
          <div key={member.id} className="member-item">
            <img src={member.profileImage} alt={`${member.name}'s Profile`} className="member-profile-image" />
            <p className="member-name">{member.name}</p>
          </div>
        ))}
      <button onClick={onExitRoom} className="exit-room-button">
        <IoMdLogOut size={50} color="ff0000"/>
        Exit Room
      </button>
      </div>
      </center>
    </div>
  );
};

export default RoomInfo;