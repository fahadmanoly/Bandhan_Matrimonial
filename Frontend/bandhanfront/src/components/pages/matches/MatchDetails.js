import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Grid, Button, Avatar, Box} from '@mui/material';
import { getToken } from '../../../services/LocalStorageService';
import { useMatchDetailsQuery } from '../../../services/userAuthApi';


function MatchDetails() {

  const param_id = useParams()
  const match_id = param_id.match_id
  const {access_token} = getToken()
  const navigate = useNavigate()
  const {data, error, isLoading}= useMatchDetailsQuery({access_token, match_id});

  const [currentPictureIndex, setCurrentPictureIndex] = useState(0);

  const calculateAge = (date_of_birth) => {
    const today = new Date();
    const birthdate = new Date(date_of_birth);
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())){
      age--;
    }
    return age;
  };

  const connectionClick = () => {
    navigate('/connectionrequest');
}

  const paymentClick = () => {
    navigate('/payments');
}

  const handleNextPicture = () => {
    setCurrentPictureIndex((prevIndex) =>
    prevIndex < matchPicture.length -1 ? prevIndex + 1 : 0
    );
  };

  if(isLoading){
    return <div>Loading...</div>
  }
  if (error){
    return <div>Error.{error.message}</div>
  }
  const userInfo = data?.user_info[0];
  const matchName = data?.match_name[0];
  const matchInfo = data?.match_info[0];
  const matchPreference = data?.match_preference[0];
  const matchPicture = data?.match_picture;
  console.log("the user infor is isi si is",userInfo.is_gold)

  const profilePictureStyle = {
    width: '80%', 
    height: '95%',
    borderRadius: '10%', 
    objectFit: 'contain',
  };


  return (
    <Grid container noValidate  sx={{height:'100vh', backgroundColor:'white', padding:'1px', paddingTop:'1px',width: "100%" }}>
      <Grid item xs={5} display={"flex"} flexDirection={"column"} sx={{backgroundColor:"white", padding:'1px', paddingTop:'1px', color: '#6d1b7b'}}>
          <Avatar style={profilePictureStyle} src={`http://127.0.0.1:8000${matchPicture[currentPictureIndex].image}`} alt={`Profile ${currentPictureIndex}`} />
          <Button onClick={handleNextPicture}>Next</Button>

      </Grid>


      <Grid item xs={3} display={"flex"} flexDirection={"column"} sx={{backgroundColor:"white", padding:'1px', paddingTop:'1px', color: '#6d1b7b'}}>
        <h1>{matchInfo.gender==='Female'? 'Her' : 'His'} Details</h1>
          <Typography>Religion: {matchInfo.religion}</Typography>
          <Typography>Mother Tongue: {matchInfo.mother_tongue}</Typography>
          <Typography>Location: {matchInfo.location}</Typography>
          <Typography>Native Place: {matchInfo.native_place}</Typography>
          <Typography>Country: {matchInfo.country}</Typography>
          <Typography>Education: {matchInfo.Education}</Typography>
          <Typography>Job: {matchInfo.profession}</Typography>
          <Typography>Marital Status: {matchInfo.marital_status}</Typography>
          <Typography>Height: {matchInfo.height}</Typography>
          <Typography>Weight: {matchInfo.weight}</Typography>
          <Typography>Family Status: {matchInfo.family_status}</Typography>
          <Typography>Family Values: {matchInfo.family_values}</Typography>
          <Typography>About Me: {matchInfo.about_me}</Typography>

          {userInfo.is_gold===true ?  <Grid display="flex" flexDirection="column" sx={{height:'24vh', mt:5, backgroundColor:'pink'}}>
                                       <Typography>Name: {matchName.name} </Typography>
                                        <Typography>Age: {calculateAge(matchInfo.date_of_birth)}</Typography>
                                        <Typography>Mobile: {matchInfo.mobile}</Typography>
                                        <Typography>Email: {matchName.email}</Typography>
                                       <Box display="flex" justifyContent="center" alignContent="center" alignItems="center" sx={{paddingTop:1}}>
                                          <Button variant="contained" onClick={connectionClick} sx={{backgroundColor: '#6d1b7b'}}>Send Connection Request</Button>
                                        </Box>
                                      </Grid>
                                   : <Grid display="flex" flexDirection="column" sx={{height:'24vh', mt:5, backgroundColor:'pink'}}>
                                        <h4> Only God Members can see the Contact Number and Send Connection Request</h4>
                                        < Box display="flex" justifyContent="center" alignContent="center" alignItems="center" sx={{paddingTop:1}}>
                                          <Button variant="contained" onClick={paymentClick} sx={{backgroundColor: '#6d1b7b'}}>Become a Gold Member</Button>
                                        </Box>
                                      </Grid>
                                    }
      
      </Grid>


      <Grid item xs={4} display={"flex"} flexDirection={"column"} sx={{backgroundColor:"white", padding:'1px', paddingTop:'1px', color: '#6d1b7b'}}>
        <h2>{matchInfo.gender === 'Female' ? 'Her Preferences for the Groom' : 'His Preferences for the Bride'} </h2>
          <Typography>Age: {calculateAge(matchPreference.date_of_birth)}</Typography>
          <Typography>Religion: {matchPreference.religion}</Typography>
          <Typography>Mother Tongue: {matchPreference.mother_tongue}</Typography>
          <Typography>Location: {matchPreference.location}</Typography>
          <Typography>Native Place: {matchPreference.native_place}</Typography>
          <Typography>Education: {matchPreference.Education}</Typography>
          <Typography>Job: {matchPreference.profession}</Typography>
          <Typography>Marital Status: {matchPreference.marital_status}</Typography>
          <Typography>Height: {matchPreference.height}</Typography>
          <Typography>Weight: {matchPreference.weight}</Typography>
          <Typography>Family Status: {matchPreference.family_status}</Typography>
          <Typography>Family Values: {matchPreference.family_values}</Typography>

      </Grid>
  </Grid>
  );
  }

export default MatchDetails;
