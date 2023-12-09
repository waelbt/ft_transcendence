import React, { Component } from "react";
import "./chatBody.css";
import ChatList from "../../components/chat/chatList/ChatList";

// import ChatContent from "../chatContent/ChatContent";
// import UserProfile from "../userProfile/UserProfile";

class ChatBody extends Component {
  render(): JSX.Element {
    return (
      <div className="main__chatbody">
        <ChatList />
        {/* <ChatContent />
        <UserProfile /> */}
      </div>
    );
  }
}

export default ChatBody;
  