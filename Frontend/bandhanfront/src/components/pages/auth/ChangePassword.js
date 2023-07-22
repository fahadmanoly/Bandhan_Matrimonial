import React, { useState } from "react";
import { Alert, Box, Button, TextField } from "@mui/material";


const ChangePassword = () => {
    const [error, setError] = useState({status:false, msg:"",type:"" });
    const handleSubmit = (event) =>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const actualData = {
            password: data.get('password'),
            confirm_password: data.get('confirm_password'),
        }
        if (actualData.password && actualData.confirm_password){
            if(actualData.password === actualData.confirm_password){
                document.getElementById("change-password-form").requestFullscreen();
                setError({status:true, msg:"Password Changed Successfully", type: "success"}); 
            }else{
                setError({status:true, msg:"The given passwords didn't match", type:"error"})
            }
        }else{
            setError({status:true, msg:"Please provide the password", type:"error"})
        }
    };
    return <>
        <Box sx={{display:'flex', flexDirection:'column', flexWrap:'wrap', maxWidth:600, mx:4}}>
            <h1>Change Password</h1>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt:1}} id="change-password-form">
                <TextField margin="normal" required fullWidth name="password" label="New Password" type="password" id="password" />
                <TextField margin="normal" required fullWidth name="confirm_password" label="Confirm New Password" type="password" id="confirm_password" />
                <Box textAlign="center">
                    <Button type="submit" variant="contained" sx={{mt:3, mb:2, px:5}}>Update</Button>
                </Box>
                {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}   
            </Box>
        </Box>
    </>;
};

export default ChangePassword;