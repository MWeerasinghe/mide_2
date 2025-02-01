import React , { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';

import StudentRequests from './Request';
import MarkAttendance from './Attendance';
import AttendanceMark from './AttendanceMarking';
import DailyAttendance from './DailyAttendanceReport';
import AverageAttendance from './AverageAttendanceReport';
import AttendanceChart from './AttendanceChart';
import Summary from './Summary';
import UserDashboard from './Dashboard';
import downloadImage from '../assets/download.png';
import LogoutIcon from '@mui/icons-material/Logout';

import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
//import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ListIcon from '@mui/icons-material/List';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import TodayIcon from '@mui/icons-material/Today';
import getTeacherToken from '../functions/GetTeacherId';
import Logout from '../Components/Logout';


const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: (<Link to="/teacherLms/Dashboard" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>Dashboard </Link>),
    icon: <DashboardIcon />,
    path: './Dashboard',
  },

  /*{
    segment: 'attendance',
    title: (<Link to="/Attendance" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>Attendance </Link>),
    icon: <PermContactCalendarIcon />,
    path: './Attendance',
  },*/

  {
    segment: 'attendance',
    title: 'Attendance',
    icon: <PermContactCalendarIcon />,
    children: [
      {
        segment: 'List',
        title: (<Link to="/teacherLms/Attendance" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}><ListIcon style={{ marginRight: 18 }} />Attendance </Link>),
      },
      {
        segment: 'QR scanner',
        title: (<Link to="/teacherLms/AttendanceMarking" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}><QrCodeScannerIcon style={{ marginRight: 18 }} />QR scanner </Link>),
      },
      /*{
        segment: 'lms_library',
        title: (
          <Link to="/library-requests" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}> <DescriptionIcon style={{ marginRight: 20 }} /> Open Requests For Library </Link>
        ),
      },*/
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
    icon: <AnalyticsIcon />,
    children: [
      {
        segment: 'Attendance Summary Report',
        title: (<Link to="/teacherLms/Summary" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}><SummarizeIcon style={{ marginRight: 18 }} />Summary </Link>),
      },
      // {
      //   segment: 'AttendanceChart',
      //   title: (<Link to="/empDashboard/AttendanceChart" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}><ShowChartIcon style={{ marginRight: 18 }} />AttendanceChart </Link>),
      // },
      {
        segment: 'AverageAttendanceReport',
        title: (<Link to="/teacherLms/AverageAttendanceReport" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}><BarChartIcon style={{ marginRight: 18 }} />AverageAttendanceReport </Link>),
      },
      {
        segment: 'DailyAttendanceReport',
        title: (<Link to="/teacherLms/DailyAttendanceReport" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}><TodayIcon style={{ marginRight: 18 }} />DailyAttendanceReport </Link>),
      },
      
    ],
  },
  {
    segment: 'integrations',
    title: (<Link to="/teacherLms/logout" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>Logout </Link>),
    icon: <LogoutIcon />,
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
  const navigate = useNavigate();
  const user_idx = getTeacherToken();

  useEffect(() => {
    if (!user_idx) {
      navigate('/signin');
    }
  }, [user_idx, navigate]);

  
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

  
  const { window } = props;
  const router = useDemoRouter('/');
  const demoWindow = window ? window() : undefined;

  return (
    // <Router>
    <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme} window={demoWindow}>
      <DashboardLayout>
        <PageContainer>
            <Routes>
                <Route path="/" element={<Navigate to="/teacherLms/Dashboard" />} />
                <Route path="/Attendance" element={<MarkAttendance />} />
                <Route path="/AttendanceMarking" element={<AttendanceMark/>} />
                <Route path="/DailyAttendanceReport" element={<DailyAttendance/>} />
                <Route path="/AverageAttendanceReport" element={<AverageAttendance/>} />
                <Route path="/AttendanceChart" element={<AttendanceChart/>} />
                <Route path="/Summary" element={<Summary/>} />
                <Route path="/Dashboard" element={<UserDashboard />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
    // </Router>
  );
}