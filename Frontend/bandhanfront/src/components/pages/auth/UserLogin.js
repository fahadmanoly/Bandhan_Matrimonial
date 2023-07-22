import React, { useState } from "react";
import { TextField, Button, Box, Alert } from "@mui/material";
import { NavLink,useNavigate } from "react-router-dom";

const UserLogin = () =>{
    const [error, setError] = useState({
        status:false,
        msg:"",
        type:""
    })
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            email:data.get('email'),
            password:data.get('password'),
        }
        if(actualData.email && actualData.password){
            setError({status:true,msg:'Login Successful',type:'success'})
            document.getElementById('login-form').reset()
            //navigate('/UserProfile') 
            setTimeout(() => { navigate("/UserProfile")}, 1000);
        }else{
            setError({status:true,msg:'All Fields are Required',type:'error'})      
        }    
        
    }
    return <>
     <Box component='form' noValidate sx={{mt:2}} id='login-form' onSubmit={handleSubmit}>
        <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
        <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
        <Box textAlign='center'>
            <Button type='submit' variant='contained' sx={{mt:3, mb:2, px:5}}>Login</Button>
        </Box>
        <NavLink to='/forgotpassword'> Forgot Password ? </NavLink>
        {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
     </Box>
    </>;
}

export default UserLogin;