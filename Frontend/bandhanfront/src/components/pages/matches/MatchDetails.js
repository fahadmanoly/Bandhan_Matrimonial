import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, Grid } from '@mui/material';




function MatchDetails() {
    const location = useLocation();
    console.log("location is",location)
    const userdata = location.state && location.state.userData

    if (!userdata) {
        return <div>No user data found.</div>;
      }
    
  return (
    <div>
    <h1>match details page</h1>
   
        <p>Name: {userdata.name}</p>
    </div>
  );
  }

export default MatchDetails;
