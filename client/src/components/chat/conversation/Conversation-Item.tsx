

import './Conversation-Item.css';

// const ConversationItem = (props) => {
//     let className = 'conversation';

//     if (props.isActive) {
//         className += ' active';
//     }

//     return (
//         <div className={className}>
//             <img src={props.conversation.imageUrl} alt={props.conversation.imageAlt} />
//             <div className="title-text">{props.conversation.title}</div>
//             <div className="created-date">{props.conversation.createdAt}</div>
//             <div className="conversation-message">
//                 {props.conversation.latestMessageText}
//             </div>
//         </div>
//     );
// }

// export default ConversationItem;


interface ConversationItemProps {
    conversation: {
      imageUrl: string | null;
      imageAlt: string | null;
      title: string;
      createdAt: string;
      latestMessageText: string;
    };
    isActive: boolean;
  }
  
  const ConversationItem: React.FC<ConversationItemProps> = ({ conversation, isActive }) => {
    let className = 'conversation';
  
    if (isActive) {
      className += ' active';
    }
  
    return (
      <div className={className}>
        <img src={conversation.imageUrl || undefined} alt={conversation.imageAlt || undefined} />
        <div className="title-text">{conversation.title}</div>
        <div className="created-date">{conversation.createdAt}</div>
        <div className="conversation-message">
          {conversation.latestMessageText}
        </div>
      </div>
    );
  };

  export default ConversationItem;