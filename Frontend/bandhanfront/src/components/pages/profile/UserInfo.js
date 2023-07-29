import React, { useState } from "react";
import { Box, Button, CssBaseline, Grid, CircularProgress, TextField, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getToken, storeToken } from "../../../services/LocalStorageService";
import { useUserInfoMutation } from "../../../services/userAuthApi";
import { useSelector } from "react-redux/es/hooks/useSelector";



const UserInfo = () => {
    const[serverError, setServerError] = useState({})
    const[serverMsg, setServerMsg] = useState({})
    const navigate = useNavigate()
    const [userInfo, isLoading] = useUserInfoMutation()
    const {access_token} = getToken()
    const UserData = useSelector(state => state.user)
    console.log(UserData)
    console.log(UserData['id'])
    const handleSubmit = async (event) =>{
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const actualData = {
          date_of_birth: data.get('date_of_birth'),
          height: data.get('height'),
          weight: data.get('weight'),
          maritalStatus: data.get('maritalStatus'),
          motherTongue: data.get('motherTongue'),
          religion: data.get('religion'),
          gender: data.get('gender'),
          education: data.get('education'),
          country: data.get('country'),
          nativePlace: data.get('nativePlace'),
          location: data.get('location'),
          profession: data.get('profession'),
          familyStatus: data.get('familyStatus'),
          familyValues: data.get('familyValues'),
          aboutMe: data.get('aboutMe'),
          mobile: data.get('mobile'),

      }
      
      const res = await userInfo({actualData,UserData,access_token})
      if(res.error){
          console.log(res.error.data.errors)
          setServerMsg({})
          setServerError(res.error.data.errors)
      }
      if(res.data){
          storeToken(res.data.token)
          setServerError({})
          setServerMsg(res.data)
          document.getElementById('userinfo-form').reset()
          navigate('/userpreferences') 
      }

    };
    
    
    return <>
        <CssBaseline />
        
        <Grid container component='form' noValidate  sx={{height:'114vh', backgroundColor:'purple', padding:'1px', paddingTop:'1px',width: "100%" }} id='userinfo-form' onSubmit={handleSubmit}>
          <Grid item xs={6} display={"flex"} flexDirection={"column"} sx={{backgroundColor:"purple", padding:'1px', paddingTop:'1px', color: "white"}}>

            <Box item xs={12} sx={{backgroundColor:'white', height:'13vh', padding:'0px'}}>
              <TextField margin='normal' required sx={{width:'95%', ml:2}} id='date_of_birth' name='date_of_birth' label='Date of Birth' />
              {serverError.date_of_birth? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{serverError.date_of_birth[0]}</Typography> : ""}
            </Box>

            <Box item xs={12} sx={{backgroundColor:'pink', height:'13vh', padding:'0px'}}>
              <TextField margin='normal' required sx={{width:'95%', ml:2}} id='height' name='height' label='Height' />
              {serverError.height ? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{serverError.height[0]}</Typography> : ""}
              </Box>

            <Box item xs={12} sx={{backgroundColor:'white', height:'13vh', padding:'0px'}}>
              <TextField margin='normal' required sx={{width:'95%', ml:2}} id='weight' name='weight' label='Weight' />
              {serverError.weight? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{serverError.weight[0]}</Typography> : ""}
            </Box>

            <Box item xs={12} sx={{backgroundColor:'yellow', height:'13vh', padding:'0px'}}>
              <TextField margin='normal' required sx={{width:'95%', ml:2}} id='maritalStatus' name='maritalStatus' label='Marital Status' />
              {serverError.maritalStatus? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{serverError.maritalStatus[0]}</Typography> : ""}
            </Box>

            <Box item xs={12} sx={{backgroundColor:'white', height:'13vh', padding:'0px'}}>
              <TextField margin='normal' required sx={{width:'95%', ml:2}} id='motherTongue' name='motherTongue' label='Mother Tongue' />
              {serverError.motherTongue? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{serverError.motherTongue[0]}</Typography> : ""}
            </Box>

            <Box item xs={12} sx={{backgroundColor:'pink', height:'13vh', padding:'0px'}}>
              <TextField margin='normal' required sx={{width:'95%', ml:2}} id='religion' name='religion' label='Religion' />
              {serverError.religion? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{serverError.religion[0]}</Typography> : ""}
            </Box>

            <Box item xs={12} sx={{backgroundColor:'white', height:'13vh', padding:'0px'}}>
              <TextField margin='normal' required sx={{width:'95%', ml:2}} id='gender' name='gender' label='Gender' />
              {serverError.gender? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{serverError.gender[0]}</Typography> : ""}
            </Box>

            <Box item xs={12} sx={{backgroundColor:'yellow', height:'13vh', padding:'0px'}}>
              <TextField margin='normal' required sx={{width:'95%', ml:2}} id='education' name='education' label='Education' />
              {serverError.education? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{serverError.education[0]}</Typography> : ""}
            </Box>

          </Grid>



          <Grid  item xs={6} display={"flex"} flexDirection={"column"}  sx={{backgroundColor:"purple", padding:'0.5px', paddingTop:'1px', color: "white"}}>

            <Box item  xs={12} sx={{backgroundColor:'white', height:'13vh', padding:'0px'}}>
              <TextField margin='normal' required sx={{width:'95%', ml:2}} id='country' name='country' label='Country' />
              {serverError.country? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{serverError.country[0]}</Typography> : ""}
            </Box>

            <Box item  xs={12} sx={{backgroundColor:'pink', height:'13vh', padding:'0px'}}>
              <TextField margin='normal' required sx={{width:'95%', ml:2}} id='nativePlace' name='nativePlace' label='Native Place' />
              {serverError.nativePlace? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{serverError.nativePlace[0]}</Typography> : ""}
            </Box>

            <Box item  xs={12} sx={{backgroundColor:'white', height:'13vh', padding:'0px'}}>
              <TextField margin='normal' required sx={{width:'95%', ml:2}} id='location' name='location' label='Location' />
              {serverError.location? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{serverError.location[0]}</Typography> : ""}
            </Box>

            <Box item  xs={12} sx={{backgroundColor:'yellow', height:'13vh', padding:'0px'}}>
              <TextField margin='normal' required sx={{width:'95%', ml:2}} id='profession' name='profession' label='Profession' />
              {serverError.profession? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{serverError.profession[0]}</Typography> : ""}
            </Box>

            <Box item  xs={12} sx={{backgroundColor:'white', height:'13vh', padding:'0px'}}>
              <TextField margin='normal' required sx={{width:'95%', ml:2}} id='familyStatus' name='familyStatus' label='Family Status' />
              {serverError.familyStatus? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{serverError.familyStatus[0]}</Typography> : ""}
            </Box>

            <Box item  xs={12} sx={{backgroundColor:'pink', height:'13vh', padding:'0px'}}>
              <TextField margin='normal' required sx={{width:'95%', ml:2}} id='familyValues' name='familyValues' label='Family Values' />
              {serverError.familyValues? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{serverError.familyValues[0]}</Typography> : ""}
            </Box>

            <Box item  xs={12} sx={{backgroundColor:'white', height:'13vh', padding:'0px'}}>
              <TextField margin='normal' required sx={{width:'95%', ml:2}} id='aboutMe' name='aboutMe' label='About Me' />
              {serverError.aboutMe? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{serverError.aboutMe[0]}</Typography> : ""}
            </Box>

            <Box item  xs={12} sx={{backgroundColor:'yellow', height:'13vh', padding:'0px'}}>
              <TextField margin='normal' required sx={{width:'95%', ml:2}} id='mobile' name='mobile' label='Phone Number' />
              {serverError.mobile? <Typography style={{fontSize:12, color:'red', paddingLeft:10}}>{serverError.mobile[0]}</Typography> : ""}
            </Box>
                 
          </Grid>
          <Box xs={12} sx={{margin: "auto"}}>
            <Button xs={12} type='submit' variant='contained' >Save</Button>
           </Box>
           {serverError.non_field_errors ? <Alert severity="error">{serverError.non_field_errors[0]}</Alert> : ''}
           {serverMsg.msg ? <Alert severity="success">{serverMsg.msg}</Alert> : ''} 
          
        </Grid>

        </>;
};
export default UserInfo;
