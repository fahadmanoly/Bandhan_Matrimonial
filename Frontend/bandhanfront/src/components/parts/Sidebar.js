import React, {useState} from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate()
  const [gender, setGender] = useState('');
  const [ageMin, setAgeMin] = useState('');
  const [ageMax, setAgeMax] = useState('');
  const [religion, setReligion] = useState('');
  

  const handleSearch = () => {
    let url = '/search-results/';

    if (ageMin || ageMax || religion || gender) {
      url += `${ageMin || 'None'}/${ageMax || 'None'}/${religion || 'None'}/${gender || 'None'}`;
      navigate(url);
    }else{
      console.log("the url old is", url)
    }
   
  };




  return <>



        <Box sx={{width: 250, position: 'fixed', top: 64, height: 'calc(100vh - 64px)', backgroundColor: '#f0f0f0' }}>
      
            <Typography variant="h6" gutterBottom sx={{fontSize:'1rem', marginTop:2, marginBottom:0, ml:2}}>
               Filter
            </Typography>
{/* 
            <input type='number' placeholder='Min Age' value={ageMin} onChange={(e) =>setAgeMin(e.target.value)}/> 
            <input type="number" placeholder="Max Age" value={ageMax} onChange={(e) => setAgeMax(e.target.value)}/> */}


            <TextField label="Gender" value={gender} onChange={(e) => setGender(e.target.value)}  margin="normal" size="small" sx={{fontSize:'0.875rem', marginTop:2, mr:2, ml:2}} />
            <TextField label="Age From" value={ageMin} onChange={(e) =>setAgeMin(e.target.value)}  margin="normal" size="small" sx={{fontSize:'0.875rem', marginTop:1, mr:2, ml:2}} />
            <TextField label="Age To" value={ageMax} onChange={(e) => setAgeMax(e.target.value)}  margin="normal" size="small" sx={{fontSize:'0.875rem', marginTop:2, mr:2, ml:2}} />
            <TextField label="Religion" value={religion} onChange={(e) => setReligion(e.target.value)}  margin="normal" size="small" sx={{fontSize:'0.875rem', marginTop:2, mr:2, ml:2}} />
            


      
            <Box sx={{display:'flex', justifyContent:'center'}}>
              <Button variant="contained" sx={{ marginTop: 1, backgroundColor:"#6d1b7b"}} onClick={handleSearch}>
                 Filter
              </Button>
            </Box>

          {/* <Typography variant="h6" gutterBottom sx={{fontSize:'1rem', marginTop:2, marginBottom:0, ml:2}}>
           Filters
          </Typography>
      
          <FormControl  margin="normal"  size="small" sx={{fontSize:'0.875rem', marginTop:1, mr:2, ml:2, width:215}}>
           <InputLabel>Filter Option 1</InputLabel>
              <Select value="" label="Filter Option 1">
                <MenuItem value="">All</MenuItem>
                <MenuItem value="option1">Option 1</MenuItem>
               <MenuItem value="option2">Option 2</MenuItem>
              </Select>
          </FormControl>
      
          <FormControl fullWidth margin="normal" size="small" sx={{fontSize:'0.875rem', marginTop:1, mr:2, ml:2, width:215}}>
            <InputLabel>Filter Option 2</InputLabel>
            <Select value="" label="Filter Option 2">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal" size="small" sx={{fontSize:'0.875rem', marginTop:1, mr:2, ml:2, width:215}}>
            <InputLabel>Filter Option 3</InputLabel>
            <Select value="" label="Filter Option 2">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
            </Select>
          </FormControl> */}

          {/* <Box sx={{display:'flex', justifyContent:'center'}}>
            <Button variant="contained" sx={{ marginTop: 1, backgroundColor:"#6d1b7b"}}>
                Filter
            </Button>
          </Box> */}
    
        </Box>

  </>;
};

export default Sidebar;
