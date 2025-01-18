import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, Divider, ToggleButton, Card, CardContent, Button, Grid, Box } from '@mui/material';
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

        if (
          permisionData.data.data.libMemberOpen !== null ||
          permisionData.data.data.libMemberStudent !== null ||
          permisionData.data.data.libMemberThero !== null ||
          permisionData.data.data.libStaff !== null
        ) {
          setLib(true);
        }
        if (
          permisionData.data.data.dhamStaff !== null ||
          permisionData.data.data.dhamStudent !== null ||
          permisionData.data.data.dhamTeacher !== null
        ) {
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
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4, padding: 2, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" color="primary" align="center" gutterBottom>
        Your Permissions
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Permissions List */}
      <Grid container spacing={2}>
        {permissions.map((permission, index) => (
          <Grid item xs={12} key={index}>
            <Card variant="outlined" sx={{ borderColor: permission.accessible ? 'success.main' : 'error.main' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: permission.accessible ? 'success.main' : 'error.main',
                      fontWeight: 'bold',
                    }}
                  >
                    {permission.name}
                  </Typography>
                  <ToggleButton
                    value="check"
                    selected={permission.accessible}
                    disabled
                    sx={{
                      border: '2px solid',
                      borderColor: permission.accessible ? 'success.main' : 'error.main',
                      backgroundColor: permission.accessible ? 'success.light' : 'error.light',
                      color: permission.accessible ? 'success.contrastText' : 'error.contrastText',
                      padding: '8px 16px',
                      minWidth: '100px',
                      fontWeight: 'bold',
                      borderRadius: '8px',
                      fontSize: '0.775rem',
                      textTransform: 'uppercase',
                      ':hover': {
                        backgroundColor: permission.accessible ? 'success.dark' : 'error.dark',
                        color: '#fff',
                      },
                    }}
                  >
                    {permission.accessible ? 'Active' : 'Inactive'}
                  </ToggleButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Additional Options */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Need Additional Permissions?
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href="/request-library-permission"
          sx={{ mr: 2 }}
        >
          Request Library Access
        </Button>
        <Button
          variant="contained"
          color="secondary"
          href="/request-dhamma-permission"
        >
          Request Dhamma School Access
        </Button>
      </Box>
    </Box>
  );
};

export default Permission;
