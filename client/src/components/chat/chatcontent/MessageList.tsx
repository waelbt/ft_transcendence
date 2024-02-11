
import "./MessageList.css";
import { useChatSocketStore } from '../../../stores/ChatSocketStore';

interface Message {
  message: string;
}

const MessageList = () => {
  const { messages } = useChatSocketStore()
  console.log('messagelist')
  return (
    <div id="chat-message-list">
      {messages.map((message, index) => (
        <div key={index} >
          {message.message} 
        </div>
      ))}
    </div>
  
  );
};

export default MessageList;


