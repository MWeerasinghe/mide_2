import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import MyCoursesApp from './Lms';
import TeacherLms from './lmsPart1Components/teacher/teacherLms'
import Landing from './LandingPage';
import Login from './Login';
import SignIn from './Components/SignIn';

import Registration from './Components/RegistrationForms/Registration';
import OpenMembership from './Components/RegistrationForms/OpenMembership';
import StudentMembership from './Components/RegistrationForms/StudentMembership';
import BhikkuMembership from './Components/RegistrationForms/BhikkuMembership';
import LibraryStaffRegistration from './Components/RegistrationForms/LibraryStaffRegistration';
import DhammaSchoolRegistration from './Components/RegistrationForms/DhammaSchoolRegistration';
import LandingPage from './LandingPage';
import AdminLand from './adminComponents/SideBar'


function App() {
  return (
    <Router>
      <div className="app">
        <LandingPage />
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/admin/*" element={<AdminLand />} />
          <Route path="/lms/*" element={<MyCoursesApp />} />
          <Route path="/teacherLms/*" element={<TeacherLms />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
