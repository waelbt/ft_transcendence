// import React from 'react';
// import "./MessageList.css";
// import { useUserStore } from '../../../stores/userStore';
// import { useChatSocketStore } from '../../../stores/ChatSocketStore';
// import "./MessageList.css";

// interface Message {
//     message: string;
//   }
  
//   const MessageList = () => {
//       const { messages } = useChatSocketStore()
//       console.log('messagelist')
//       return (
//           <div id="chat-message-list">
//             {messages.map((message, index) => (
//                 <div key={index} >
//                   {message.message} 
//                 </div>
//               ))}
//             </div>
        
//           );
//         };
        
// export default MessageList;
        
        
        
// import React from 'react';
// import "./MessageList.css";
// // import { useUserStore } from '../../../stores/userStore';
// import { useChatSocketStore } from '../../../stores/ChatSocketStore';


// interface Message {
//   message: string;
//   senderId: string;
//   receiverId: string;
//   timestamp: string;
// }

// interface MessageListProps {
//   messages: Message[];
// }

// const MessageList: React.FC = () => {
//   // const { id } = useUserStore();
//   const {messages} = useChatSocketStore()
//   // console.log('messages in messageslist = ', messages);


//   return (
//     <div className="message-list">
//       {messages && messages.map((message, index) => (
//         //  ${message.senderId === id ? 'my-message' : 'other-message'}
//         <div key={index} className={`message-item`}>
//           <p>{message.message}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MessageList;

