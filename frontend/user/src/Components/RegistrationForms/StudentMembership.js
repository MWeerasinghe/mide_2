import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import PersonalDetails from './components/StudentPersonalDetails';
import ContactDetails from './components/ContactDetails';
import NIC from './components/StudentID';

const StudentMembership = () => {
    const [currentSection, setCurrentSection] = useState('personalDetails');
  
    return (
      <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 15,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h1>Student Membership</h1>
            {currentSection === 'personalDetails' && <PersonalDetails currentSection={currentSection} setCurrentSection={setCurrentSection}/>}
            {currentSection === 'contactDetails' && <ContactDetails currentSection={currentSection} setCurrentSection={setCurrentSection}/>}
            {currentSection === 'nic' && <NIC currentSection={currentSection} setCurrentSection={setCurrentSection}/>}
          </Box>
      </Container>
    )
}

export default StudentMembership