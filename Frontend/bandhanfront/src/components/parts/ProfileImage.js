import React, { useState, useEffect } from 'react';
import { Box, Avatar, Typography } from '@mui/material';

const ProfileImage = () => {
  const [profileImageUrl, setProfileImageUrl] = useState('');

  // Fetch the profile image URL from the backend (replace 'backend-url' with your actual backend endpoint)
  useEffect(() => {
    fetch('http://127.0.0.1:8000/media/profilePictures/Bollywood-hero-Zayed-Khan.jpg.jpg')
      .then((response) => response.json())
      .then((data) => {
        // Assuming your backend returns an object with 'imageUrl' field containing the URL
        setProfileImageUrl(data.imageUrl);
      })
      .catch((error) => {
        console.error('Error fetching profile image:', error);
      });
  }, []);

  return (
    <Box sx={{ width:'70%', maxWidth:'250px', height:'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', border: '1px solid #ccc', borderRadius: '4px', marginTop:8}}>
      {profileImageUrl ? (
        <Avatar alt="Profile Image" src={profileImageUrl} sx={{ width: 80, height: 80, marginTop:4 }} />
      ) : (
        <Avatar sx={{ width: 80, height: 80, marginTop:4 }} /> // Fallback if image URL is not available
      )}
      <Typography variant="h6">John Doe</Typography>
      <Typography variant="body2">john.doe@example.com</Typography>
    </Box>
  );
};

export default ProfileImage;

