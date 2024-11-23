import Button from '@mui/material/Button';
import Navbar from './Components/AppBar'
import SideBar from './Components/SideBar'
import { BrowserRouter, Routes, Route, Navigate, Router } from 'react-router-dom';
import Request from './Components/Request'
import { colors } from '@mui/material';
import styles from './App.module.css';


function App() 
{
  const navbarStyle = {
    zIndex: '100',
  };
  
  return (
    
    <div className="App">
    {/* <Navbar style={navbarStyle} /> */}
      <SideBar />
    </div>
  );
}

export default App;
