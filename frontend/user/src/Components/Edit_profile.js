// src/EditProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Avatar } from '@mui/material';

const EditProfile = () => {
  const [profile, setProfile] = useState({ name: '', email: '', imageUrl: '' });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
//   const [dbPassword,  setdbPassword] = useState('')

  useEffect(() => {
    const fetchProfile = async () => 
    {
      try {
        const response = await axios.get("http://localhost:4000/api/users/3");
        setProfile({
          name: response.data.user.name,
          email: response.data.user.email,
          imageUrl: response.data.user.image,
        });
        // console.log(response.data);
      } 
      catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, []);

  const handlePasswordChange = async () => 
  {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
    }
    if (!passwordPattern.test(password)) {
        setError("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a number.");
        return;
    }
    // Reset messages
    setError('');
    setSuccessMessage('');

    try
    {
        const response = await axios.put('http://localhost:4000/api/users/3', { password, currentPassword });
        if(response.status === "success")
        {
            setSuccessMessage(response.message);
            setPassword('');
            setConfirmPassword('');
        }
        else
        {
            setError(response.message);
        }
    }
    catch(error)
    {
        setError("Internal server error");
    }
           
};


  return (
    <Box sx={{ padding: 1, maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
      {/* Centered Profile Avatar */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
        <Avatar
          alt={profile.name}
          src={profile.imageUrl}
          sx={{
            width: 100,
            height: 100,
            border: '2px solid orange',
          }}
        />
      </Box>


      {/* Display Name (Read-only) */}
      {/* {console.log("huttaaaa"+profile)} */}
      <TextField
        label="Name"
        value={profile.name}
        InputProps={{
          readOnly: true,
          sx: {
            height: '42px', 
            padding: '4px 8px', 
            fontSize: '0.875rem', 
            },
        }}
        variant="outlined"
        sx={{ width: '100%'}} 
        margin="normal"
      />

      {/* Display Email (Read-only) */}
      <TextField
        label="Email"
        value={profile.email}
        InputProps={{
          readOnly: true,
          sx: {
            height: '42px', 
            padding: '4px 8px', 
            fontSize: '0.875rem', 
            },
        }}
        variant="outlined"
        sx={{ width: '100%' }}
        margin="normal"
      />

      {/* Password Change Section */}
      <Typography variant="h6" color="textSecondary" marginTop={2}>Change Password</Typography>

      <TextField
        label="Current Password"
        type="password"
        value={currentPassword}
        InputProps={{
          sx: {
            height: '42px', 
            padding: '4px 8px', 
            fontSize: '0.875rem', 
            },
        }}
        onChange={(e) => setCurrentPassword(e.target.value)}
        variant="outlined"
        sx={{ width: '100%' }}
        margin="normal"
      />

      <TextField
        label="New Password"
        type="password"
        value={password}
        InputProps={{
          sx: {
            height: '42px', 
            padding: '4px 8px', 
            fontSize: '0.875rem', 
            },
        }}
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
        sx={{ width: '100%' }}
        margin="normal"
      />

      <TextField
        label="Confirm New Password"
        type="password"
        value={confirmPassword}
        InputProps={{
          sx: {
            height: '42px', 
            padding: '4px 8px', 
            fontSize: '0.85rem', 
            },
        }}
        onChange={(e) => setConfirmPassword(e.target.value)}
        variant="outlined"
        sx={{ width: '100%' }}
        margin="normal"
      />

      {/* Error or Success Message */}
      {error && <Typography color="error">{error}</Typography>}
      {successMessage && <Typography color="primary">{successMessage}</Typography>}

      <Button
        variant="contained"
        color="primary"
        onClick={handlePasswordChange}
        sx={{ width: '100%', marginTop: 2 }}
      >
        Update Password
      </Button>
    </Box>
  );
};

export default EditProfile;
