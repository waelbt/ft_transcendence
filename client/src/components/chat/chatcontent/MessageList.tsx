import React from 'react';
import "./MessageList.css";

interface Message {
  isMyMessage: boolean;
  message: string;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div id="chat-message-list">
      {messages.map((message, index) => (
        <div key={index} className={message.isMyMessage ? 'my-message' : 'other-message'}>
          {message.message}
        </div>
      ))}
    </div>
  );
};

export default MessageList;