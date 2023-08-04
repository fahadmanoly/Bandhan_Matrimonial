import React from 'react';
import { useEffect, useState } from 'react';
import { Grid, Container, Typography, useMediaQuery } from '@mui/material';
import { useSelector } from "react-redux/es/hooks/useSelector";
import Sidebar from '../../parts/Sidebar';
import ProfileImage from '../../parts/ProfileImage';
import { useGetLoggedUserQuery } from '../../../services/userAuthApi';
import { getToken } from '../../../services/LocalStorageService';
import { useDispatch } from 'react-redux';
import { setUserInfo } from "../../../features/userSlice";

const UserHome = ({}) => {
  const {access_token} = getToken()
  const dispatch = useDispatch()
  const { data, isSuccess } = useGetLoggedUserQuery(access_token);
  console.log("userhome before",data)
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setUserInfo({
        email: data.user.email,
        name: data.user.name,
        id: data.user.id,
        is_phone_verified:data.user.is_phone_verified,
        is_preferences:data.user.is_preferences
      }))
    }
  }, [data, isSuccess, dispatch])
  const UserData = useSelector(state => state.user)
  console.log("userhome after",UserData)

  return (
    <>
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={2.5}>
          <Sidebar />
        </Grid>
        
      <Grid item xs={3.5}>
        <ProfileImage sx={{ width: '100%', height: '300px' }} /> 
      </Grid>
        
      <Grid item xs={6} sx={{marginTop:8}}>
        {UserData ? (<>
        <Typography variant="h6">Welcome  {UserData.name}</Typography>
        {/* <Typography variant="subtitle1">Gender: {data.user_info.gender}</Typography>
        <Typography variant="subtitle1">Date of Birth: {data.user_info.date_of_birth}</Typography>
        <Typography variant="subtitle1">Mother Toungue: {data.user_info.mother_tongue}</Typography>
        <Typography variant="subtitle1">Religion: {data.user_info.religion}</Typography>
        <Typography variant="subtitle1">Education: {data.user_info.Education}</Typography>
        <Typography variant="subtitle1">Profession: {data.user_info.profession}</Typography> */}

        </>) : ( <div>loading profile</div>)}
       </Grid>
      </Grid>
    </Container>

</>    
);
};

export default UserHome;
