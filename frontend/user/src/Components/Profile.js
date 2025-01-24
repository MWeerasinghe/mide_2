// src/Profile.js
import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mui/material';
import DashImg from '../assets/vajira.jpg';
import getUserIdFromToken from '../functions/GetUserId';
import firstlogo from '../assets/logo10.jpg';


const Profile = () => 
{
  const [profile, setProfile] = useState({ name: '', email: '', name: '' });

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
        
        const response = await axios.get(`http://localhost:3000/api/auth/user/${id}`, {headers: {'Authorization': `Bearer ${token}`}});
        setProfile({
          name: response.data.name,
          email: response.data.email,
          name: response.data.name
        });
      } 
      catch (error) 
      {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, []);


  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: '20px' }}>
          <img src={firstlogo} alt="Children's Programs Icon" width={1150} height={90} />
      <img
        src={profile.photo || DashImg} // Default image if no photo is available
        alt="Profile"
        style={{
          width: '100%',
          height: '400px',
          marginBottom: '15px',
          // border: '1px solid orange',
          borderRadius: '4px', // Slightly round corners
          // boxShadow: '0px 0px 30px 15px rgba(255, 255, 255, 0.5)', // Blurred corners
          filter: 'blur(0.5px)', // Slight blur for the edges
          backgroundColor: 'transparent', // Matches the background if necessary
        }}
      />

      {/* <h2 style={{ margin: 0, color: '#e97100' }}>{profile.name || 'User Name'}</h2> */}
      
      {/* Buttons for Library and LMS Access */}
      <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
      <Button
  variant="contained"
  color="primary"
  href="http://localhost:4001/lmsPart1"
  target="_blank" // Opens the link in a new tab
  rel="noopener noreferrer" // Improves security for external links
  style={{
    backgroundColor: '#0074e9',
    padding: '22px 14px',
    fontSize: '1.1rem',
    width: '200px',
  }}
>
  Library
</Button>

      <Button
  variant="contained"
  color="secondary"
  href="https://ab56-192-248-22-102.ngrok-free.app/"
  target="_blank" // Opens the link in a new tab
  rel="noopener noreferrer" // Improves security for external links
  style={{
    backgroundColor: '#0074e9',
    padding: '22px 14px',
    fontSize: '1.1rem',
    width: '200px',
  }}
>
  Dhamma School
</Button>

      </div>
    </div>
  );
};

export default Profile;
