import React, { useState, useEffect } from 'react';
import SideBar from '../Component/SideBar/SideBar';
import ChatWindow from '../Component/ChatWindow/ChatWindow';
import DecoyChatWindow from '../Component/ChatWindow/DecoyChatWindow';
import "./MainPage.css";


const getUserNameFromEmail = (email) => {
    if (!email) return "Unknown";
    return email.split('@')[0];
};
export default function MainPage(props) {
    const { setIsLoggedIn, user } = props;
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        if (user) {
            console.log("User email:", user.email);
        } else {
            console.log("User is undefined");
        }
    }, [user]);

    useEffect(() => {
        console.log('useEffect channel:' + selectedChannel)
        console.log('useEffect User:' + selectedUser?.email)
    }, [selectedUser, selectedChannel])
    const userName = getUserNameFromEmail(user?.email);
    return (
        <div className='MainPage'>
            <div className="container">
                <div className="sidebar">
                    <SideBar
                        setIsLoggedIn={setIsLoggedIn}
                        user={user}
                        setSelectedUser={setSelectedUser}
                        userName={userName}
                        setSelectedChannel={setSelectedChannel}
                        setMessages={setMessages}
                    />
                </div>
                <div className="chatWindow">
                    {selectedUser || selectedChannel ? (
                        <ChatWindow user={user}
                                    selectedUser={selectedUser}
                                    selectedChannel={selectedChannel}
                                    setSelectedChannel={setSelectedChannel}
                                    setMessages={setMessages}
                                    messages={messages} />
                    ) : (
                        <DecoyChatWindow /> 
                    )}
                </div>
            </div>
        </div>
    );
}