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
    useEffect(() => {
        if (user) {
            console.log("User email:", user.email);
        } else {
            console.log("User is undefined");
        }
    }, [user]);
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
                    />
                </div>
                <div className="chatWindow">
                    {selectedUser ? (
                        <ChatWindow user={user} selectedUser={selectedUser} />
                    ) : (
                        <DecoyChatWindow /> 
                    )}
                </div>
            </div>
        </div>
    );
}