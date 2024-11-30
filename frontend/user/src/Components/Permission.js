import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, Divider, ToggleButton } from '@mui/material';
import axios from 'axios';
import getUserIdFromToken from '../functions/GetUserId';

const Permission = () => {
  const [lib, setLib] = useState(false);
  const [dhamma, setDhamma] = useState(false);

  useEffect(() => {
    const fetchPermission = async () => {
      try {
        const token = localStorage.getItem('vajira_token');
        const id = getUserIdFromToken();
        if (!id) {
          window.alert('Please login first');
          return;
        }
        const permisionData = await axios.get(`http://localhost:3000/api/user/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(permisionData.data.data.libMemberOpen);
        console.log(permisionData.data.data.libMemberStudent);

        if (permisionData.data.data.libMemberOpen !== null) {
          setLib(true);
        }
        if (permisionData.data.data.libMemberStudent !== null) {
          setDhamma(true);
        }
      } catch (error) {
        console.error('Error fetching permission data:', error);
      }
    };

    fetchPermission();
  }, []);

  const permissions = [
    { name: 'Physical Library', accessible: lib },
    { name: 'Dhamma School', accessible: dhamma },
  ];

  return (
    <div>
      <Typography variant="h5" color="primary" gutterBottom sx={{ textAlign: 'center' }} >Your Permissions</Typography>


      <Divider sx={{ marginBottom: 2 }} />

      {/* Accessible and Inaccessible Sections */}
      <List dense>
        {permissions.map((permission, index) => (
          <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <ListItemText
            primary={permission.name}
            sx={{
              color: permission.accessible ? 'success.main' : 'error.main',
              fontSize: '1 rem', // Set font size here
              fontWeight: '', // Optional: Adjust font weight for emphasis
            }}
          />

            <ToggleButton
                value="check"
                selected={permission.accessible}
                disabled // Disable the button to prevent state changes
                sx={{
                  border: '2px solid',
                  borderColor: permission.accessible ? 'success.main' : 'error.main',
                  backgroundColor: permission.accessible ? 'success.light' : 'error.light',
                  color: permission.accessible ? 'success.contrastText' : 'error.contrastText',
                  padding: '8px 16px',
                  minWidth: '100px', // Ensures consistent size
                  fontWeight: 'bold',
                  borderRadius: '8px', // Makes the button more stylish
                  fontSize: '0.775rem', // Adjusts font size
                  textTransform: 'uppercase', // Makes text look prominent
                  ':hover': {
                    backgroundColor: permission.accessible
                      ? 'success.dark'
                      : 'error.dark',
                    color: '#fff',
                  },
                }}
              >
                {permission.accessible ? 'Active' : 'Inactive'}
              </ToggleButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Permission;
