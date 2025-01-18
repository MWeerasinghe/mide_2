import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function ContactDetailsStaff({ setCurrentSection }) {
  const [phoneNumber, setPhoneNumber] = useState();

  return (
    <>

        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
            Contact Details
        </Typography>

        <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        type='email'
                        autoComplete="email"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="address"
                        label="Permanemt Address"
                        type="text"
                        id="address"
                        autoComplete="address"
                        multiline
                        rows={3}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="whatsappNumber"
                        label="Whatsapp/Mobile Number"
                        name="whatsappNumber"
                        type='tel'
                        autoComplete="tel"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="landlineNumber"
                        label="Landline Number"
                        name="landlineNumber"
                        type='tel'
                        autoComplete="tel"
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Button
                        onClick={() => setCurrentSection('personalDetails')}
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 5}}
                    >
                        Back
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        onClick={() => setCurrentSection('serviceDays')}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 5}}
                    >
                        Next
                    </Button>
                </Grid>
            </Grid>
        </Box>
    </>
    
  )
}

export default ContactDetailsStaff