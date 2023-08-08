import React, { useState } from "react";
import { AppBar, Grid, Toolbar, Typography, Button, Container, IconButton, Menu, MenuItem } from '@mui/material';
import { NavLink, useNavigate } from "react-router-dom";
import { getToken, removeToken } from '../../services/LocalStorageService';
import { unsetUserInfo } from "../../features/userSlice";
import { unsetUserToken } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import UserProfile from "../pages/profile/UserProfile";

const Navbar = () => {
  const { access_token } = getToken()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null);
  //const [showPasswordChange, setShowPasswordChange] = useState(false); 

  const handleLogout = () => {
    dispatch(unsetUserInfo({ name: "", email: "" }))
    dispatch(unsetUserToken({ access_token: null }))
    removeToken()
    navigate('/login')
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePasswordChange = () => {
    navigate('/userprofile');
    handleMenuClose();
  };

  const handleProfilePicture = () => {
    navigate('/profilepicture');
    handleMenuClose();
  };

  return (
    <AppBar position="static" color="secondary">
      <Container maxWidth="xl" xl={12}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">BM</IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Bandhan</Typography>
          
          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item>
              <Button component={NavLink} to='/' activeStyle={{ backgroundColor: '#6d1b7b' }} sx={{ color: 'white', textTransform: 'none' }}>Home</Button>
            </Grid>

            <Grid item>
              <Button component={NavLink} to='/contact' activeStyle={{ backgroundColor: '#6d1b7b' }} sx={{ color: 'white', textTransform: 'none' }}>Contact</Button>
            </Grid>

            <Grid item>
              {access_token ? (
                <>
                  <Button
                    aria-controls="user-menu"
                    aria-haspopup="true"
                    onClick={handleMenuClick}
                    sx={{ color: 'white', textTransform: 'none' }}
                  >
                    Profile
                  </Button>

                  <Menu
                    id="user-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleMenuClose}>Update Profile</MenuItem>
                    <MenuItem onClick={handleMenuClose}>User Account</MenuItem>
                    <MenuItem onClick={handleProfilePicture}>Upload Image</MenuItem> 
                    <MenuItem onClick={handlePasswordChange}>Change Password</MenuItem> 
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <Button component={NavLink} to='/login' activeStyle={{ backgroundColor: '#6d1b7b' }} sx={{ color: 'white', textTransform: 'none' }}>Login</Button>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
