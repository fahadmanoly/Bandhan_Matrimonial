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
  
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(setUserInfo({
        email: data.user.email,
        name: data.user.name,
        id: data.user.id,
        is_phone_verified:data.user.is_phone_verified,
        is_preferences:data.user.is_preferences,
        Education: data.user_info.Education,
        about_me: data.user_info.about_me,
        country: data.user_info.country,
        date_of_birth: data.user_info.date_of_birth,
        family_status: data.user_info.family_status,
        family_values: data.user_info.family_values,
        gender: data.user_info.gender,
        height: data.user_info.height,
        location: data.user_info.location,
        marital_status:data.user_info.marital_status, 
        mobile: data.user_info.mobile,
        mother_tongue: data.user_info.mother_tongue,
        native_place:data.user_info.native_place,
        profession: data.user_info.profession,
        religion: data.user_info.religion,
        weight: data.user_info.weight,
      }))
    }
  }, [data, isSuccess, dispatch])
  const UserData = useSelector(state => state.user)

  return (
    <>
    {/* <Container maxWidth="xl"> */}
      <Grid container >
        <Grid item xs={3}>
          <Sidebar />
        </Grid>
        
      <Grid item xs={3}>
      {/* <img src={picture.image} alt="Profile" /> */}
        <ProfileImage sx={{ width: '100%', height: '300px' }} /> 
      </Grid>
        
      <Grid item xs={6} sx={{marginTop:8}}>
        {UserData ? (<>
        <Typography variant="h6">Name: {UserData.name}</Typography>
        <Typography variant="subtitle1">Gender: {UserData.gender}</Typography>
        <Typography variant="subtitle1">Date of Birth: {UserData.date_of_birth}</Typography>
        <Typography variant="subtitle1">Mother Toungue: {UserData.mother_tongue}</Typography>
        <Typography variant="subtitle1">Religion: {UserData.religion}</Typography>
        <Typography variant="subtitle1">Education: {UserData.Education}</Typography>
        <Typography variant="subtitle1">Profession: {UserData.profession}</Typography>

        </>) : ( <div>loading profile</div>)}
       </Grid>
      </Grid>
    

</>    
);
};

export default UserHome;
