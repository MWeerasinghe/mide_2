import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const LibraryMembership = () => {
  const [membershipType, setMembershipType] = useState('openMembership');

  return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Typography component="h5" variant="h5">
                Dhamma School Student Registration
            </Typography>

            <NavLink to="/register/dhamma-school-student">
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2}}
                    >
                        Register as Dhamma School Student
                </Button>
            </NavLink>
        </Box>

        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Typography component="h5" variant="h5">
                Library User Membership
            </Typography>

            <NavLink to="/register/open-membership">
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2}}
                    >
                        Apply for Open Membership
                </Button>
            </NavLink>
            
            <NavLink to="/register/student-membership">
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3}}
                    >
                        Apply for Student Membership
                </Button>
            </NavLink>

            <NavLink to="/register/bhikku-membership">
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3}}
                    >
                        Apply for Bhikku Membership
                </Button>
            </NavLink>
        </Box>

        <Box
          sx={{
            marginTop: 8,
            marginBottom: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Typography component="h5" variant="h5">
                Library Staff Membership
            </Typography>

            <NavLink to="/register/library-staff">
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2}}
                    >
                        Apply for Library Staff Membership
                </Button>
            </NavLink>
        </Box>
    </Container>
  )
}

export default LibraryMembership