import React from "react";
import { Typography, Grid, TextField, Button, Box, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../../services/userAuthApi";


const ResetPassword = () => {
    const [serverError, setServerError] = useState({})
    const [serverMsg, setServerMsg] = useState({})
    const [resetpassword] = useResetPasswordMutation()
    const {id, token} = useParams()
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            password:data.get('password'),
            password2:data.get('password2'),
        }
        const res = await resetpassword({actualData, id, token})
        if(res.error){
            setServerMsg({})
            setServerError(res.error.data.errors)
        }
        if(res.data){
            setServerError({})
            setServerMsg(res.data)
            document.getElementById('password-reset-form').reset()
            navigate("/login")

        }     
    };
    return <>
      <Grid container justifyContent={"center"}>
        <Grid item sm={6} xs={12}>
          <h1>Reset Password</h1>
          <Box component='form' noValidate sx={{mt:2}} id='password-reset-form' onSubmit={handleSubmit}>
             <TextField margin='normal' required fullWidth id='password' name='password' label='New Password' type='password' />
             {serverError.password ? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{serverError.password[0]}</Typography> : ""}
             <TextField margin='normal' required fullWidth id='password2' name='password2' label='Confirm New Password' type='password' />
             {serverError.password2 ? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{serverError.password2[0]}</Typography> : ""}
             <Box textAlign='center'>
                <Button type='submit' variant='contained' sx={{mt:3, mb:2, px:5, backgroundColor:'#6d1b7b'}}>Reset Password</Button>
             </Box>
             {serverError.non_field_errors ? <Alert severity="error">{serverError.non_field_errors[0]}</Alert> : ''}
             {serverMsg.msg ? <Alert severity="success">{serverMsg.msg}</Alert> : ''}
            
          </Box>
        </Grid>
      </Grid>

    </>
    
};

export default ResetPassword;

