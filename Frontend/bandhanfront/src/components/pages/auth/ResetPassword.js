import React from "react";
import { Grid, TextField, Button, Box, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const ResetPassword = () => {
    const navigate = useNavigate()
    const [error, setError] = useState({
        status:false,
        msg:"",
        type:""
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            password:data.get('password'),
            confirm_password:data.get('confirm_password'),

        }
        if(actualData.password && actualData.confirm_password){
            if(actualData.password === actualData.confirm_password){
                setError({status:true,msg:'Password Reset Successful',type:'success'})
                document.getElementById('password-reset-form').reset()
                setTimeout(() => { navigate("/login")}, 1000);
            }else{
                setError({status:true,msg:"The given passwords didn't match",type:"error"})
            }

        }else{
            setError({status:true,msg:'Please provide the password',type:'error'})      
        }    
        
    }
    return <>
      <Grid container justifyContent={"center"}>
        <Grid item sm={6} xs={12}>
          <h1>Reset Password</h1>
          <Box component='form' noValidate sx={{mt:2}} id='password-reset-form' onSubmit={handleSubmit}>
             <TextField margin='normal' required fullWidth id='password' name='password' label='New Password' type='password' />
             <TextField margin='normal' required fullWidth id='confirm_password' name='confirm_password' label='Confirm New Password' type='password' />
             <Box textAlign='center'>
                <Button type='submit' variant='contained' sx={{mt:3, mb:2, px:5}}>Reset Password</Button>
             </Box>
             {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
          </Box>
        </Grid>
      </Grid>

    </>
    
};

export default ResetPassword;

