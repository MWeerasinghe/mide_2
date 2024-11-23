// src/Permission.js
import React, { useState } from 'react';
import { Typography, List, ListItem, ListItemText, Box, Divider, ToggleButton } from '@mui/material';

const Permission = () => {
  // Dummy data representing sections with initial active/inactive states
  const [permissions, setPermissions] = useState([
    { name: "Physical Library Access", accessible: true },
    { name: "Digital Library", accessible: true },
    { name: "LMS", accessible: true },
 
  ]);

  // Toggle the accessibility of a section
  const handleToggle = (index) => {
    setPermissions((prevPermissions) =>
      prevPermissions.map((perm, i) =>
        i === index ? { ...perm, accessible: !perm.accessible } : perm
      )
    );
  };

  return (
    // <Box sx={{ maxWidth: '600px', margin: 'auto', padding: '16px', boxShadow: 3, borderRadius: 2 }}>
    <div>
      <Typography variant="h5" color="primary" gutterBottom>User Permissions</Typography>

      <Divider sx={{ marginBottom: 2 }} />

      {/* Accessible and Inaccessible Sections */}
      <List dense>
        {permissions.map((permission, index) => (
          <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <ListItemText
              primary={permission.name}
              sx={{
                color: permission.accessible ? 'success.main' : 'error.main',
              }}
            />
            <ToggleButton
              value="check"
              selected={permission.accessible}
              onChange={() => handleToggle(index)}
              sx={{
                border: '1px solid',
                borderColor: permission.accessible ? 'success.main' : 'error.main',
                bgcolor: permission.accessible ? 'success.light' : 'error.light',
                color: permission.accessible ? 'success.contrastText' : 'error.contrastText',
                ':hover': { bgcolor: permission.accessible ? 'success.dark' : 'error.dark' },
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
