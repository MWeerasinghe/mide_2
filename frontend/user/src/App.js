import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SideBar from './Components/SideBar';
import EmpSidebar from './EmpComponents/SideBar';
import Login from './Login';

function App() {
  const [userType, setUserType] = useState(null); // Track user type

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setUserType={setUserType} />} />
        {userType === 'user' && <Route path="/dashboard/*" element={<SideBar />} />}
        {userType === 'employee' && <Route path="/empDashboard/*" element={<EmpSidebar />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
