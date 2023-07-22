import React from "react";
import { Button, CssBaseline, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChangePassword from "../auth/ChangePassword";


const UserProfile = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        navigate('/login')
        
    }
    return <>
        <CssBaseline />
        <Grid container>
            <Grid item sm={4} sx={{backgroundColor:"gray", p:5, color: "white"}}>
                <h1>User Home Page</h1>
                <Typography variant="h5">Email: fahadmanoly@gmail.com</Typography>
                <Typography variant="h6">Name: Fahad</Typography>
                <Button variant="contained" color="warning" size="large" onClick={handleLogout} sx={{mt:4}}>Logout</Button>
            </Grid>
            <Grid item sm={8}>
                <ChangePassword />
            </Grid>
        </Grid>
        </>;
};
export default UserProfile;
