import React, { useContext, useState , useEffect} from 'react';
import "./ChatWindow.css";
import { Modal, Button } from 'react-bootstrap';
import { API_URL } from '../Constants/Constants';
import axios from 'axios';
import ChatContext from '../Context/chatContext';
import SessionContext from '../Context/SessionContext';
import { MessageContext } from '../Context/MessageContext';

function ChatWindow(props) {
    const [show, setShow] = useState(false);
    const { userList } = props;
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [text, setText] = useState("");

    const MessageDisplay = () =>{
        const { session } = useContext(SessionContext);
        const { chat } = useContext(ChatContext);
        const { messages, setMessages } = useContext(MessageContext);
        const {toggleMessage, setToggleMessage} = useState(false);
    

    const fetchMessages = async() => {
        const endpoint = `${API_URL}/messages?reciever_id=${chat.id}&receiver_class=${chat.type}`
        const headers = {
            'access-token': session.accessToken,
            'client': session.client,
            'expiry': session.expiry,
            'uid': session.uid,
        };
        try {
            const response = await axios.get(endpoint, { headers });
        
            if (response.status === 200) {
              setMessages(response.data.data);
            } else {
              console.log('Failed to fetch messages:', response.statusText);
            }
          } catch (error) {
            console.error('Error fetching messages:', error);
          }

    };
    useEffect(() => {
        chat && fetchMessages();
  }, [messages, toggleMessage]);

    }

    return (
        <div className='ChatWindow'>
            <div className="chatInfo">
                <span>Johnneil</span>
                <div className="chatIcons">
                    <i className="bi bi-camera-video-fill"></i>
                    <i className="bi bi-person-add"></i>
                    <i className="bi bi-three-dots" onClick={handleShow}></i>
                </div>
            </div>
            <div className='messagesContainer'>
                {/* {messages && messages.map((message) => {
                    const initial =(JSON.stringify(message.sender.email)[1])
                })} */}
                <div className='messages'>
                    <div className='texts'>
                        <p>Messages</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className='messagesOwn'>
                    <div className='texts'>
                        <p>Messages</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className='messagesOwn'>
                    <div className='texts'>
                        <p>Messages</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className='messagesOwn'>
                    <div className='texts'>
                        <p>Messages</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className='messagesOwn'>
                    <div className='texts'>
                        <p>Messages</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className='messagesOwn'>
                    <div className='texts'>
                        <p>Messages</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className='messagesOwn'>
                    <div className='texts'>
                        <p>Messages</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className='messagesOwn'>
                    <div className='texts'>
                        <p>Messages</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className='messagesOwn'>
                    <div className='texts'>
                        <p>Messages</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className='messagesOwn'>
                    <div className='texts'>
                        <p>Messages</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className='messagesOwn'>
                    <div className='texts'>
                        <p>Messages</p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className='messagesOwn'>
                    <div className='texts'>
                        <p>Messages</p>
                        <span>1 min ago</span>
                    </div>
                </div>
            </div>
            <div className='input'>
                <input type="text" className="inputArea" placeholder='Type something...' value={text} onChange={e => setText(e.target.value)} />
                <button>Send</button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Channel Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Replace with actual channel details */}
                    <div>
                        <h5>Channel Name</h5>
                        <p>Example Channel</p>
                        <h5>Members</h5>
                        <ul>
                            <li>Johnneil</li>
                            <li>User1</li>
                            <li>User2</li>
                            {/* Add more members as needed */}
                        </ul>
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
