import React from 'react'
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Colabs from '../pages/Colabs';
import AppLayout from '../components/Layout';
import Users from '../pages/Users';
import Register from '../pages/Register';

const AppRouter = () => {
    const[isLoggedIn, setIsLoggedIn]= useState(()=>{
        return localStorage.getItem("loggedIn")==="true";
    })
    const [isRegistered, setIsRegistered]= useState(false);
    
    const handleRegister = () =>{
        setIsRegistered(true);
    }
    
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
            <Route element={<AppLayout onLogout={handleLogout}  />}>
            <Route path='/' element={isLoggedIn ? <Home onLogout={handleLogout}/>: <Navigate to="/login" replace/>}/>
            <Route path='/home' element={isLoggedIn ? <Home onLogout={handleLogout}/>: <Navigate to="/login" replace/>}/>
            <Route path='/usuarios' element={isLoggedIn ? <Users onLogout={handleLogout}/>: <Navigate to="/login" replace/>}/>
            <Route path='/colaboraciones' element={isLoggedIn ? <Colabs onLogout={handleLogout}/>: <Navigate to="/login" replace/>}/>
            </Route>
            <Route path='/login' element={<Login onLogin={handleLogin}/>}/>
            <Route path='/register' element={<Register onRegister={handleRegister}/>}/>
        </Routes>
    </Router>
    
  )
}

export default AppRouter