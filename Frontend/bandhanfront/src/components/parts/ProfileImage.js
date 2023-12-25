import React, { useState, useEffect } from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { getToken } from '../../services/LocalStorageService';

const ProfileImage = () => {
  const {access_token} = getToken()
  const [profilePictures, setProfilePictures] = useState([]);
  const [profileImageUrl, setProfileImageUrl] = useState('');

  // Fetch the profile image URL from the backend (replace 'backend-url' with your actual backend endpoint)
  useEffect(() => {
    fetch('http://13.53.135.5/api/user/image/', {
      headers:{
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Assuming your backend returns an object with 'imageUrl' field containing the URL
        setProfilePictures(data);
        if (data.length > 0) {
          setProfileImageUrl(data[0].image);
        }
      })
      .catch((error) => {
        console.error('Error fetching profile image:', error);
      });
  }, []);

  return (
    <Box sx={{ width:'90%', maxWidth:'250px', height:'90%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', border: '1px solid #ccc', borderRadius: '4px', marginTop:8}}>
      {profileImageUrl ? (
        <Avatar alt="Profile Image" src={`http://13.53.135.5${profileImageUrl}`} sx={{ width: '100%', height: '100%', borderRadius:0}} />
      ) : (
        <Avatar sx={{ width: 100, height: 100, marginTop:4 }} /> // Fallback if image URL is not available
      )}
      {/* <Typography variant="h6">John Doe</Typography>
      <Typography variant="body2">john.doe@example.com</Typography> */}
    </Box>
  );
};

export default ProfileImage;

