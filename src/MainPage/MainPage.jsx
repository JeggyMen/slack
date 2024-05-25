import React from 'react'
import SideBar from '../Component/SideBar/SideBar'
import ChatWindow from '../Component/ChatWindow/ChatWindow'
import "./MainPage.css"

export default function MainPage() {
  return (
    <div className='MainPage'>
        <div className="container">
            <div className="sidebar">
                <SideBar />
            </div>
            <div className="chatWindow">
                <ChatWindow />
            </div>
        </div>
    </div>
  )
}
