import React from 'react'
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Colabs from '../pages/Colabs';
import AppLayout from '../components/Layout';
import Users from '../pages/Users';

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
            <Route element={<AppLayout />}>
            <Route path='/' element={isLoggedIn ? <Home onLogout={handleLogout}/>: <Navigate to="/login" replace/>}/>
            </Route>
            <Route path='/login' element={<Login onLogin={handleLogin}/>}/>
            
            <Route element={<AppLayout />}>
              <Route path='/home' element={<Home/>}/>
              <Route path='/usuarios' element={<Users/>}/>
              <Route path='/colaboraciones' element={<Colabs/>}/>
            </Route>      
        </Routes>
    </Router>
    
  )
}

export default AppRouter