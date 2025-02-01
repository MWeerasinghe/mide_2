import React , { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';

//Register Requests
import StudentRegisterRequests from './RegisterRequests/StudentRegisterRequests';
import BhikkuRegisterRequests from './RegisterRequests/BhikkuRegisterRequests';
import OpenMemberRegisterRequests from './RegisterRequests/OpenMemberRegisterRequests';
import Dashboard from './Dashboard';
import Logout from './Logout';
import Attendance from './AttendanceMarking';

import downloadImage from '../assets/download.png';

import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import LogoutIcon from '@mui/icons-material/Logout';
import SummaryReport from './DailyAttendanceReport';




const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: (<Link to="/admin/dashboard" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>Student Details </Link>),
    icon: <DashboardIcon />,
    path: '/',
  },
  {
    segment: 'orders',
    title: 'Registration Requests',
    icon: <DashboardIcon />,
    children: [
      {
        segment: 'sales',
        title: (<Link to="/admin/student-register-requests" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}><DescriptionIcon style={{ marginRight: 18 }} />Student Membership </Link>),
      },
      {
        segment: 'traffic',
        title: (<Link to="/admin/bhikku-register-requests" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}><DescriptionIcon style={{ marginRight: 18 }} />Teacher Membership</Link>),
      },
      // {
      //   segment: 'lms_library',
      //   title: (
      //     <Link to="/adminDashboard/open-member-register-requests" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}> <DescriptionIcon style={{ marginRight: 20 }} /> Open Membership </Link>
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
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        title: (<Link to="/admin/attendance" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}><DescriptionIcon style={{ marginRight: 18 }} />Mark Attendance</Link>),
      },
      {
        segment: 'summary',
        title: (<Link to="/admin/summary" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}><DescriptionIcon style={{ marginRight: 18 }} />Summary</Link>),
      },
    ],
  },
  {
    segment: 'logout',
    title: <Link to="/admin/logout" style={{
      textDecoration: 'none',
      color: 'inherit', fontSize: '16px',  padding: '4px 8px', borderRadius: '4px'}}
    >Logout</Link>,
    icon: <Link to="/admin/logout"><LogoutIcon /></Link>,
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

function useDemoRouter(initialPath)
{
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => 
  {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled('div')(({ theme, height }) => 
({
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

  const navigate = useNavigate();
  // Authentication check function
  const checkAuth = async () => 
  {
    const token = localStorage.getItem('vajira_token');
    const token1 = localStorage.getItem('vajira_token_admin');
    if (!token || !token1) 
    {
      navigate("/signin");
    }
  };
  
    useEffect(() => {
      checkAuth();
    }, [])

  const { window } = props;
  const router = useDemoRouter('/');
  const demoWindow = window ? window() : undefined;

  return (
    // <Router>
    <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme} window={demoWindow}>
      <DashboardLayout>
        <PageContainer>
            <Routes>
                <Route path="/" element={<Navigate to="/admin/dashboard" />} />
                <Route path="/student-register-requests" element={<StudentRegisterRequests />} />
                <Route path="/bhikku-register-requests" element={<BhikkuRegisterRequests />} />
                <Route path="/open-member-register-requests" element={<OpenMemberRegisterRequests />} />
                <Route path="/dashboard" element={<Dashboard/>} />
                <Route path="/attendance" element={<Attendance/>} />
                <Route path="/logout" element={<Logout/>} />
                <Route path="/summary" element={<SummaryReport/>} />
            </Routes>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
    // </Router>
  );
}