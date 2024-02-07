// Inside ChatContent.tsx
import React, { useState, useEffect } from 'react';
// import { io } from 'socket.io-client';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import './ChatContent.css';
import { useChatSocketStore } from '../../../stores/ChatSocketStore';

// const socket = io('http://localhost:4000/chat');

interface Message {
    isMyMessage: boolean;
    message: string;
}

interface Contact {
    image: string;
    id: number;
    name: string;
    time: string;
}

interface ChatContentProps {
    selectedContact: Contact | null;
}

const ChatContent: React.FC<ChatContentProps> = ({ selectedContact }) => {
    const [selectedContactMessages, setSelectedContactMessages] = useState<
        Message[]
    >([]);
    const { socket, pushMessage } = useChatSocketStore();
    useEffect(() => {
        if (selectedContact) {
            const contactMessages = getMessagesForContact(selectedContact.id);
            setSelectedContactMessages(contactMessages);
        }

        socket?.on('receive_message', (message: string) => {
            pushMessage(message);
            // setSelectedContactMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket?.off('receive_message');
        };
    }, [selectedContact]);

    const handleSendClick = (message: string) => {
        const messageData = { isMyMessage: true, message };
        socket?.emit('message', messageData);
        console.log(message);
    };

    const getMessagesForContact = (contactId: number): Message[] => {
        return [
            { isMyMessage: true, message: 'Hello!' },
            { isMyMessage: false, message: 'How are you?' }
        ];
    };

    return (
        <div className="main__chatcontent">
            <MessageList messages={selectedContactMessages} />
            <div className="content__footer">
                <MessageInput onSendClick={handleSendClick} maxLength={500} />
            </div>
        </div>
    );
};

export default ChatContent;
