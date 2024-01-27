import './chatBody.css';
import ChatList from '../../components/chat/chatList/ChatList';
import ChatContent from '../../components/chat/chatcontent/ChatContent';
import ChatProfile from '../../components/chat/chatprofile/ChatProfile';

export function Chat() {
    const handleSearch = (searchText: string) => {
        // Your search logic here
        // console.log(`Searching for: ${searchText}`);
    };
    return (
        <div className="main__chatbody">
            <ChatList onSearch={handleSearch} />
            <ChatContent />
            <ChatProfile />
        </div>
    );
}
