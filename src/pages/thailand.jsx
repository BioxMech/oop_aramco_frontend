import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import LineChart from '../components/dashboard/lineChart';
import { useParams } from 'react-router-dom';

import { Context } from '../components/store/Store';
import Loading from '../components/loading/loading.component';

function Thailand() {

  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useContext(Context);
  const [year, setYear] = useState("2021");
  const [commodity, setCommodity] = useState("All");
  const [commodityList, setCommodityList] = useState(["All"]);
  const [yearList, setYearList] = useState([]);
  const [chartTitle, setChartTitle] = useState("");
  const [chartData, setChartData] = useState([]);
  const { type } = useParams()

  const handleCommodity = (event) => {
    setCommodity(event.target.value);
  };
  
  const handleYear = (event) => {
    setYear(event.target.value);
  };

  useEffect(() => {
    axios.get(`${state.api}/thailand/commodities`)
    .then(res => {
      let newList = res.data;
      newList.sort();
      setCommodityList(newList);
      setCommodity(newList[0]);
    }, (error) => {
      console.log(error);
    });
    axios.get(`${state.api}/thailand/years`)
    .then(res => {
      res.data.sort();
      res.data.reverse();
      setYearList(res.data);
      setYear(res.data[0]);
    }, (error) => {
      console.log(error);
    });
  },[])

  useEffect(() => {
    setLoading(true)
    axios.get(`${state.api}/thailand/${year}/${type}/${commodity}`)
    .then(res => {
      let resData = Array(12).fill(0);
      res.data.forEach(entry => {
          let index = parseInt(entry.month) - 1;
          resData.splice(index, 1, parseFloat(entry.quantity));
      });
      setChartData(resData);
      setLoading(false)
    })
  }, [commodity, year])

  return (
    <>
      {
        loading ?
        <Loading />
        :
        <Box my={3} mx={1.5}>
          <Typography variant="h5" style={{ textAlign: "center" }}>
          THAILAND: { type.toUpperCase() }
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
                    commodityList.map((commodity) => (
                      <MenuItem value={commodity}>{commodity}</MenuItem>
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
                    yearList.map((year) => (
                      <MenuItem value={ year }>{ year }</MenuItem>
                    ))
                  }
                </Select>
                <FormHelperText>Year to view</FormHelperText>
              </FormControl>
            </Stack>
          </Box>
          
          
          {/* ================ CHARTS ================ */}

          {
            commodity === "All" ? 
            (
              <Grid container spacing={2}> 
              <Grid item xs={12} >
               {/* For Jason to add */}
              </Grid>
              <Grid item xs={12} style={{ textAlign: "center" }}>
                <Button variant="contained" endIcon={<DownloadIcon />} component="a" href="https://bit.ly/3j0ldt6">
                  Download .csv file
                </Button>
              </Grid>
            </Grid>
            ) : (
              <Grid container spacing={2}>
              <Grid item xs={12}>
                <LineChart
                  key="1"
                  name={`${type} of ${commodity} in ${year}`}
                  lineName={type}
                  data={chartData}
                  color={'rgb(255, 99, 132)'}
                />
              </Grid>
            </Grid>
            ) 
          }
        </Box>
      }
    </>
  )
}

export default Thailand;