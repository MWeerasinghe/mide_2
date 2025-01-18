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
import Checkbox from '@mui/material/Checkbox';

const ServiceDays = ({ setCurrentSection }) => {
  return (
    <>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Service Days
        </Typography>
        <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <Typography component="h4" variant="body">
                       Choose days you prefer to work:
                    </Typography>
                    <FormControlLabel control={<Checkbox />} label="Monday" />
                    <FormControlLabel control={<Checkbox />} label="Tuesday" />
                    <FormControlLabel control={<Checkbox />} label="Wednsday" />
                    <FormControlLabel control={<Checkbox />} label="Thursday" />
                    <FormControlLabel control={<Checkbox />} label="Friday" />
                    <FormControlLabel control={<Checkbox />} label="Saturday" />
                    <FormControlLabel control={<Checkbox />} label="Sunday" />
                </Grid> 
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Button
                        onClick={() => setCurrentSection('contactDetails')}
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 5}}
                    >
                        Back
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        onClick={() => setCurrentSection('computerLiteracy')}
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

export default ServiceDays