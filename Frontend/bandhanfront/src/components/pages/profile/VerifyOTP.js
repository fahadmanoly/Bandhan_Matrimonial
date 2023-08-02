import React from "react";
import { Grid, TextField, Button, Box, CssBaseline, Typography, Alert, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../../services/LocalStorageService";
import { useVerifyOTPMutation } from "../../../services/userAuthApi";




const VerifyOTP = () => {
  const[serverError, setServerError] = useState({})
  const[serverMsg, setServerMsg] = useState({})
  const navigate = useNavigate()
  const {access_token} = getToken()
  const [VerifyOTP] =  useVerifyOTPMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const actualData = {
      otp:formdata.get('otp'),
      }
    
    const res = await VerifyOTP({actualData, access_token})
    if(res.error){
      setServerMsg({})
      setServerError(res.error.data)
      console.log(res.error.data)
    }
    if(res.data){
      setServerError({})
      setServerMsg(res.data)
      document.getElementById('verifyotp-form').reset()
      //navigate('/userpreference')
    }

  };
        
    
  return <>
    <CssBaseline />
      <Grid container  justifyContent={"center"}>
        <Grid item sm={6} xs={12}>
            
          <Box textAlign='center' sx={{mt:8}} >
            <h2>Please Enter the OTP Recieved in Your Mobile to Validate the Given Mobile Number</h2>
          </Box>
     
          <Box component='form' noValidate sx={{mt:8}} id='verifyotp-form' onSubmit={handleSubmit}>
            <Box textAlign='center'>
              <TextField margin='normal' required id='otp' name='otp' label='Enter OTP' />
            </Box>
            {serverError.otp ? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{serverError.otp}</Typography> : ""}
          
            <Box textAlign='center' sx={{mt:8 }}>
              <Button type='submit' variant='contained' sx={{mt:3, mb:2, px:5, backgroundColor:'#6d1b7b'}}>Verify</Button>
            </Box>
            {serverError.non_field_errors ? <Alert severity="error">{serverError.non_field_errors}</Alert> : ''}
            {serverMsg.msg ? <Alert severity="success">{serverMsg.msg}</Alert> : ''}
        
          </Box>
        </Grid>
      </Grid>
  </>

};

export default VerifyOTP