import React from 'react'
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Colabs from '../pages/Colabs';
import AppLayout from '../components/Layout';
import Users from '../pages/Users';
import Register from '../pages/Register'

const AppRouter = () => {
    const[isLoggedIn, setIsLoggedIn]= useState(()=>{
        return localStorage.getItem("loggedIn")==="true";
    })

    const handleLogin = () =>{
        setIsLoggedIn(true);
        localStorage.setItem("loggedIn","true");
    }
    const handleLogout = () =>{
        setIsLoggedIn(false);
        localStorage.setItem("loggedIn","false")
    }
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register onRegister={handleLogin} />} />
        <Route element={<AppLayout onLogout={handleLogout} />}>
          <Route index element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />} />
          <Route path="usuarios" element={isLoggedIn ? <Users /> : <Navigate to="/login" replace />} />
          <Route path="colaboraciones" element={isLoggedIn ? <Colabs /> : <Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRouter