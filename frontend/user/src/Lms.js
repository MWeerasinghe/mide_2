import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import downloadImage from './assets/download.png';
import FirstCourse from './lmsPart1Components/student/course1';
import SecondCourse from './lmsPart1Components/student/course2';
import ThirdCourse from './lmsPart1Components/student/course3';
import Announcements from './lmsPart1Components/student/announcements';

import HomePage from './lmsPart2Components/student/HomePage';
import Assignment from './lmsPart2Components/student/Assignments';
import AssignmentSubmit from './lmsPart2Components/student/AssignmentSubmit'
import Logout from './Components/Logout';



import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import QrCodeIcon from '@mui/icons-material/QrCode';
import EngineeringIcon from '@mui/icons-material/Engineering';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import CampaignIcon from '@mui/icons-material/Campaign';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';


import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';





const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: (
      <Link to="/lmsPart1/homePage" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
        Home
      </Link>
    ),
    icon: <HomeIcon />,
    path: '/',
  },
  {
    kind: 'divider',
  },
  {
    segment: 'courses',
    title: 'My Courses',
    icon: <SchoolIcon />,
    children: [
      {
        segment: '',
        title: (
          <Link to="/lmsPart1/course1" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <DescriptionIcon style={{ marginRight: 18 }} />
            බුද්ධ චරිතය
          </Link>
        ),
      },
      {
        segment: '',
        title: (
          <Link to="/lmsPart1/course2" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <DescriptionIcon style={{ marginRight: 18 }} />
            අභිධර්මය
          </Link>
        ),
      },
      {
        segment: '',
        title: (
          <Link to="/lmsPart1/course3" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <DescriptionIcon style={{ marginRight: 18 }} />
            පාලි
          </Link>
        ),
      },
    
    ],
  },
  {
    segment: 'reports',
    title: 'Assignments',
    icon: <EditIcon  />,
    children: [
      {
        segment: 'traffic',
        title: (
          <Link to="/lmsPart1/assignments" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <DescriptionIcon style={{ marginRight: 20 }} />
            බුද්ධ චරිතය
          </Link>
        ),
      },
      {
        segment: 'traffic',
        title: (
          <Link to="/dashboard/profile" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <DescriptionIcon style={{ marginRight: 20 }} />
            අභිධර්මය
          </Link>
        ),
      },
      {
        segment: 'traffic',
        title: (
          <Link to="/dashboard/profile" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <DescriptionIcon style={{ marginRight: 20 }} />
            පාලි
          </Link>
        ),
      },
    ],
  },
  {
    segment: 'dashboard',
    title: (
      <Link to="/lmsPart1/announcements" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
        Announcement
      </Link>
    ),
    icon: <CampaignIcon />,
    path: '/profile',
  },
  {
    kind: 'divider',
  },
  {
    segment: 'dashboard',
    title: (
      <Link to="/dashboard/profile" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
        Settings
      </Link>
    ),
    icon: <SettingsIcon />,
    path: '/profile',
  },
  {
    segment: 'logout',
    title: <Link to="/lmsPart1/logout" style={{
      textDecoration: 'none',
      color: 'inherit', fontSize: '16px',  padding: '4px 8px', borderRadius: '4px'}}
    >Logout</Link>,
    icon: <Link to="/lmsPart1/logout"><LogoutIcon /></Link>,
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
          titleElement.textContent = 'Vajiraramaya';
          titleElement.style.color = 'orange';
        }

        const imageContainer = document.querySelector('.css-yzjoij');
        if (imageContainer) {
        imageContainer.innerHTML = '';

        const newImage = document.createElement('img');
        newImage.src = downloadImage;
        newImage.width = 40;
        newImage.height = 40;
        imageContainer.appendChild(newImage);
        }
      }, []);

  

  return (
    <AppProvider navigation={NAVIGATION} theme={demoTheme}>
      <DashboardLayout>
        <PageContainer>
          <Routes>
            <Route path="/" element={<Navigate to="/lmsPart1/homePage" />} />
            <Route path="/course1" element={<FirstCourse />} />
            <Route path="/course2" element={<SecondCourse />} />
            <Route path="/course3" element={<ThirdCourse />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/homePage" element={<HomePage />} />
            <Route path="/assignments" element={<Assignment />} />
            <Route path="/assignmentSubmit" element={<AssignmentSubmit />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}