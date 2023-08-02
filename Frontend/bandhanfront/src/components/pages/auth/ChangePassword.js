import React, { useState } from "react";
import { Typography, Alert, Box, Button, TextField, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useChangeUserPasswordMutation } from "../../../services/userAuthApi";
import { getToken } from "../../../services/LocalStorageService";



const ChangePassword = () => {
    const[serverError, setServerError] = useState({})
    const[serverMsg, setServerMsg] = useState({})
    const [changeUserPassword, {isLoading}] = useChangeUserPasswordMutation()
    const {access_token} = getToken()
    const handleSubmit = async (event) =>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const actualData = {
            current_password: data.get('current_password'),
            password: data.get('password'),
            password2: data.get('password2'),
        }
        const res = await changeUserPassword({actualData,access_token})
        if(res.error){
            setServerMsg({})
            setServerError(res.error.data.errors)
        }
        if(res.data){
            console.log(res.data )
            setServerError({})
            setServerMsg(res.data)
            document.getElementById('change-password-form').reset()
            //navigate('/UserProfile') 
        }

    };


    const myData = useSelector(state => state.user)
    return <>
        <Box sx={{display:'flex', flexDirection:'column', flexWrap:'wrap', maxWidth:600, mx:4}}>
            <h1>Change Password</h1>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt:1}} id="change-password-form">
                <TextField margin="normal" required fullWidth name="current_password" label="Current Password" type="password" id="current_password" />
                {serverError.current_password ? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{serverError.current_password[0]}</Typography> : ""}
                <TextField margin="normal" required fullWidth name="password" label="New Password" type="password" id="password" />
                {serverError.password ? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{serverError.password[0]}</Typography> : ""}
                <TextField margin="normal" required fullWidth name="password2" label="Confirm New Password" type="password" id="password2" />
                {serverError.password2 ? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{serverError.password2[0]}</Typography> : ""}
                <Box textAlign="center">
                    {isLoading ? <CircularProgress /> : <Button type="submit" variant="contained" sx={{mt:3, mb:2, px:5, backgroundColor:'#6d1b7b'}}>Update</Button>}
                </Box>
                {serverError.non_field_errors ? <Alert severity="error">{serverError.non_field_errors[0]}</Alert> : ''}
                {serverMsg.msg ? <Alert severity="success">{serverMsg.msg}</Alert> : ''} 
  
            </Box>
        </Box>
    </>;
};

export default ChangePassword;
