import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import PersonalDetails from './components/PersonalDetails';
import ContactDetailsStaff from './components/ContactDetailsStaff';
import NIC from './components/NIC';
import ServiceDays from './components/ServiceDays';
import ComputerLiteracy from './components/ComputerLiteracy';
import LanguageSkills from './components/LanguageSkills';


export default function LibraryStaffRegistration() {
  const [currentSection, setCurrentSection] = useState('personalDetails');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

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
          <h1>Library Staff Membership</h1>
          {currentSection === 'personalDetails' && <PersonalDetails currentSection={currentSection} setCurrentSection={setCurrentSection}/>}
          {currentSection === 'contactDetails' && <ContactDetailsStaff currentSection={currentSection} setCurrentSection={setCurrentSection}/>}
          {currentSection === 'serviceDays' && <ServiceDays currentSection={currentSection} setCurrentSection={setCurrentSection}/>}
          {currentSection === 'computerLiteracy' && <ComputerLiteracy currentSection={currentSection} setCurrentSection={setCurrentSection}/>}
          {currentSection === 'languageSkills' && <LanguageSkills currentSection={currentSection} setCurrentSection={setCurrentSection}/>}
          {currentSection === 'nic' && <NIC currentSection={currentSection} setCurrentSection={setCurrentSection}/>}
        </Box>
    </Container>
  );
}
