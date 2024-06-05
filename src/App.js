import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Component/Login/Login';
import SideBar from "./Component/SideBar/SideBar";
import ChatWindow from "./Component/ChatWindow/ChatWindow";
import Signup from "./Component/Signup/Signup";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainPage from './MainPage/MainPage';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Assuming user object contains authentication details
  // Function to handle login
  const handleLogin = (user) => {
    setUser(user);
    setIsLoggedIn(true);
  };
  // Function to handle logout
  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login handleLogin={handleLogin} />} />
          <Route path="/Login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/MainPage" element={<MainPage setIsLoggedIn={setIsLoggedIn} user={user} />} />
        </Routes>
      </BrowserRouter>
      {isLoggedIn && (
        <div>
          <nav>
            <SideBar handleLogout={handleLogout} />
          </nav>
          <main>
            {/* Pass the user's name to the ChatWindow component */}
            <ChatWindow user={user} />
          </main>
        </div>
      )}
    </div>
  );
};
export default App;