import React , { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

import StudentRequests from './Request';
import QrGenerator from './QrGenerator'
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
import EnableDisable from './EanableDisable'
import Profile from './Profile';
import EditProfile from './Edit_profile';
import Permission from './Permission';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: (<Link to="/profile" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>Dashboard </Link>),
    icon: <DashboardIcon />,
    path: '/profile',
  },
  {
    segment: 'orders',
    title: 'Profile',
    icon: <ShoppingCartIcon />,
    children: [
      {
        segment: 'sales',
        title: (<Link to="/edit-profile" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}><DescriptionIcon style={{ marginRight: 18 }} />Edit </Link>),
      },
      {
        segment: 'traffic',
        title: (<Link to="/permission" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}><DescriptionIcon style={{ marginRight: 18 }} />Permission</Link>),
      },
      {
        segment: 'lms_library',
        title: (
          <Link to="/library-requests" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}> <DescriptionIcon style={{ marginRight: 20 }} /> Open Requests For Library </Link>
        ),
      },
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
          <Link to="/qr-generator" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}> <DescriptionIcon style={{ marginRight: 20 }} />QR Code</Link>
        ),
      },
      {
        segment: 'sales',
        title: 'Other',
        icon: <DescriptionIcon />,
      },
      
    ],
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
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

  
  const { window } = props;
  const router = useDemoRouter('/');
  const demoWindow = window ? window() : undefined;



  return (
    // sx={{ backgroundColor: '#e97100' }}
    <Router>
    <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme} window={demoWindow} >
      <DashboardLayout >
        <PageContainer >
            <Routes>
                <Route path="/student-request" element={<StudentRequests />} />
                <Route path="/qr-generator" element={<QrGenerator />} />
                <Route path='/enable-disable' element={<EnableDisable/>} />
                <Route path='/profile' element={<Profile/>} />
                <Route path='/edit-profile' element={<EditProfile/>} />
                <Route path='/permission' element={<Permission/>} />
            </Routes>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
    </Router>
  );
}