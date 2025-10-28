import React from 'react'
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
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
            <Route path='/' element={isLoggedIn ? <Home onLogout={handleLogout}/>: <Navigate to="/login" replace/>}/>
            <Route path='/login' element={<Login onLogin={handleLogin}/>}/>
        </Routes>
    </Router>
    
  )
}

export default AppRouter