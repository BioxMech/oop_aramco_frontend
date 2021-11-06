import React, { useState, useEffect, useContext } from 'react';
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
import axios from 'axios';
import { Context } from '../components/store/Store';
import LineChart from '../components/dashboard/lineChart';

import Loading from '../components/loading/loading.component';

function ThailandMaterial(props) {

  const [state, dispatch] = useContext(Context);
  const [year, setYear] = useState("2020");
  const [refinery, setRefinery] = useState("");
  const [refineryList, setRefineryList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleRefinery = (event) => {
    setRefinery(event.target.value);
  };

  const handleYear = (event) => {
    setYear(event.target.value);
  };
  
  useEffect(() => {
    axios.get(`${state.api}/thailand/refineries`)
    .then(res => {
      res.data.sort();
      setRefineryList(res.data);
      setRefinery(res.data[0]);
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
    axios.get(`${state.api}/thailand/${year}/Material Intake/${refinery}`)
      .then(res => {
        let resData = Array(12).fill(0);
      res.data.forEach(entry => {
          let index = parseInt(entry.month) - 1;
          resData.splice(index, 1, parseFloat(entry.quantity));
      });
      setChartData(resData);
        setLoading(false);
      })
  }, [refinery, year])

  return (
    <>
      {
        loading ?
        <Loading />
        :
        <Box my={3} mx={1.5}>
          <Typography variant="h5" style={{ textAlign: "center" }}>
          THAILAND SUMMARY
          </Typography>

          {/* ================ Filter ================ */}
          <Box my={3}>
            <Stack direction="row" spacing={2} style={{ display: 'flex', justifyContent: "center" }}>
              <FormControl >
                <InputLabel id="demo-simple-select-label">Refinery</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={refinery}
                  label="Refinery"
                  onChange={handleRefinery}
                >
                  {
                    refineryList.map((refinery) => (
                      <MenuItem value={refinery}>{refinery}</MenuItem>
                    ))
                  }
                </Select>
                <FormHelperText>Choice of Refinery</FormHelperText>
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <LineChart
                key="1"
                name={`Material Intake of ${refinery} in ${year}`}
                lineName="Refinery Material Intake"
                data={chartData}
                color={'rgb(255, 99, 132)'}
              />
            </Grid>
          </Grid>
        </Box>
      }
    </>
  )
}

export default ThailandMaterial;