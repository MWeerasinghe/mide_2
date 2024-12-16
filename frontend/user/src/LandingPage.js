import * as React from 'react';
import PropTypes from 'prop-types';
import {Routes, Route} from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import AppAppBar from './Components/AppAppBar';
import Hero from './Components/Hero';
import getVJTheme from './getVJTheme';
import SignIn from './Components/SignIn';

// Registration
import Registration from './Components/RegistrationForms/Registration';
import OpenMembership from './Components/RegistrationForms/OpenMembership';
import StudentMembership from './Components/RegistrationForms/StudentMembership';
import BhikkuMembership from './Components/RegistrationForms/BhikkuMembership';
import LibraryStaffRegistration from './Components/RegistrationForms/LibraryStaffRegistration';
import DhammaSchoolRegistration from './Components/RegistrationForms/DhammaSchoolRegistration';

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100dvw',
        position: 'fixed',
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Platform"
        sx={{
          backgroundColor: 'background.default',
          '& .Mui-selected': {
            pointerEvents: 'none',
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>Material Design 2</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.shape({
    valueOf: PropTypes.func.isRequired,
  }).isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};

export default function LandingPage() {
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getVJTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      

      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/register/open-membership" element={<OpenMembership />} />
        <Route path="/register/student-membership" element={<StudentMembership />} />
        <Route path="/register/bhikku-membership" element={<BhikkuMembership />} />
        <Route path="/register/library-staff" element={<LibraryStaffRegistration />} />
        <Route path="/register/dhamma-school-student" element={<DhammaSchoolRegistration />} />
      </Routes>

      {/* <Box sx={{ bgcolor: 'background.default' }}>
        <LogoCollection />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </Box> */}
      {/* <ToggleCustomTheme
        showCustomTheme={showCustomTheme}
        toggleCustomTheme={toggleCustomTheme}
      /> */}
    </ThemeProvider>
  );
}
