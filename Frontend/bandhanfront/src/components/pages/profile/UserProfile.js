import React, { useEffect, useState } from "react";
import { Button, CssBaseline, Grid, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChangePassword from "../auth/ChangePassword";
import { getToken, removeToken } from "../../../services/LocalStorageService";
import { useDispatch } from "react-redux";
import { unsetUserToken } from "../../../features/authSlice";
import { useGetLoggedUserQuery } from "../../../services/userAuthApi";
import { setUserInfo, unsetUserInfo } from "../../../features/userSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";



const UserProfile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {access_token} = getToken()
    const {data, isSuccess} = useGetLoggedUserQuery(access_token)
    console.log("befroe user profile",data)
    const[userData, setUserData] = useState({
        email:"",
        name:""
    })

    //store user data in local state
    useEffect(() => {
        if(data && isSuccess){
            setUserData({
                email:data.user.email,
                name:data.user.name,
                id:data.user.id,
                is_phone_verified:data.user.is_phone_verified,
                is_preferences:data.user.is_preferences
            })
        }
    }, [data, isSuccess])

    //store user data in redux store
    useEffect(() => {
        if(data && isSuccess){
            dispatch(setUserInfo({
                email:data.user.email,
                name:data.user.name,
                id:data.user.id,
                is_phone_verified:data.user.is_phone_verified,
                is_preferences:data.user.is_preferences
            }))
        }
    }, [data, isSuccess, dispatch])

    const UserData = useSelector(state => state.user)
    console.log("user profile after",UserData)

    
    const handleLogout = () => {
        dispatch(unsetUserInfo({name:"",email:""}))
        dispatch(unsetUserToken({access_token:null}))
        removeToken()
        navigate('/login') 
    }

    const handleClick = () => {
        navigate('/userhome');
    }

    return <>
        <CssBaseline />
        <Grid container>
            <Grid item sm={4} sx={{backgroundColor:"#6d1b7b", p:5, color: "white", height:370, marginTop:4}}>
                
                <Typography variant="h6">Name: {userData.name}</Typography>
                <Typography variant="h6">Email: {userData.email}</Typography>
                
                <Box>
                <Button variant="contained" color="warning" size="medium" onClick={handleLogout} sx={{mt:4}}>Logout</Button>
                </Box>
                <Box>
                <Button variant="contained" color="primary" size="large" onClick={handleClick} sx={{mt:4}}>Home</Button>
                </Box>

            </Grid>
            <Grid item sm={8}>
                <ChangePassword />
            </Grid>
        </Grid>
        </>;
};
export default UserProfile;
