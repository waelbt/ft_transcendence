import ConversationSearch from '../../components/chat/conversation/Conversation-Search';
import ConversationList from '../../components/chat/conversation/Conversation-List.tsx';
import NewConversation from '../../components/chat/conversation/New-Conversation';
import ChatTitle from '../../components/chat/chat-title/Chat-Title';
import MessageList from '../../components/chat/message/Message-List';
import ChatForm from '../../components/chat/chat-form/Chat-Form';
import {
    conversations,
    selectedConversation
} from '../../components/chat/data/conversations';
import { messages } from '../../components/chat/data/messages';

import './Chat-Shell.css';

export function Chat() {
    return (
        <div id="chat-container">
            <ConversationSearch />
            <ConversationList conversations={conversations} />
            <NewConversation />
            <ChatTitle selectedConversation={selectedConversation} />
            <MessageList messages={messages} />
            <ChatForm />
        </div>
    );
}
