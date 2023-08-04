import React, { useState } from "react";
import { Typography, TextField, Button, Box, Alert, CircularProgress } from "@mui/material";
import { NavLink,useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {useLoginUserMutation } from "../../../services/userAuthApi";
import { getToken, storeToken } from "../../../services/LocalStorageService";
import { setUserToken } from "../../../features/authSlice";
import { useEffect } from "react";
import { setUserInfo } from "../../../features/userSlice";


const UserLogin = () =>{
    const [serverError, setServerError] = useState({}) 
    const navigate = useNavigate();
    const [loginUser, {isLoading}] = useLoginUserMutation()
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            email:data.get('email'),
            password:data.get('password'),
        }
        const res = await loginUser(actualData)
        if(res.error){
            setServerError(res.error.data.errors)
        }
        if(res.data){
            storeToken(res.data.token)
            let {access_token} = getToken()
            dispatch(setUserToken ({access_token: access_token}))
            dispatch(setUserInfo({
                is_phone_verified:res.data.is_phone_verified,
                is_preferences:res.data.is_preferences
              }))
            document.getElementById('login-form').reset()
            navigate('/userinfo') 
        }  
        
    }

    let { access_token } = getToken()
    useEffect(() => {
        dispatch(setUserToken({access_token: access_token}))
    }, [access_token, dispatch] )


    return <>
     <Box component='form' noValidate sx={{mt:2}} id='login-form' onSubmit={handleSubmit}>
        <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
        {serverError.email ? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{serverError.email[0]}</Typography> : ""}
        <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
        {serverError.password ? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{serverError.password[0]}</Typography> : ""}
        <Box textAlign='center'>
            {isLoading ? <CircularProgress /> : <Button type='submit' variant='contained' sx={{mt:3, mb:2, px:5, backgroundColor:'#6d1b7b'}}>Login</Button>}    
        </Box>
        <NavLink to='/forgotpassword'> Forgot Password ? </NavLink>
        {serverError.non_field_errors ? <Alert severity="error">{serverError.non_field_errors[0]}</Alert> : ''}
     </Box>
    </>;
}

export default UserLogin;

 
