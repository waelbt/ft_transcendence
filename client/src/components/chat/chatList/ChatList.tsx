import React, { Component } from "react";
import "./ChatList.css";

// import ChatListItems from "./ChatListItems";

interface ChatUser {
  image: string;
  id: number;
  name: string;
  active: boolean;
  isOnline: boolean;
}

interface ChatListState {
  allChats: ChatUser[];
}

export default class ChatList extends Component<{}, ChatListState> {
 
  render() {
    return (
      <div className="main__chatlist">
        <div className="chatList__search">
          <div id="search-container">
            <input type="text" placeholder="Search" />
          </div>
          
        </div>
      </div>
    );
  }
}