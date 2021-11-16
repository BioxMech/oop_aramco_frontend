import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';

import Chart from '../components/dashboard/chart';

function Dashboard(props) {

  const pathname = props.location.pathname;
  const country = pathname.split("/")[1];
  if (pathname.split("/").length > 2) {
    var item = pathname.split("/")[2];
  }

  const [year, setYear] = useState(1);
  const [commodity, setCommodity] = useState(1);

  const handleCommodity = (event) => {
    setCommodity(event.target.value);
  };
  
  const handleYear = (event) => {
    setYear(event.target.value);
  };
  
  // Fetch from endpoint (use axios)
  const [commodityValueList, setCommodityValueList] = useState([{value: 1, commodity: "Gasoline"} , {value: 2, commodity: "Net Imports" }])
  
  // Fetch from endpoint (use axios)
  const [yearList, setYearList] = useState([{value: 1, year: 2019} , {value: 2, year: 2020 }])

  return (
    <Box my={3} mx={1.5}>
      <Typography variant="h4" style={{ textAlign: "center" }}>
        { country.toUpperCase() }{ item ? ` : ${item.toUpperCase()}` : ''}
      </Typography>

      {/* ================ Filter ================ */}
      <Box my={3}>
        <Stack direction="row" spacing={2} style={{ display: 'flex', justifyContent: "center" }}>
          <FormControl >
            <InputLabel id="demo-simple-select-label">Commodity</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={commodity}
              label="Commodity"
              onChange={handleCommodity}
            >
              {
                commodityValueList.map(({ value, commodity }) => (
                  <MenuItem value={value}>{ commodity }</MenuItem>
                ))
              }
            </Select>
            <FormHelperText>Choice of Commodity</FormHelperText>
          </FormControl>
          <FormControl >
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={year}
              label="Year"
              onChange={handleYear}
            >
              {
                yearList.map(({ value, year }) => (
                  <MenuItem value={value}>{ year }</MenuItem>
                ))
              }
            </Select>
            <FormHelperText>Year to view</FormHelperText>
          </FormControl>
        </Stack>
      </Box>
      
      
      {/* ================ CHARTS ================ */}
      <Grid container spacing={2}> 
        <Grid item xs={12} >
          <Chart name="All Oil Imports" type="Pie" />
        </Grid>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Button variant="contained" endIcon={<DownloadIcon />} component="a" href="https://bit.ly/3j0ldt6">
            Download .csv file
          </Button>
        </Grid>
      </Grid>
    
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Chart name="Import" type="Bar" />
        </Grid>
        <Grid item xs={12}>
          <Chart name="Export" type="Bar" />
        </Grid>
      </Grid>
        
    </Box>
  )
}

export default Dashboard;