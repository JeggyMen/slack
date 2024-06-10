import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './SideBar.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ChannelServices from '../Services/ChannelServices'; 
import { Button, Modal } from 'react-bootstrap';
import Select from 'react-select';

function SideBar({ setIsLoggedIn, user, userName, setSelectedUser, setSelectedChannel, setMessages,getUserNameFromEmail }) {
    const [userList, setUserList] = useState([]);
    const [channelList, setChannelList] = useState([]); 
    const [show, setShow] = useState(false);
    const [channelName, setChannelName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => {
        async function fetchUsers() {
            try {
                const users = await ChannelServices.getUsers(user);
                setUserList(users || []); 
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        }
        fetchUsers();
    }, [user]);

    useEffect(() => {
        async function fetchChannels() {
            try {
                const channels = await ChannelServices.getChannels(user);
                if (channels) {
                    setChannelList(channels); 
                    channels.forEach(channel => {
                        // console.log('Channel Object:', channel);
                    });
                } else {
                    console.error('No channels found.');
                }
            } catch (error) {
                console.error('Failed to fetch channels:', error);
            }
        }
        fetchChannels();
    }, [user]);

    useEffect(() => {
        // console.log('Logged in username:', userName);
    }, [userName]);

    const handleChannelNameChange = (e) => setChannelName(e.target.value);
    const handleUserChange = (selectedOptions) => setSelectedUsers(selectedOptions);
    const handleSave = async () => {
        try {
            const userIds = selectedUsers.map(user => user.id);
            const newChannel = {
                name: channelName,
                user_ids: userIds
            };
            await ChannelServices.createChannel(user, newChannel);
            setChannelName('');
            setSelectedUsers([]);
            handleClose();
        } catch (error) {
            console.error('Failed to create channel:', error);
        }
    };

    function logout() {
        localStorage.clear();
        setIsLoggedIn(false);
    }

    const userOptions = userList.map(user => ({
        value: user.id,
        label: user.email,
        id: user.id
    }));

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='bg-violet d-flex flex-column justify-content-between min-vh-100'>
                    <div>
                        <a className='text-decoration-none ms-4 d-flex align-items-center text-white d-none d-sm-inline'>
                            <span className='fs-2 ps-5'>Avion School</span>
                        </a>
                        <hr className='text-white d-none d-sm-block' />
                        <div className='dropdown ps-4'>
                            <a href="#submenu1" className='nav-link text-white' data-bs-toggle="collapse">
                                <i className='bi bi-grid'></i>
                                <span className='ms-2 '>Channels</span>
                                <i className='bi bi-arrow-down-short'></i>
                            </a>
                            <ul className='collapse show' id="submenu1" data-bs-parent="#sidebar-menu">
                                {(channelList || []).map(channel => (
                                    <li className='nav-item' key={channel.id}>
                                        <a
                                            className='nav-link text-white bi bi-lock-fill'
                                            href="#"
                                            onClick={() => {
                                                setMessages([]);
                                                setSelectedUser(null);
                                                setSelectedChannel(channel)}}
                                        >
                                            {channel.name}
                                        </a>
                                    </li>
                                ))}
                                <li className='nav-item'>
                                    <a className='nav-link text-white bi bi-window-plus' href="#" onClick={handleShow}> Add Channel</a>
                                </li>
                            </ul>
                        </div>
                        <div className='dropdown mt-3 ps-4'>
                                <a href="#submenu2" className='nav-link text-white' data-bs-toggle="collapse">
                                    <i className='bi bi-chat'></i>
                                    <span className='ms-2'>DM</span>
                                    <i className='bi bi-arrow-down-short'></i>
                                </a>
                                <ul className='collapse' id="submenu2" data-bs-parent="#sidebar-menu" style={{ maxHeight: '320px', overflowY: 'auto' }}>
                                    {(userList || []).map((individual) => {
                                        const { id, email } = individual;
                                        return (
                                            <li className='nav-item' key={id}>
                                                <a
                                                    className='nav-link text-white bi bi-person-fill'
                                                    href="#"
                                                    onClick={() => {
                                                        
                                                setMessages([]);
                                                        setSelectedChannel(null)
                                                        setSelectedUser(null)
                                                        setSelectedUser(individual)
                                                    }}
                                                >
                                                    Email: {email}
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                        </div>
                    </div>
                    <div className="log-out dropdown open">
                        <a
                            className="btn border-none dropdown-toggle text-white"
                            type="button"
                            id="triggerId"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i className='bi bi-person fs-4'></i>
                            <span className='fs-5 ms-1'>{getUserNameFromEmail(user.email)} </span>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="triggerId">
                            <a className="dropdown-item" href="#">Active, {selectedUsers?.email}</a>
                            <a className="dropdown-item" href="#" onClick={logout}>Log-out</a>
                        </div>
                        {/* {console.log('Selected Users in JSX:', selectedUsers)}  */}
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Channel</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="channelName" className="form-label">Channel Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="channelName"
                                value={channelName}
                                onChange={handleChannelNameChange}
                                placeholder="Enter channel name"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="channelUsers" className="form-label">Add Users</label>
                            <Select
                                isMulti
                                options={userOptions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={handleUserChange}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button className="bg-violet" variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default SideBar;
