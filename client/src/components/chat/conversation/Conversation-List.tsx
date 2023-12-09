

import ConversationItem from './Conversation-Item.tsx';
import './Conversation-List.css';

// const ConversationList = (props) => {
//     const selectedConversationIndex = 0;
//     const conversationItems = props.conversations.map((conversation, index) => {
//         return <ConversationItem 
//             key={index}
//             isActive={index === selectedConversationIndex }
//             conversation={conversation} />;
//     });

//     return (
//         <div id="conversation-list">
//             {conversationItems}
//         </div>
//     );
// }

// export default ConversationList;


interface ConversationListProps {
    conversations: {
      imageUrl: string | null;
      imageAlt: string | null;
      title: string;
      createdAt: string;
      latestMessageText: string;
    }[];
  }
  
  const ConversationList: React.FC<ConversationListProps> = (props) => {
    const selectedConversationIndex = 0;
    const conversationItems = props.conversations.map((conversation, index) => (
      <ConversationItem
        key={index}
        isActive={index === selectedConversationIndex}
        conversation={conversation}
      />
    ));
  
    return (
      <div id="conversation-list">
        {conversationItems}
      </div>
    );
  };
  
  export default ConversationList;