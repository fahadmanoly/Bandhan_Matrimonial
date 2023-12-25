import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Grid } from '@mui/material';
import { useSearchUsersQuery } from '../../../services/userAuthApi';
import { Link } from 'react-router-dom';


function SearchResults() {
  const { age_min, age_max, religion, gender } = useParams();

  const { data:users, error, isLoading } = useSearchUsersQuery({
    age_min,
    age_max,
    religion,
    gender,
  });
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const profilePictureStyle = {
    width: '100%', 
    height: '200px',
    // borderRadius: '50%', 
    objectFit: 'contain',
  };


  return (

    <Grid container spacing={1}>
   
      {users.map((user) => (
        <Grid item key={user.id} xs={12} sm={3} >
          <Link to={{pathname:`/match-details/${user.id}`, state:{userData:user}}} style={{ textDecoration: 'none' }}>
              <Grid key={user.id} style={{ border: '2px solid #ccc', margin: '10px', padding: '10px' }}>
                <img style={profilePictureStyle} src={`https://www.manoly.life:8000${user.profile_picture}`} />
     
                <Typography variant="body2" component="div"> {user.name} , {user.gender} , {user.date_of_birth} Years Old,  {user.religion}</Typography>
                {/* <Typography variant="body2" color="textSecondary"> Age: {user.date_of_birth} </Typography>
                <Typography variant="body2" color="textSecondary"> Religion: {user.religion} </Typography> */}
          
              </Grid>
          </Link>
        </Grid>
     ))}
    </Grid>
  );
  }

        

export default SearchResults;
