import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';  // Ensure Button import from MUI
import DialogBox from './DialogBox';  // Import the DialogBox component
import { Typography, Box, Divider, Grid } from '@mui/material';  // MUI components for layout
import img1 from '../assets/acb1.jpg';  // Replace with the actual image paths
import img2 from '../assets/abc2.jpg';  
import img3 from '../assets/abc3.jpg';  
import img4 from '../assets/abc4.jpg';  
import img5 from '../assets/abc5.jpg';  
import img6 from '../assets/abc6.jpg';  
import img7 from '../assets/abc7.jpg';  
import img8 from '../assets/abc8.jpg';  

function Logout() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);  // To control the dialog box visibility

  // Function to open the dialog box
  const handleOpen = () => {
    setOpen(true);
  };

  // Function to handle closing the dialog box without logging out
  const handleClose = () => {
    setOpen(false);
  };

  // Function to handle the confirmation of logout
  const handleConfirmLogout = () => {
    // Clear authentication data (token)
    localStorage.removeItem('vajira_token');
    localStorage.removeItem('vajira_token_teacher');
    
    // Redirect to the login page
    navigate('/');
  };

  return (
    <div>
      {/* Description Section */}
      <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
  <Typography variant="h5" color="primary" gutterBottom>
    Programs & Services of Sri Vajiraramaya
  </Typography>
  <Divider sx={{ margin: '0 auto', width: '50%' }} />
</Box>


      <Grid container spacing={2}>
        {/* Library Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Box display="flex" alignItems="center">
            <img src={img1} alt="Library Icon" width={50} height={50} />
            <Typography variant="h6" color="primary" sx={{ marginLeft: 1 }}>
              Library (පුස්තකාලය)
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Vajirarama temple furnished and holds a vast selection of books for readers in search of spiritual enlightenment.
          </Typography>
        </Grid>

        {/* Sunday School Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Box display="flex" alignItems="center">
            <img src={img2} alt="Sunday School Icon" width={50} height={50} />
            <Typography variant="h6" color="primary" sx={{ marginLeft: 1 }}>
              Sunday School (දහම්පාසල)
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Thousands of eager young minds are nourished and cultured under the expertise of Vajirarama Dhamma School.
          </Typography>
        </Grid>

        {/* Our Projects Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Box display="flex" alignItems="center">
            <img src={img3} alt="Our Projects Icon" width={50} height={50} />
            <Typography variant="h6" color="primary" sx={{ marginLeft: 1 }}>
              Our Projects (දහම් ව්‍යාපෘති)
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Numerous projects and donations in search of the needy, marking social well-being as our cornerstone.
          </Typography>
        </Grid>

        {/* Meditation School Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Box display="flex" alignItems="center">
            <img src={img4} alt="Meditation School Icon" width={50} height={50} />
            <Typography variant="h6" color="primary" sx={{ marginLeft: 1 }}>
              Meditation School (සති දහම්පාසල)
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Touch your inner sense of peace and get a drip of spiritualism into your day-to-day life.
          </Typography>
        </Grid>

        {/* Publications Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Box display="flex" alignItems="center">
            <img src={img5} alt="Publications Icon" width={50} height={50} />
            <Typography variant="h6" color="primary" sx={{ marginLeft: 1 }}>
              Publications (දහම් ප්‍රකාශන)
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Books published by renowned monks and Dhamma School hold a special place in cultivating society with its essence.
          </Typography>
        </Grid>

        {/* Preachings Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Box display="flex" alignItems="center">
            <img src={img6} alt="Preachings Icon" width={50} height={50} />
            <Typography variant="h6" color="primary" sx={{ marginLeft: 1 }}>
              Preachings (ධර්ම දේශනා)
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Throughout history, preachings of our renowned monks have marked their names with the sound of truth and sincerity.
          </Typography>
        </Grid>

        {/* Poya Programs Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Box display="flex" alignItems="center">
            <img src={img7} alt="Poya Programs Icon" width={50} height={50} />
            <Typography variant="h6" color="primary" sx={{ marginLeft: 1 }}>
              Poya Programs (පෝදින වැඩසටහන්)
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Monthly Poya programs of our temple are a successful event planned carefully to ensure maximum gain of peacefulness to your mind.
          </Typography>
        </Grid>

        {/* Children's Programs Section */}
        <Grid item xs={12} sm={6} md={4}>
          <Box display="flex" alignItems="center">
            <img src={img8} alt="Children's Programs Icon" width={50} height={50} />
            <Typography variant="h6" color="primary" sx={{ marginLeft: 1 }}>
              Children's Programs (ළමා වැඩසටහන්)
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            Specially designed and programmed for children to improve insight into life and address young minds.
          </Typography>
        </Grid>
      </Grid>

      {/* Logout Button */}
      <Button
        variant="contained"  // Changed to contained for a solid background
        color="secondary"    // Used secondary color for contrast
        onClick={handleOpen}
        sx={{
            marginTop: 3,
            backgroundColor: '#f44336',  // Optional: Set a custom red color for logout
            color: 'white',  // Text color
            '&:hover': {
            backgroundColor: '#d32f2f',  // Darker red for hover effect
            },
        }}
        >
        Logout
        </Button>


      {/* DialogBox for confirmation */}
      <DialogBox
        open={open}
        onClose={handleClose}
        onConfirm={handleConfirmLogout}
        title="Confirm Logout"
        content="Are you sure you want to log out?"
      />
    </div>
  );
}

export default Logout;
