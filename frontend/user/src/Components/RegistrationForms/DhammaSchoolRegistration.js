import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import PersonalDetails from './components/PersonalDetailsDhammaSchool';
import ContactDetails from './components/ContactDetails';
import NIC from './components/NIC';


export default function OpenMembership() {
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
          <h1>Dhamma School Student</h1>
          {currentSection === 'personalDetails' && <PersonalDetails currentSection={currentSection} setCurrentSection={setCurrentSection}/>}
          {currentSection === 'contactDetails' && <ContactDetails currentSection={currentSection} setCurrentSection={setCurrentSection}/>}
          {currentSection === 'nic' && <NIC currentSection={currentSection} setCurrentSection={setCurrentSection}/>}
        </Box>
    </Container>
  );
}
