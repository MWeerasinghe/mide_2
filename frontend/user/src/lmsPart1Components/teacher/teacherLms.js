import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import downloadImage from '../../assets/download.png';
// import FirstCourse from './lmsPart1Components/student/course1';
// import SecondCourse from './lmsPart1Components/student/course2';
import CoursesAdd from './courses';
import AttendanceMark from './attendanceMark';
import AddResults from './addResult';
import Announcement from './addAnnouncement';
import HomeTeacher from '../../lmsPart2Components/teacher/HomePage';
import Assignments from '../../lmsPart2Components/teacher/Assignments';
import AssignmentSubmit from '../../lmsPart2Components/student/AssignmentSubmit';
import Logout from '../../Components/Logout';
import DeleteMaterial from './deleteMaterial';
import DeleteAnnouncement from './deleteAnnouncement';




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

import getTeacherToken from '../../functions/GetTeacherId';

//mitun=====================================================
import Setting from "../../lmsPart2Components/teacher/Settings";
import AssignmentAdd from "../../lmsPart2Components/teacher/AssignmentAdd"


const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: (
      <Link to="/teacherLmsPart1/homePage" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
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
          <Link to="/teacherLmsPart1/addCourse" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <DescriptionIcon style={{ marginRight: 18 }} />
            Add Materials
          </Link>
        ),
      },
      {
        segment: '',
        title: (
          <Link to="/teacherLmsPart1/attendanceMark" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <DescriptionIcon style={{ marginRight: 18 }} />
            Attendance Mark
          </Link>
        ),
      },
      {
        segment: '',
        title: (
          <Link to="/teacherLmsPart1/addResult" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
            <DescriptionIcon style={{ marginRight: 18 }} />
            Add Result
          </Link>
        ),
      },
    
    ],
  },
  // {
  //   segment: 'reports',
  //   title: 'Assignments',
  //   icon: <EditIcon  />,
  //   children: [
  //     {
  //       segment: 'traffic',
  //       title: (
  //         <Link to="/teacherLmsPart1/assignments" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
  //           <DescriptionIcon style={{ marginRight: 20 }} />
  //           බුද්ධ චරිතය
  //         </Link>
  //       ),
  //     },
  //     {
  //       segment: 'traffic',
  //       title: (
  //         <Link to="/dashboard/profile" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
  //           <DescriptionIcon style={{ marginRight: 20 }} />
  //           අභිධර්මය
  //         </Link>
  //       ),
  //     },
  //     {
  //       segment: 'traffic',
  //       title: (
  //         <Link to="/dashboard/profile" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
  //           <DescriptionIcon style={{ marginRight: 20 }} />
  //           පාලි
  //         </Link>
  //       ),
  //     },
  //   ],
  // },
  {
    segment: 'dashboard',
    title: (
      <Link to="/teacherLmsPart1/assignments" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
        Assignment
      </Link>
    ),
    // icon: <CampaignIcon />,
    icon: <Link to="/teacherLmsPart1/assignments"><EditIcon   /></Link>,
    path: '/profile',
  },
  {
    segment: 'dashboard',
    title: (
      <Link to="/teacherLmsPart1/assignmentadd" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
        Assignment Add
      </Link>
    ),
    // icon: <CampaignIcon />,
    icon: <Link to="/teacherLmsPart1/assignmentadd"><EditIcon   /></Link>,
    path: '/profile',
  },
  
  {
    segment: 'dashboard',
    title: (
      <Link to="/teacherLmsPart1/announcement" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
        Announcement
      </Link>
    ),
    // icon: <CampaignIcon />,
    icon: <Link to="/teacherLmsPart1/announcement"><CampaignIcon /></Link>,
    path: '/profile',
  },
  {
    kind: 'divider',
  },
  {
    segment: 'dashboard',
   title: (
      <Link to="/teacherLmsPart1/setting" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
        Settings
      </Link>
    ),
    icon: <SettingsIcon />,
    path: '/profile',
  },
  {
    segment: 'logout',
    title: <Link to="/teacherLmsPart1/logout" style={{
      textDecoration: 'none',
      color: 'inherit', 
      fontSize: '16px',
      padding: '4px 8px',
      borderRadius: '4px',
    }}
    >Logout</Link>,
    icon: <Link to="/teacherLmsPart1/logout"><LogoutIcon /></Link>,
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
const navigate = useNavigate();
const user_id = getTeacherToken();


  useEffect(() => 
    {
      if(!user_id) 
      {
        navigate("/signin");
      }
        
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
            <Route path="/" element={<Navigate to="/teacherLmsPart1/homePage" />} />
            <Route path="/addResult" element={<AddResults />} />
            <Route path="/attendanceMark" element={<AttendanceMark />} />
            <Route path="/addCourse" element={<CoursesAdd />} />
            <Route path="/announcement" element={<Announcement />} />
            <Route path="/homePage" element={<HomeTeacher />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/assignmentSubmit" element={<AssignmentSubmit />} />
            <Route path="/assignmentadd" element={<AssignmentAdd />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/deleteMaterial" element={<DeleteMaterial />} />
            <Route path="/deleteAnnouncement" element={<DeleteAnnouncement />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}