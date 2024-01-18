import trashlogo from '../images/icons/trash-logo.svg';

import './Chat-Title.css';

// const ChatTitle = (props) => {
//     return (
//         <div id="chat-title">
//             <span>{props.selectedConversation.title}</span>
//             <img src={trashlogo} alt="Delete Conversation" />
//         </div>
//     );
// }

// export default ChatTitle;



interface ChatTitleProps {
    selectedConversation: {
      title: string;
      
      // Add other properties as needed
    };
  }
  
  const ChatTitle: React.FC<ChatTitleProps> = (props) => {
    return (
      <div id="chat-title">
        <span>{props.selectedConversation.title}</span>
        <img src={trashlogo} alt="Delete Conversation" />
      </div>
    );
  };
  
  export default ChatTitle;