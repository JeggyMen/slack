import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './ChatWindow.css';


function DecoyChatWindow(props) {
    const { show, setShow } = props;
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className='ChatWindow'>
            <div className="chatInfo">
                <span>No user selected</span>
                <div className="chatIcons">
                    <i className="bi bi-camera-video-fill"></i>
                    <i className="bi bi-person-add"></i>
                    <i className="bi bi-three-dots" onClick={handleShow}></i>
                </div>
            </div>
            <div className='messagesContainer'>
                <div className='noMessages'>
                    <p>Please select a user to start chatting.</p>
                </div>
            </div>
            <div className='input'>
                <input
                    type="text"
                    className="inputArea"
                    placeholder='Type something...'
                    disabled
                />
                <button disabled>Send</button>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Chat Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h5>No user selected</h5>
                        <p>Please select a user to view chat details.</p>
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
export default DecoyChatWindow;