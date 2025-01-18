import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import { useFormContext, Controller } from 'react-hook-form';

const PersonalDetails = ({ setCurrentSection }) => {
    const { control, formState: { errors }} = useFormContext();

    return (
        <>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Personal Details
            </Typography>
            <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <Controller
                            name="firstName"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    id="firstName"
                                    label="First Name"
                                    fullWidth
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message}
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12} >
                        <Controller
                            name="lastName"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    id="lastName"
                                    label="Last Name"
                                    fullWidth
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                />
                            )}
                        />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Controller
                            name="dob"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                            <TextField
                                {...field}
                                label="Date of Birth"
                                type="date"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                error={!!errors.dob}
                                helperText={errors.dob?.message} 
                            />
                            )}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormLabel id="gender">Gender</FormLabel>
                        <Controller
                            name="gender"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                            <RadioGroup
                                {...field}
                                row
                                aria-labelledby="gender"
                                onChange={(e) => field.onChange(e.target.value)}
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                            )}
                        />
                        {errors.gender && (
                            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                {errors.gender.message}
                            </Typography>
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        <Controller
                        name="school"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                            {...field}
                            id="school"
                            label="School/University (Students Only)"
                            fullWidth
                            />
                        )}
                        />
                    </Grid>  
                </Grid>
            </Box>
        </>
    )
}

export default PersonalDetails