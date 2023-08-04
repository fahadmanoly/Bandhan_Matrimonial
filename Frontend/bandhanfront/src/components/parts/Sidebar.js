import React from 'react';
import { Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const Sidebar = () => {
  return (
    <Box sx={{width: 250, position: 'fixed', top: 64, height: 'calc(100vh - 64px)', backgroundColor: '#f0f0f0' }}>
      
      <Typography variant="h6" gutterBottom sx={{fontSize:'1rem', marginTop:2, marginBottom:0, ml:2}}>
        Search
      </Typography>

      <TextField label="Search Field 1"  margin="normal" size="small" sx={{fontSize:'0.875rem', marginTop:1, mr:2, ml:2}} />
      <TextField label="Search Field 2"  margin="normal" size="small" sx={{fontSize:'0.875rem', marginTop:2, mr:2, ml:2}} />
      <TextField label="Search Field 3"  margin="normal" size="small" sx={{fontSize:'0.875rem', marginTop:2, mr:2, ml:2}} />

      
      <Box sx={{display:'flex', justifyContent:'center'}}>
        <Button variant="contained" sx={{ marginTop: 1, backgroundColor:"#6d1b7b"}}>
            Search
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom sx={{fontSize:'1rem', marginTop:2, marginBottom:0, ml:2}}>
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
      </FormControl>

      <Box sx={{display:'flex', justifyContent:'center'}}>
        <Button variant="contained" sx={{ marginTop: 1, backgroundColor:"#6d1b7b"}}>
            Filter
        </Button>
      </Box>
    
    </Box>
  );
};

export default Sidebar;
