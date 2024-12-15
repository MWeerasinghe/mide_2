import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StudentRequests from './Request';
import QrGenerator from './QrGenerator';
import downloadImage from '../assets/download.png';
import firstlogo from '../assets/logo10.jpg';


import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import QrCodeIcon from '@mui/icons-material/QrCode';
import EngineeringIcon from '@mui/icons-material/Engineering';
import LogoutIcon from '@mui/icons-material/Logout';

import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import EnableDisable from './EanableDisable';
import Profile from './Profile';
import EditProfile from './Edit_profile';
import Permission from './Permission';
import Logout from './Logout';




const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: (
      <Link to="/dashboard/profile" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
        Dashboard
      </Link>
    ),
    icon: <DashboardIcon />,
    path: '/dashboard/profile',
  },
  {
    segment: '/dashboard/edit-profile',
    title: 'Profile',
    icon: <PersonIcon />,
    children: [
      {
        segment: '',
        title: (
          <Link to="/dashboard/edit-profile" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <EditIcon style={{ marginRight: 18 }} />
            Edit
          </Link>
        ),
      },
      {
        segment: '',
        title: (
          <Link to="/dashboard/permission" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <LockOpenIcon style={{ marginRight: 18 }} />
            Permission
          </Link>
        ),
      },
      // {
      //   segment: '',
      //   title: (
      //     <Link to="/library-requests" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
      //       <AssignmentIcon style={{ marginRight: 20 }} />
      //       Open Requests For Library
      //     </Link>
      //   ),
      // },
    ],
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Details',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'traffic',
        title: (
          <Link to="/dashboard/qr-generator" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <QrCodeIcon style={{ marginRight: 20 }} />
            QR Code
          </Link>
        ),
      },
      {
        // segment: 'profile',
        // title: 'Other',
        // icon: <DescriptionIcon />,
        segment: 'traffic',
        title: (
          <Link to="/dashboard/enable-disable" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <DescriptionIcon style={{ marginRight: 20 }} />
            About
          </Link>
        ),
      },
    ],
  },
  {
    segment: 'logout',
    title: <Link to="/dashboard/logout" style={{
      textDecoration: 'none', // Removes the underline
      color: '#FFFFFF', 
      fontWeight: 'bold', // Makes the text bold
      fontSize: '16px', // Sets the font size (adjust as needed)
      padding: '4px 8px', // Adds padding for better spacing
      borderRadius: '4px', // Optional: Adds rounded corners
      // transition: 'background-color 0.3s ease', 
    }}
    >Logout</Link>,
    icon: <Link to="/dashboard/logout"><LogoutIcon /></Link>,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

export default function DashboardLayoutBasic(props) 
{
  useEffect(() => 
  {
      const titleElement = document.querySelector('.MuiTypography-root.MuiTypography-h6.css-1je49cu-MuiTypography-root');
      if (titleElement) 
      {
        titleElement.textContent = 'Vajiraramaya'; // Replace "Vajiraramaya" with your desired text
        titleElement.style.color = 'orange';
      }

      const imageContainer = document.querySelector('.css-yzjoij');
      if (imageContainer) {
      // Clear existing SVG content
      imageContainer.innerHTML = '';

      const newImage = document.createElement('img');
      newImage.src = downloadImage; // Use imported path if it's within src
      newImage.width = 40;
      newImage.height = 40;
      // Append the new image to the container
      imageContainer.appendChild(newImage);
      }
    }, []);

      
  const [isAuthenticated, setIsAuthenticated] = useState('');
  const navigate = useNavigate();

  // Authentication check function
  const checkAuth = async () => 
  {
    const token = localStorage.getItem('vajira_token'); // Get token from localStorage
    // console.log(token);
    if (!token) 
    {
      setIsAuthenticated(false);
      return;
    }

    try 
    {
      const response = await axios.post('http://localhost:3000/api/verify-token/verify', {}, { headers: {'Authorization': `Bearer ${token}`},});
      // console.log("result", response);
      if(response.status === 200) 
      {
        // console.log("response eka ",response.status);
        setIsAuthenticated(true); // Token is valid
      } 
      else 
      {
        localStorage.removeItem('token'); // Remove invalid token
        setIsAuthenticated(false);
      }
    } 
    catch (error) 
    {
      // console.error('Error verifying token:', error);
      localStorage.removeItem('token'); // Remove invalid token if error occurs
      setIsAuthenticated(false);
    }
  };


  useEffect(() => {
    checkAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem('vajira_token'); // Clear token from localStorage
    setIsAuthenticated(false); // Set authentication status to false
    navigate('/'); // Redirect to the login page
  };

  if (isAuthenticated === false) {
    return <Navigate to="/" />;
  }
  

  return (
    <AppProvider navigation={NAVIGATION} theme={demoTheme}>
      <DashboardLayout>
        <PageContainer>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard/profile" />} />
            <Route path="profile" element={<Profile />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="permission" element={<Permission />} />
            <Route path="qr-generator" element={<QrGenerator />} />
            <Route path="enable-disable" element={<EnableDisable />} />
            <Route path="logout" element={<Logout />} />
          </Routes>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}