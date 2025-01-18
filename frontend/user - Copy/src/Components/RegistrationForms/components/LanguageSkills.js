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

const LanguageSkills = ({ setCurrentSection }) => {
  return (
    <>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Language Skills
        </Typography>
        <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {/* <Typography component="h4" variant="body">
                       Choose the software you are familier with:
                    </Typography> */}

                    <FormLabel id="gender">Sinhala</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="sinhala"
                        name="sinhala"
                        >
                        <FormControlLabel value="good" control={<Radio />} label="Good" />
                        <FormControlLabel value="average" control={<Radio />} label="Averaege" />
                        <FormControlLabel value="weak" control={<Radio />} label="Weak" />
                    </RadioGroup>

                    <FormLabel id="gender">Pali</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="pali"
                        name="pali"
                        >
                        <FormControlLabel value="good" control={<Radio />} label="Good" />
                        <FormControlLabel value="average" control={<Radio />} label="Averaege" />
                        <FormControlLabel value="weak" control={<Radio />} label="Weak" />
                    </RadioGroup>

                    <FormLabel id="gender">English</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="english"
                        name="english"
                        >
                        <FormControlLabel value="good" control={<Radio />} label="Good" />
                        <FormControlLabel value="average" control={<Radio />} label="Averaege" />
                        <FormControlLabel value="weak" control={<Radio />} label="Weak" />
                    </RadioGroup>

                    <FormLabel id="gender">Tamil</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="tamil"
                        name="tamil"
                        >
                        <FormControlLabel value="good" control={<Radio />} label="Good" />
                        <FormControlLabel value="average" control={<Radio />} label="Averaege" />
                        <FormControlLabel value="weak" control={<Radio />} label="Weak" />
                    </RadioGroup>

                    <TextField
                        // fullWidth
                        variant='standard'
                        id="otherLanguages"
                        label="Other Languages (mention)"
                        name="otherLanguages"
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Button
                        onClick={() => setCurrentSection('computerLiteracy')}
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
            </Grid>
            
        </Box>
    </>
  )
}

export default LanguageSkills