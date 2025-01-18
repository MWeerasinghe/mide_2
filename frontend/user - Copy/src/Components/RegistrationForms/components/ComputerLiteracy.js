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

const ComputerLiteracy = ({ setCurrentSection }) => {
  return (
    <>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Computer Literacy
        </Typography>
        <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <Typography component="h4" variant="body">
                       Choose the software you are familier with:
                    </Typography>
                    <FormControlLabel control={<Checkbox />} label="Microsoft Word" />
                    <FormControlLabel control={<Checkbox />} label="Microsoft Excel" />
                    <TextField
                        // fullWidth
                        variant='standard'
                        id="otherSoftware"
                        label="Other Software (mention)"
                        name="otherSoftware"
                    />
                </Grid>
                <Grid item xs={12} >
                    <Typography component="h4" variant="body">
                       Typing skills:
                    </Typography>
                    <FormControlLabel control={<Checkbox />} label="Sinhala (Wijesekara)" />
                    <FormControlLabel control={<Checkbox />} label="English" />
                </Grid> 
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Button
                        onClick={() => setCurrentSection('serviceDays')}
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 5}}
                    >
                        Back
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Button
                        onClick={() => setCurrentSection('languageSkills')}
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

export default ComputerLiteracy