
import React, { useState, useEffect } from "react";
// import { IoSend } from "react-icons/io5";
// import { BsEmojiSmile } from "react-icons/bs";
import { io } from "socket.io-client";
// import WebSocket from "./WebSocket.tsx";
import MessageRoom from "./MessageRoom";
import MessageInput from "../../chat/chatcontent/MessageInput";
import "./RoomContent.css";

const socket = io('http://localhost:4000/chat');

export const RoomContent: React.FC = () => {

  // const [meassages, setCurrentmsg] = useState("");

  const [messages, setMessages] = useState([
    // { isMyMessage: true, message: 'mlk!' },
    // { isMyMessage: false, message: 'groupe!' },
    // { isMyMessage: true, message: 'dekhlni' },
    // { isMyMessage: false, message: 'no thanks' },
    // { isMyMessage: true, message: 'ttle3niii' },
    { id: 1, senderName: 'Sender 1', senderImage: "https://cdn.intra.42.fr/users/9ebdebc297c3247c80f670eb54451f8b/sel-ouaf.jpg", isMyMessage: false, message: 'orem Ipsum is simply dummy text of the printing a' },
    { id: 2, senderName: 'Sender 2', senderImage: "https://cdn.intra.42.fr/users/9ebdebc297c3247c80f670eb54451f8b/sel-ouaf.jpg", isMyMessage: true, message: 'orem Ipsum is simply dummy text of the printing a' },
    { id: 3, senderName: 'Sender 1', senderImage: "https://cdn.intra.42.fr/users/9ebdebc297c3247c80f670eb54451f8b/sel-ouaf.jpg", isMyMessage: false, message: 't9sser' },

  ]);

  useEffect(() => {
    socket.on("rcv_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("rcv_message");
    };
  }, []);

  const handleSendClick = (message: string) => {
    const messageData = { isMyMessage: true, message };
    socket.emit('messageroom', messageData);
  };

  return (
    <div className="roomcontent">
      <MessageRoom messages={messages} />
      <div className="footer-room">
      <MessageInput onSendClick={handleSendClick} maxLength={500} />
      </div>
    </div>
  );
};

export default RoomContent;