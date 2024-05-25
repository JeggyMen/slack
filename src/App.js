import React, { useState } from 'react';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import Login from './Component/Login/Login';
import SideBar from "./Component/SideBar/SideBar";
import ChatWindow from "./Component/ChatWindow/ChatWindow";
import Signup from "./Component/Signup/Signup";
import data from './Component/data/bankUsers.json';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './MainPage/MainPage';

// function App() {
//   const [users, setUsers] = useState(data);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const addUser = (newUser) => {
//     setUsers([...users, newUser]);
//   };

//   const usersDatabase = [
//     { username: "Admin", password: 'Admin123' }
//   ];

//   const handleLogin = (username, password) => {
//     const user = usersDatabase.find(user => user.username === username && user.password === password);
//     if (user) {
//         setIsLoggedIn(true);
//         alert('Login successful');
//     } else {
//         alert('Invalid username or password');
//     }
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     alert('Logged out successfully');
//   };

//   return (
//     <div>
//       {!isLoggedIn ? (
//         <Login handleLogin={handleLogin} />
//       ) : (
//         <div>
//           <nav>
//             <SideBar handleLogout={handleLogout} />
//           </nav>
//           <main>
//             <ChatWindow />
//           </main>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/Login" element={< Login/>}/>
        <Route path="/Signup" element={< Signup/>}/>
        <Route path="/MainPage" element={< MainPage/>}/>
        <Route path="/SideBar" element={< SideBar/>}/>
        {/* <Route path="/ChatWindow" element={< ChatWindow/>}/> */}
        </Routes>
      </BrowserRouter>
      {/* <Login /> */}
      {/* <SideBar /> */}
    </div>
  );
};

export default App;
