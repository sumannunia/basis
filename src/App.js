import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <div>
        {/* <NavBar /> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
         
         
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
         

            
          
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
