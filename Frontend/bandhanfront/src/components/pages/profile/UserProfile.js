import React, { useEffect, useState } from "react";
import { Button, CssBaseline, Grid, Typography } from "@mui/material";
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
    const[userData, setUserData] = useState({
        email:"",
        name:""
    })

    //store user data in local state
    useEffect(() => {
        if(data && isSuccess){
            setUserData({
                email:data.email,
                name:data.name,
                id:data.id,
                is_phone_verified:data.is_phone_verified,
                is_preferences:data.is_preferences
            })
        }
    }, [data, isSuccess])

    //store user data in redux store
    useEffect(() => {
        if(data && isSuccess){
            dispatch(setUserInfo({
                email:data.email,
                name:data.name,
                id:data.id,
                is_phone_verified:data.is_phone_verified,
                is_preferences:data.is_preferences
            }))
        }
    }, [data, isSuccess, dispatch])



    
    const handleLogout = () => {
        dispatch(unsetUserInfo({name:"",email:""}))
        dispatch(unsetUserToken({access_token:null}))
        removeToken()
        navigate('/login') 
    }
    return <>
        <CssBaseline />
        <Grid container>
            <Grid item sm={4} sx={{backgroundColor:"gray", p:5, color: "white"}}>
                <h1>User Home Page</h1>
                <Typography variant="h5">Email: {userData.email}</Typography>
                <Typography variant="h6">Name: {userData.name}</Typography>
                <Button variant="contained" color="warning" size="large" onClick={handleLogout} sx={{mt:4}}>Logout</Button>
            </Grid>
            <Grid item sm={8}>
                <ChangePassword />
            </Grid>
        </Grid>
        </>;
};
export default UserProfile;
