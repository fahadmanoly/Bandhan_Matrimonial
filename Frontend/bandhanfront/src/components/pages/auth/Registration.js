import React from "react";
import { TextField, FormControlLabel, Checkbox, Button, Box, Alert, Typography, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../../services/userAuthApi";
import { storeToken } from "../../../services/LocalStorageService";


const Registration = () => {
    //Frontend error initialization
    const [error, setError] = useState({
        status:false,
        msg:"",
        type:""
    })
    const [serverError, setServerError] = useState({}) 
    const navigate = useNavigate()
    const [registerUser, {isLoading}] = useRegisterUserMutation()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            name:data.get('name'),
            email:data.get('email'),
            password:data.get('password'),
            password2:data.get('password2'),
            tc:data.get('tc'),
        }
        const res = await registerUser(actualData) 
        if(res.error){
            setServerError(res.error.data.errors)
        }
        if(res.data){
            storeToken(res.data.token)
            document.getElementById('registration-form').reset()
            navigate("/userinfo")
        }
        
        //Frontend error validation
        if(actualData.name && actualData.email && actualData.password && actualData.tc !==null){
            if (actualData.password === actualData.password2) {
                setError({status:true,msg:'Registration Successful',type:'success'})
                //document.getElementById('registration-form').reset()
                //setTimeout(() => { navigate("/UserProfile")}, 1000);
            } else{
                setError({status:true,msg:"Please provide both passwords which accurately match each other",type:"error"})
            }
 
        }else{
            setError({status:true,msg:'All Fields are Required',type:'error'})      
        }        
    }

    return <>
    <Box component='form' noValidate sx={{mt:2}} id='registration-form' onSubmit={handleSubmit}>
        <TextField margin='normal' required fullWidth id='name' name='name' label='Name' />
        {serverError.name ? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{serverError.name[0]}</Typography> : ""}
        <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
        {serverError.email ? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{serverError.email[0]}</Typography> : ""}
        <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
        {serverError.password ? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{serverError.password[0]}</Typography> : ""}
        <TextField margin='normal' required fullWidth id='password2' name='password2' label='Confirm Password' type='password' />
        {serverError.password2 ? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{serverError.password2[0]}</Typography> : ""}
        <FormControlLabel control={<Checkbox value={true} color="primary" name="tc" id="tc" />} label="I agree to the terms and conditions." />
        {serverError.tc ? <span style={{fontSize:12, color:'red', paddingLeft:10}}>{serverError.tc[0]}</span> : ""}
        <Box textAlign='center'>
        {isLoading ? <CircularProgress /> : <Button type='submit' variant='contained' sx={{mt:3, mb:2, px:5, backgroundColor:'#6d1b7b'}}>Register</Button>} 
        </Box>
        {serverError.non_field_errors ? <Alert severity="error">{serverError.non_field_errors[0]}</Alert> : ''}
        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
     </Box>
    </>
};


export default Registration


