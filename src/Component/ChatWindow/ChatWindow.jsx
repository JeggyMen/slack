import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../Constants/Constants';
import UserServices from '../Services/UserServices';
import ChannelServices from '../Services/ChannelServices';
import './ChatWindow.css';

function ChatWindow({ user, selectedUser, selectedChannel, messages, setMessages }) {
    const [show, setShow] = useState(false);
    const [text, setText] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchMessages = async () => {
        try {
            let fetchedMessages = [];
            if (selectedUser) {
                fetchedMessages = await UserServices.fetchMessages(user, selectedUser);
            } else if (selectedChannel) {
                fetchedMessages = await ChannelServices.fetchChannelMessages(user, selectedChannel.id);
            }
            setMessages(fetchedMessages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };
    useEffect(() => {
        fetchMessages();
    }, [selectedUser, selectedChannel]);

    const handleSendMessage = async () => {
        if (!text.trim()) {
            return;
        }
        const newMessage = {
            sender: user,  
            body: text,
            created_at: new Date().toISOString(), 
        };
        setMessages(prevMessages => [...prevMessages, newMessage]); 
        setText('');
        try {
            if (selectedUser) {
                const messageData = {
                    receiver_id: selectedUser.id,
                    receiver_class: 'User',
                    body: text,
                };
                const headers = {
                    'access-token': user.accessToken,
                    'client': user.client,
                    'expiry': user.expiry,
                    'uid': user.uid,
                };
                const response = await axios.post(`${API_URL}/messages`, messageData, { headers });
                if (response.status !== 200) {
                    console.error('Failed to send message:', response.statusText);
                }
            } else if (selectedChannel) {
                const messageInfo = {
                    channel_id: selectedChannel.id,
                    body: text,
                };
                const newMessage = await ChannelServices.sendChannelMessage(user, messageInfo);
                if (!newMessage) {
                    console.error('Failed to send channel message');
                }
            }
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    const getUserNameFromEmail = (email) => {
        if (!email) return "";
        const userName = email.split('@')[0];
        return userName.split('.')[0];
    };

    return (
        <div className='ChatWindow'>
            <div className="chatInfo">
                <span>{selectedUser?.email || selectedChannel?.name}</span>
                <div className="chatIcons">
                    <i className="bi bi-camera-video-fill"></i>
                    <i className="bi bi-person-add"></i>
                    <i className="bi bi-three-dots" onClick={handleShow}></i>
                </div>
            </div>
            <div className='messagesContainer'>
                {messages && messages.map((message, index) => (
                    <div key={index} className={message.sender && message.sender.email === user.email ? 'messagesOwn' : 'messages'}>
                        <div className='texts'>
                            <p><strong>{message.sender ? getUserNameFromEmail(message.sender.email) : getUserNameFromEmail(user.email)}</strong> {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            <span>{message.body}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className='input'>
                <input
                    type="text"
                    className="inputArea"
                    placeholder='Type something...'
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chat Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h5>Chat with</h5>
                        <p>{selectedUser?.email || selectedChannel?.name}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ChatWindow;
