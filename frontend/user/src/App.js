import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from "./LandingPage";

import SideBar from './Components/SideBar';
import EmpSidebar from './EmpComponents/SideBar';
import Login from './Login';
import Admin from './adminComponents/SideBar';

function App() {
  const [userType, setUserType] = useState(null); // Track user type
  
  return (
    <BrowserRouter>
      
      <LandingPage />
      <Routes>
        <Route path="/login" element={<Login setUserType={setUserType} />} />
        {userType === 'user' && <Route path="/dashboard/*" element={<SideBar />} />}
        {userType === 'employee' && <Route path="/empDashboard/*" element={<EmpSidebar />} />}
        {userType === 'admin' && <Route path="/adminDashboard/*" element={<Admin />} />}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </BrowserRouter>

  );
}

export default App;
