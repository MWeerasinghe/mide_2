import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useFormContext, Controller } from 'react-hook-form';

function CreatePassword({ setCurrentSection }) {
    const { control, formState: { errors }} = useFormContext();

  return (
    <>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
            Create Password
        </Typography>

        <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="password"
                                label="Password"
                                fullWidth
                                autoComplete="password"
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Controller
                        name="confirmPassword"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                id="confirmPassword"
                                label="Confirm Password"
                                fullWidth
                                autoComplete="confirmPassword"
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword?.message}
                            />
                        )}
                    />
                </Grid>

                <Grid item xs={12}>
                    <FormControlLabel required control={<Checkbox />} label="I hereby declare that I will abide by the rules and regulations pertaining to membership." />
                </Grid>


            </Grid>
        </Box>
    </>
    
  )
}

export default CreatePassword