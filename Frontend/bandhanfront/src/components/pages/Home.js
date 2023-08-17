import React from "react";
import { Grid } from "@mui/material";
import pic_home_background from '../../images/pic_home_background.jpg'

const Home=()=>{
    
    return <>
     <Grid container sx={{height:'90vh', width:'100vw'}}>
        <Grid item lg={12} sm={12} sx={{
            backgroundImage:`url(${pic_home_background})`,
            backgroundRepeat:'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'contained',
            display:{xs:'block', sm:'block'}
        }}>
            <h2 sx={{color:"#6d1b7b"}}>Welcome to Bandhan! The Matrimonial Website</h2>
        </Grid>
 
     </Grid>   

        
    
 
       
       
    </>;
}

export default Home;
