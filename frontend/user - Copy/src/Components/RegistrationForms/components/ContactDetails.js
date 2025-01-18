import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { useFormContext, Controller } from 'react-hook-form';

function ContactDetails({ setCurrentSection }) {
    const { control, formState: { errors }} = useFormContext();

  return (
    <>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
            Contact Details
        </Typography>

        <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="email"
                                label="Email"
                                fullWidth
                                autoComplete="email"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Controller
                        name="address"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="address"
                                label="Permanemt Address"
                                fullWidth
                                autoComplete="address"
                                error={!!errors.address}
                                helperText={errors.address?.message}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Controller
                        name="mobilePhone"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="mobilePhone"
                                label="Whatsapp/Mobile Number"
                                fullWidth
                                autoComplete="mobilePhone"
                                error={!!errors.mobilePhone}
                                helperText={errors.mobilePhone?.message}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Controller
                        name="landPhone"
                        control={control}
                        // defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="landPhone"
                                label="Landline Number"
                                fullWidth
                                autoComplete="landPhone"
                                error={!!errors.landPhone}
                                helperText={errors.landPhone?.message}
                            />
                        )}
                    />
                </Grid>
            </Grid>

            {/* <Grid container spacing={2}>
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
                        onClick={() => setCurrentSection('nic')}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 5}}
                    >
                        Next
                    </Button>
                </Grid>
            </Grid> */}
        </Box>
    </>
    
  )
}

export default ContactDetails