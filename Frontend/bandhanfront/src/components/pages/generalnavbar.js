import React from "react";
import {AppBar, Box, Toolbar, Typography, Button} from '@mui/material';
import {NavLink } from "react-router-dom";
import {getToken} from '../../services/LocalStorageService';

const Navbar = () => {
    const {access_token} = getToken()
    return <>
        <Box sx={{flexGrow:1}}>
            <AppBar position="static" color="secondary">
                 <Toolbar>
                    <Typography variant="h5" component="div" sx={{flexGrow:1}}>BANDHAN</Typography>
                    <Button component={NavLink} to='/' style={({isActive})=>{return{backgroundColor:isActive ? '#6d1b7b' :''}}} sx={{color:'white', textTransform:'none'}}>Home</Button>
                    <Button component={NavLink} to='/contact' style={({isActive})=>{return{backgroundColor:isActive ? '#6d1b7b' :''}}} sx={{color:'white', textTransform:'none'}}>Contact</Button>
                    {access_token? <Button component={NavLink} to='/userinfo' style={({isActive})=>{return{backgroundColor:isActive ? '#6d1b7b' :''}}} sx={{color:'white', textTransform:'none'}}>Profile</Button> : <Button component={NavLink} to='/login' style={({isActive})=>{return{backgroundColor:isActive ? '#6d1b7b' :''}}} sx={{color:'white', textTransform:'none'}}>Login</Button>}
                 </Toolbar>           
            </AppBar>
        </Box>
    </>;
}

export default Navbar;