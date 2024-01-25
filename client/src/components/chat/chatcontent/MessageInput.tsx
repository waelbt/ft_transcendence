import React, { useState, ChangeEvent } from 'react';
import { IoSend } from 'react-icons/io5';
import { BsEmojiSmile } from 'react-icons/bs';

interface MessageInputProps {
  onSendClick: (message: string) => void;
  maxLength: number;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendClick, maxLength }) => {
  const [currentMessage, setCurrentMessage] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputMessage = e.target.value.slice(0, maxLength);
    setCurrentMessage(inputMessage);
  };

  const handleSendClick = () => {
    onSendClick(currentMessage);
    setCurrentMessage('');
  };

  const handleEmojiClick = () => {
    console.log('Emoji button clicked!');
  };

  return (
    <div className="sendNewMessage">
      <input
        type="text"
        placeholder="Type a message here"
        value={currentMessage}
        onChange={handleInputChange}
        maxLength={maxLength}
      />
      <button className="emoji" onClick={handleEmojiClick}>
        <BsEmojiSmile size={24} />
      </button>
      <button onClick={handleSendClick}>
        <IoSend size={24} color="#007bff" />
      </button>
    </div>
  );
};

export default MessageInput;