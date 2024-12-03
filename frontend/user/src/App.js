import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import SideBar from './Components/SideBar';
import Login from './Components/Login';

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [ifeka, setif] = useState('iffff');


  // // Check authentication by validating the token with the server
  // const checkAuth = async () => {
  //   const token = localStorage.getItem('token'); // Get token from localStorage
  
  //   if (!token) {
  //     setIsAuthenticated(false);
  //     return;
  //   }
  
  //   try {
  //     const response = await axios.post('http://localhost:4000/api/verify-token/verify', {}, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //       },
  //     });
  
  //     if(response.status === 200) 
  //     {
  //       setIsAuthenticated(true); // Token is valid

  //     } 
  //     else 
  //     {
  //       localStorage.removeItem('token'); // Remove invalid token
  //       setIsAuthenticated(false);
  //     }
  //   } 
  //   catch (error) {
  //     console.error('Error verifying token:', error);
  //     localStorage.removeItem('token'); // Remove invalid token if error occurs
  //     setIsAuthenticated(false);

  //   }
  // };

  // useEffect(() => 
  // {
  //   checkAuth();
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<SideBar />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
