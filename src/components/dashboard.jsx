import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';

import Chart from './chart';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ position: "relative", height: "100%", width: "100%" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function Dashboard(props) {

  const pathname = props.location.pathname;
  const country = pathname.split("/")[1];
  if (pathname.split("/").length > 2) {
    var item = pathname.split("/")[2];
  }

  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleChangeIndex = (index) => {
    setValue(index);
  };
  

  return (
    <Box mt={2} mx={1.5}>
      <Typography variant="h5" style={{ textAlign: "center" }}>
        { country.toUpperCase() }{ item ? `: ${item.toUpperCase()}` : ''}
      </Typography>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Overview" />
        <Tab label="Monthly" />
        <Tab label="Yearly" />
      </Tabs>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction} sx={{ height: "80%" }}>
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
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Chart name="Import" type="Bar"  />
            </Grid>
            <Grid item xs={12}>
              <Chart name="Export" type="Bar"  />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Chart name="Import" type="Bar" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Chart name="Export" type="Bar" />
            </Grid>
          </Grid>
        </TabPanel>
      </SwipeableViews>
    </Box>
  )
}

export default Dashboard;