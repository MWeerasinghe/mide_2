import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import axios from 'axios';

// Form Components
import PersonalDetails from './components/PersonalDetails';
import ContactDetails from './components/ContactDetails';
import NIC from './components/NIC';
import CreatePassword from './components/CreatePassword';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const personalDetailsSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  dob: z.string().min(1, 'Date of Birth is required'),
  gender: z.string().min(1, 'Gender is required'),
  school: z.string().optional(),
});

const contactDetailsSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required') 
    .email('Invalid email address'),

  mobilePhone: z
    .string()
    .min(1, 'Mobile Number is required') 
    .regex(/^0[0-9]{9}$/, {
      message: 'Mobile number must start with 0 and contain exactly 10 digits',
    }),

  landPhone: z
    .string()
    .optional() 
    .refine(
      (value) => !value || /^0[0-9]{9}$/.test(value), 
      { message: 'Landline number must start with 0 and contain exactly 10 digits' }
    ),

  address: z.string().min(1, 'Address is required'),
});

const nicSchema = z.object({
  nicNumber: z.string().min(1, 'NIC Number is required'),
  
  nicPhoto: z
    .custom((files) => files instanceof FileList || files === undefined)
    .refine((files) => files && files.length > 0, { message: 'Please upload your NIC photo' })
    .refine(
      (files) =>
        files &&
        (files[0].type.includes('image') || files[0].type.includes('pdf')),
      { message: 'NIC photo must be an image or PDF file' }
    ),
  confirmationLetter: z
    .custom((files) => files instanceof FileList || files === undefined)
    .refine((files) => files && files.length > 0, { message: 'Please upload the confirmation letter' })
    .refine(
      (files) =>
        files &&
        (files[0].type.includes('image') || files[0].type.includes('pdf')),
      { message: 'Confirmation letter must be an image or PDF file' }
    ),
});

const passwordSchema = z.object({
  password: z.string().min(7, 'Password must be at least 7 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

const formSchema = z.object({
  ...personalDetailsSchema.shape,
  ...contactDetailsSchema.shape,
  ...nicSchema.shape,
  ...passwordSchema.shape,
});

export default function OpenMembership() {
  const [currentSection, setCurrentSection] = useState('personalDetails');
  
  const methods = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
    // defaultValues: {
    //   firstName: '',
    //   lastName: '',
    //   dob: '',
    //   gender: '',
    //   school: '',
    //   email: '',
    //   phone: '',
    //   nicNumber: '',
    //   nicImage: '',
    // },
  });

  const sectionFields = {
    personalDetails: ['firstName', 'lastName', 'dob', 'gender', 'school'],
    contactDetails: ['email', 'mobilePhone', 'landPhone', 'address'],
    nic: ['nicNumber', 'nicImage'],
    createPassword: ['password', 'confirmPassword'],
  };

  // Handle navigation
  const handleNext = async () => {
    const isValid = await methods.trigger(sectionFields[currentSection]); // Validate current section
    if (!isValid) return;

    if (currentSection === 'personalDetails') setCurrentSection('contactDetails');
    else if (currentSection === 'contactDetails') setCurrentSection('nic');
    else if (currentSection === 'nic') setCurrentSection('createPassword');
  };

  const handleBack = () => {
    if (currentSection === 'contactDetails') setCurrentSection('personalDetails');
    else if (currentSection === 'nic') setCurrentSection('contactDetails');
    else if (currentSection === 'createPassword') setCurrentSection('nic');
  };

  // Submit handler
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/api/form/open', data);
      console.log(response.data);
      alert('Signup Successful!');
    } catch (error) {
      console.error(error);
    }
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
          <h1>Open Membership</h1>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>

              {/* Render current section */}
              {currentSection === 'personalDetails' && (
                <PersonalDetails currentSection={currentSection} setCurrentSection={setCurrentSection} />
              )}
              {currentSection === 'contactDetails' && (
                <ContactDetails currentSection={currentSection} setCurrentSection={setCurrentSection} />
              )}
              {currentSection === 'nic' && (
                <NIC currentSection={currentSection} setCurrentSection={setCurrentSection} />
              )}
              {currentSection === 'createPassword' && (
                <CreatePassword currentSection={currentSection} setCurrentSection={setCurrentSection} />
              )}

              {/* Handle Buttons */}
              <Grid container spacing={2}>
                {currentSection !== 'personalDetails' && (
                  <Grid item xs={12} sm={6}>
                    <Button
                      onClick={handleBack}
                      fullWidth
                      variant="outlined"
                      sx={{ mt: 5}}
                    >
                      Back
                    </Button>
                  </Grid>
                )}
                {currentSection !== 'createPassword' && (
                  <Grid item xs={12} sm={6}>
                      <Button
                        onClick={handleNext}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 5}}
                      >
                        Next
                      </Button>
                  </Grid>
                )}
                {currentSection == 'createPassword' && (
                  <Grid item xs={12} sm={6}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 5}}
                      >
                        Register
                      </Button>
                  </Grid>
                )}
              </Grid>
            </form>
          </FormProvider>
        </Box>
    </Container>
  );
}
