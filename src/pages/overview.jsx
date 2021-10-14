import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';

import Chart from '../components/dashboard/chart';

function Overview() {

  return (
    <Box>
      <Typography variant="h3" style={{ textAlign: "center" }}>
        Overview
      </Typography>
      <Grid container spacing={2}> 
        <Grid item xs={12} >
          <Chart name="All Oil Imports" type="Pie" />
        </Grid>
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Button variant="contained" endIcon={<DownloadIcon />} component="a" href="#">
            Download .csv file
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Overview;