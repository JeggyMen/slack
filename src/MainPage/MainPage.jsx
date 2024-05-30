import React from 'react'
import SideBar from '../Component/SideBar/SideBar'
import ChatWindow from '../Component/ChatWindow/ChatWindow'
import "./MainPage.css"

export default function MainPage(props) {
  const { setIsLoggedIn, user } = props;

  return (
    <div className='MainPage'>
        <div className="container">
            <div className="sidebar">
                <SideBar setIsLoggedIn={setIsLoggedIn} user={user} />
            </div>
            <div className="chatWindow">
                <ChatWindow />
            </div>
        </div>
    </div>
  )
}
