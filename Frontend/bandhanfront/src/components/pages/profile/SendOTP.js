import React from "react";
import { Grid, Button, Box, CssBaseline, Alert, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../../services/LocalStorageService";
import { useSendOTPMutation } from "../../../services/userAuthApi";



const SendOTP = () => {
  const[serverError, setServerError] = useState({})
  const[serverMsg, setServerMsg] = useState({})
  const navigate = useNavigate()
  const {access_token} = getToken()
  const [SendOTP] = useSendOTPMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await SendOTP({access_token})
    if(res.error){
      setServerMsg({})
      setServerError(res.error.data)
      console.log(res.error.data)
    }
    if(res.data){
      setServerError({})
      setServerMsg(res.data)
      navigate('/verifyotp')
    }

  };
        
    
  return <>
    <CssBaseline />
      <Grid container justifyContent={"center"}>
        <Grid item sm={6} xs={12}>
            
          <Box textAlign='center' sx={{mt:26}} >
            <h2>Please Verify Your Mobile</h2>
          </Box>
     

          
            <Box textAlign='center' sx={{mt:2}}>
              <Button type='submit' variant='contained' onClick={handleSubmit} sx={{mt:3, mb:2, px:5, backgroundColor:'#6d1b7b'}}>Verify</Button>
            </Box>
            {serverError.non_field_errors ? <Alert severity="error">{serverError.non_field_errors[0]}</Alert> : ''}
            {serverMsg.msg ? <Alert severity="success">{serverMsg.msg}</Alert> : ''}
        
         
        </Grid>
      </Grid>
  </>

};


export default SendOTP