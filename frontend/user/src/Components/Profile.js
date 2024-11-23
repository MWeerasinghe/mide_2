// src/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState({ name: '', photo: '' });

  useEffect(() => {
    // Fetch user data here, replace with actual API endpoint
    axios.get('/api/user/profile')
      .then(response => {
        setProfile({
          name: response.data.name,
          photo: response.data.photo, // assuming photo URL is returned
        });
      })
      .catch(error => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginBottom: '20px' }}>
      <img
        src={profile.photo || 'https://scontent.fcmb4-2.fna.fbcdn.net/v/t39.30808-6/459190714_1928817497620443_6842674175914875401_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeG7chhinSN8w4oQqH4XIMI3J6JQtG-9leknolC0b72V6UWdYE9sr3R00m8HTVMaqR7SgynRzuamAJvtCPYW1r15&_nc_ohc=AKECKbsqCYsQ7kNvgEO1G51&_nc_zt=23&_nc_ht=scontent.fcmb4-2.fna&_nc_gid=ASayuQ1C8Ss2ydP7bc2cpoW&oh=00_AYDiQ21MLdoktiUlQjqrEhpLnQT9qrOr1GiozNE9iTRvVg&oe=6736C04A'} // Default image if no photo is available
        alt="Profile"
        style={{
          width: '90%',
          height: '400px',
        //   borderRadius: '50%',
          marginBottom: '15px',
          border: '2px solid orange'
        }}
      />
      {/* <h2 style={{ margin: 0, color: '#e97100' }}>{profile.name || 'User Name'}</h2> */}
      
      {/* Buttons for Library and LMS Access */}
      <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
      <Button
  variant="contained"
  color="primary"
  component={Link}
  to="/library-access"
  style={{
    backgroundColor: '#e97100',
    padding: '22px 24px',  // Increases padding
    fontSize: '1.1rem',    // Increases font size
    width: '200px',        // Adjusts width as needed
  }}
>
  Library
</Button>

<Button
  variant="contained"
  color="secondary"
  component={Link}
  to="/lms-access"
  style={{
    backgroundColor: '#0074e9',
    padding: '22px 24px',  // Increases padding
    fontSize: '1.1rem',    // Increases font size
    width: '200px',        // Adjusts width as needed
  }}
>
LMS
</Button>
      </div>
    </div>
  );
};

export default Profile;
