import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../Constants/Constants';
import UserServices from '../Services/UserServices';
import './ChatWindow.css';
function ChatWindow(props) {
    const [show, setShow] = useState(false);
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);
    const { user, selectedUser } = props;
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const fetchMessages = async () => {
        if (selectedUser) {
            const fetchedMessages = await UserServices.fetchMessages(user, selectedUser);
            setMessages(fetchedMessages);
        }
    };
    useEffect(() => {
        fetchMessages();
    }, [selectedUser]);
    const handleSendMessage = async () => {
        if (!text.trim()) {
            return;
        }
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
        try {
            const response = await axios.post(`${API_URL}/messages`, messageData, { headers });
            if (response.status === 200) {
                const newMessage = response.data.data;
                setMessages(prevMessages => [...prevMessages, newMessage]);
                setText('');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Unauthorized: Invalid or expired token');
            } else {
                console.error('Failed to send message:', error);
            }
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
                <span>{selectedUser?.email}</span>
                <div className="chatIcons">
                    <i className="bi bi-camera-video-fill"></i>
                    <i className="bi bi-person-add"></i>
                    <i className="bi bi-three-dots" onClick={handleShow}></i>
                </div>
            </div>
            <div className='messagesContainer'>
                {messages && messages.map((message, index) => (
                    <div key={index} className={message.sender?.email === user.email ? 'messagesOwn' : 'messages'}>
                        <div className='texts'>
                            <p><strong>{getUserNameFromEmail(message.sender?.email)}:</strong> {message.body}</p>
                            <span>{new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
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
                        <p>{selectedUser?.email}</p>
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