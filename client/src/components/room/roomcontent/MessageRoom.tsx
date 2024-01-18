import React from 'react';
import './RoomContent.css';

interface Message {
  id: number;
  senderName: string;
  senderImage: string;
  message: string;
  isMyMessage: boolean;
}

interface MessageListProps {
  messages: Message[];
}

const RoomContent: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div id="room-message">
      {messages.map((message) => (
        <div key={message.id} className={message.isMyMessage ? 'my-msg' : 'others-msg'}>
          {!message.isMyMessage && (
            <>
              <img src={message.senderImage} alt={message.senderName} />
              <div>
                <div>
                  <p className="sender-name">{message.senderName}</p>
                </div>
                <div>
                    <p className="message-text">{message.message}</p>
                </div>
              </div>
            </>
          )}
          {message.isMyMessage && (
           <div>
               <p className="mymessage-text">{message.message}</p>
          </div>
          )}
        </div>
      ))}
    </div>
  );
};
export default RoomContent;
