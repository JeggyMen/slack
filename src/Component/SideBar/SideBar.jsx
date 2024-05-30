import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './SideBar.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import UserServices from '../Services/UserServices';

function SideBar(props) {
    const { setIsLoggedIn, user } = props;
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const users = await UserServices.getUsers(user);
                setUserList(users);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        }
        fetchUsers();
    }, [user]);

    function logout() {
        localStorage.clear();
        setIsLoggedIn(false);
    }

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
                                <li className='nav-item'>
                                    <a className='nav-link text-white bi bi-lock-fill' href="#"> Batch 35</a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link text-white bi bi-lock-fill' href="#"> Rufus</a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link text-white bi bi-window-plus' href="#"> Add Channel</a>
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
                                    {userList.length > 0 ? (
                                        userList.map((individual) => {
                                            const { id, email } = individual;
                                            return (
                                                <li className='nav-item' key={id}>
                                                    <a className='nav-link text-white bi bi-person-fill' href="#">ID: {id}</a>
                                                    <a className='nav-link text-white bi bi-person-fill' href="#">Email: {email}</a>
                                                </li>
                                            );
                                        })
                                    ) : (
                                        <li className='nav-item'>
                                            <div className='nav-link text-white'>No users available</div>
                                        </li>
                                    )}
                                    <li className='nav-item'>
                                        <a className='nav-link text-white bi bi-window-plus' href="#"> Direct Message</a>
                                    </li>
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
                            <span className='fs-5 ms-1'>Johnneil</span>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="triggerId">
                            <a className="dropdown-item" href="#">Active,UserName</a>
                            <a className="dropdown-item" href="#" onClick={logout}>Log-out</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
