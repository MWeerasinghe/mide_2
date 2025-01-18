import React from 'react';
import { Typography, Box, Divider, Paper, List, ListItem, ListItemText } from '@mui/material';

export default function AboutPage() {
  return (
    <Box sx={{ padding: 3, maxWidth: 800, margin: 'auto' }}>
      {/* Header Section */}
      <Typography variant="h4" color="primary" align="center" gutterBottom>
        About Us
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Introduction Section */}
      <Paper elevation={3} sx={{ padding: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Who We Are
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to our platform! We are dedicated to providing a seamless experience for managing student activities, digital libraries, and physical resources. 
          Our system integrates cutting-edge technology to ensure efficiency and accessibility for everyone.
        </Typography>
      </Paper>

      {/* Features Section */}
      <Paper elevation={3} sx={{ padding: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Features
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Seamless integration of digital and physical library systems." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Dhamma school management for students, teachers, and staff." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Efficient attendance tracking using modern technologies." />
          </ListItem>
          <ListItem>
            <ListItemText primary="User-friendly interfaces for managing and accessing resources." />
          </ListItem>
        </List>
      </Paper>

      {/* Vision and Mission Section */}
      <Paper elevation={3} sx={{ padding: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Our Vision and Mission
        </Typography>
        <Typography variant="body1" paragraph>
          Our vision is to empower educational institutions with technology-driven solutions, creating an environment that fosters learning and development.
        </Typography>
        <Typography variant="body1">
          Our mission is to bridge the gap between traditional and modern resource management, enabling seamless interactions for students, teachers, and staff.
        </Typography>
      </Paper>

      {/* Contact Section */}
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Get in Touch
        </Typography>
        <Typography variant="body2">
          Email: vajirarama@gmail.com | Phone: +94740067987
        </Typography>
      </Box>
    </Box>
  );
}
