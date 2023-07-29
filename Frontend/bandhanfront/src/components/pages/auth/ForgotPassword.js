import React from "react";
import { Typography, Grid, TextField, Button, Box, Alert, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useForgotPasswordMutation } from "../../../services/userAuthApi";


const ForgotPassword = () => {
    const[serverError,setServerError] = useState({})
    const[serverMsg,setServerMsg] = useState({})
    const [forgotpassword, {isLoading}] = useForgotPasswordMutation()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            email:data.get('email'),
        }
        const res = await forgotpassword(actualData)
        if(res.error){
          setServerMsg({})
          setServerError(res.error.data.errors)
        }
        if(res.data){
          setServerError({})
          setServerMsg(res.data)
          document.getElementById('forgot-password-form').reset()
        }   
        
    }
    return <>
      <Grid container justifyContent={"center"}>
        <Grid item sm={6} xs={12}>
          <Box component='form' noValidate sx={{mt:2}} id='forgot-password-form' onSubmit={handleSubmit}>
             <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
             {serverError.email ? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{serverError.email[0]}</Typography> : ""}
             <Box textAlign='center'>
                {isLoading ? <CircularProgress /> : <Button type='submit' variant='contained' sx={{mt:3, mb:2, px:5}}>Send</Button>}
             </Box>
             {serverError.non_field_errors ? <Alert severity="error">{serverError.non_field_errors[0]}</Alert> : ''}
             {serverMsg.msg ? <Alert severity="success">{serverMsg.msg}</Alert> : ''}
             
          </Box>
        </Grid>
      </Grid>

    </>
};

export default ForgotPassword;
