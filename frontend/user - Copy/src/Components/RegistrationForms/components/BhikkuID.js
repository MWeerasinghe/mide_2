import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const NIC = ({ setCurrentSection }) => {

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                {/* < LockOutlinedIcon /> */}
            </Avatar>
            <Typography component="h1" variant="h5">
                Prove Your Identity
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="nicNumber"
                            label="NIC Number"
                            name="nicNumber"
                            type='text'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="h4" variant="body">
                            Upload a clear photo of your NIC (both sides):
                        </Typography>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload NIC
                            <VisuallyHiddenInput type="file" />
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="h4" variant="body">
                            Upload the recommendation letter:
                        </Typography>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload Recommendation Letter
                            <VisuallyHiddenInput type="file" />
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel required control={<Checkbox />} label="I hereby declare that I will abide by the rules and regulations pertaining to membership." />
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
                        onClick={() => setCurrentSection('nic')}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 5}}
                    >
                        Register
                    </Button>
                </Grid>
            </Grid>
            </Box>
        </>
    )
}

export default NIC