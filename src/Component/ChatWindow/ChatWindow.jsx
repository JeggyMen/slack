import React from 'react'
import"./ChatWindow.css"
import Messages from '../Messages/Messages';
import Input from "../Input/Input"

 function ChatWindow() {
  return (
    <div className='ChatWindow'>
      <div className="chatInfo">
        <span>Johnneil</span>
        <div className="chatIcons">
        <i className="bi bi-camera-video-fill "></i>
        <i className="bi bi-person-add"></i>
        <i className="bi bi-three-dots"></i>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default ChatWindow;
