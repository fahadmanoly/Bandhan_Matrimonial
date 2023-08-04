import React from "react";
import {AppBar, Grid, Toolbar, Typography, Button, Container, IconButton} from '@mui/material';
import {NavLink, useNavigate } from "react-router-dom";
import {getToken, removeToken} from '../../services/LocalStorageService';
import {unsetUserInfo } from "../../features/userSlice";
import { unsetUserToken } from "../../features/authSlice";
import { useDispatch } from "react-redux";

const Navbar = () => {
    const {access_token} = getToken()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(unsetUserInfo({name:"",email:""}))
        dispatch(unsetUserToken({access_token:null}))
        removeToken()
        navigate('/login') 
    }

    return <>
     <AppBar position="static" color="secondary">
       <Container maxWidth="xl" xl={12}>
         <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">BM</IconButton>
            <Typography variant="h6" component="div" sx={{flexGrow:1}}>Bandhan</Typography>
            <Grid container spacing={2} justifyContent="flex-end">
                <Grid item>
                    <Button component={NavLink} to='/' style={({isActive})=>{return{backgroundColor:isActive ? '#6d1b7b' :''}}} sx={{color:'white', textTransform:'none'}}>Home</Button>
                </Grid>
                <Grid item>
                    <Button component={NavLink} to='/contact' style={({isActive})=>{return{backgroundColor:isActive ? '#6d1b7b' :''}}} sx={{color:'white', textTransform:'none'}}>Contact</Button>
                </Grid>
                <Grid item>
                    {access_token? <Button variant="contained" color="warning" onClick={handleLogout} component={NavLink} to='/login' style={({isActive})=>{return{backgroundColor:isActive ? '#6d1b7b' :''}}} sx={{color:'white', textTransform:'none'}}>Logout</Button> : <Button component={NavLink} to='/login' style={({isActive})=>{return{backgroundColor:isActive ? '#6d1b7b' :''}}} sx={{color:'white', textTransform:'none'}}>Login</Button>}
                </Grid>
            </Grid>
         </Toolbar> 
       </Container>          
    </AppBar>

    </>;
}

export default Navbar;
