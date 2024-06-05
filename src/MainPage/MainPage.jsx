import React, { useState } from 'react';
import SideBar from '../Component/SideBar/SideBar';
import ChatWindow from '../Component/ChatWindow/ChatWindow';
import "./MainPage.css";
export default function MainPage(props) {
    const { setIsLoggedIn, user } = props;
    const [selectedUser, setSelectedUser] = useState(null);
    return (
        <div className='MainPage'>
            <div className="container">
                <div className="sidebar">
                    <SideBar setIsLoggedIn={setIsLoggedIn} user={user} setSelectedUser={setSelectedUser} />
                </div>
                <div className="chatWindow">
                    {selectedUser && <ChatWindow user={user} selectedUser={selectedUser} />}
                </div>
            </div>
        </div>
    );
}