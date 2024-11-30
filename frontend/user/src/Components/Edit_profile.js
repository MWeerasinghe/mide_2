// src/EditProfile.js
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Typography, Box, Avatar } from '@mui/material';
import getUserIdFromToken from '../functions/GetUserId';


const EditProfile = () => {
  // const [profile, setProfile] = useState({ name: '', email: '', imageUrl: '' });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
//   const [dbPassword,  setdbPassword] = useState('')

const [profile, setProfile] = useState({ name: '', email: '', photo: '' });

useEffect(() => 
{
  const fetchProfile = async () => 
  {
    try 
    {
      const token = localStorage.getItem('vajira_token');
      const id = getUserIdFromToken();
      if(!id) 
      {
        window.alert('Please login first');
        return <Navigate to="/" />;
      } 
      
      const response = await axios.get(`http://localhost:3000/api/user/user/${id}`, {headers: {'Authorization': `Bearer ${token}`}});
      console.log(response.data.data.user);
      setProfile({
        name: response.data.data.user.name,
        email: response.data.data.user.email
      });
    } 
    catch (error) 
    {
      console.error("Error fetching profile data:", error);
    }
  };

  fetchProfile();
}, []);


  const handlePasswordChange = async () => 
  {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{7,}$/;

    if(password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
    }
    if(!passwordPattern.test(password)) {
        setError("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a number.");
        return;
    }
    // Reset messages
    setError('');
    setSuccessMessage('');

    try
    {
        const token = localStorage.getItem('vajira_token');
        const email = profile.email;
        console.log(email, currentPassword, confirmPassword);
        const response = await axios.put('http://localhost:3000/api/user/user', {email, currentPassword, confirmPassword }, {headers: {'Authorization': `Bearer ${token}`}});
        if(response.status === 200)
        {
            console.log(response);
            setSuccessMessage("Password is changed successfully");
            setPassword('');
            setConfirmPassword('');
            setError('');
        }
        else
        {
            console.log('else',response);
            setError('current password is invalid');
        }
    }
    catch(error)
    {
        setError("Internal server error");
    }       
};


  return (
    <Box sx={{ padding: 1, maxWidth: '600px', margin: 'auto', textAlign: 'center', mt: -4 }}>

      {/* Centered Profile Avatar */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
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
      <Box sx={{ width: '100%', marginBottom: 2 }}>
  {/* Display Name */}
  <Typography variant="h6" sx={{ fontSize: '2rem', fontWeight: 'bold' }}>
    {profile.name}
  </Typography>
</Box>

<Box sx={{ width: '100%' }}>
  {/* Display Email */}
  <Typography variant="body1" sx={{ fontSize: '1rem' }}>
    {profile.email}
  </Typography>
</Box>

      {/* Password Change Section */}
      <Typography variant="h6" color="textSecondary" marginTop={2}>Change Your Password</Typography>

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
