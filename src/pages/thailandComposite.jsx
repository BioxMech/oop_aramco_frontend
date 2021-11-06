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
import CompositeChart from '../components/dashboard/compositeChart';

import Loading from '../components/loading/loading.component';

function ThailandComposite(props) {

  const [state, dispatch] = useContext(Context);
  const [year, setYear] = useState("2021");
  const [commodity, setCommodity] = useState("");
  const [commodityList, setCommodityList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [grossBalances, setGrossBalances] = useState([]);
  const [netImports, setNetImports] = useState([]);
  const [netBalances, setNetBalances] = useState([]);
  const [barColors, setBarColors] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCommodity = (event) => {
    setCommodity(event.target.value);
  };

  const handleYear = (event) => {
    setYear(event.target.value);
  };
  
  useEffect(() => {
    axios.get(`${state.api}/thailand/commodities`)
    .then(res => {
      res.data.sort();
      setCommodityList(res.data);
      setCommodity(res.data[0]);
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
    axios.get(`${state.api}/thailand/${year}/${commodity}`)
      .then(res => {
        let importData = Array(12).fill(0);
        let exportData = Array(12).fill(0);
        let productionData = Array(12).fill(0);
        let salesData = Array(12).fill(0);
        res.data.forEach(entry => {
          if (entry.type === "export") {
            let index = parseInt(entry.month) - 1;
            exportData.splice(index, 1, exportData[index] + parseFloat(entry.quantity));
          } else if (entry.type === "import") {
            let index = parseInt(entry.month) - 1;
            importData.splice(index, 1, importData[index] + parseFloat(entry.quantity));
          } else if (entry.type === "production") {
            let index = parseInt(entry.month) - 1;
            productionData.splice(index, 1, productionData[index] + parseFloat(entry.quantity));
          } else if (entry.type === "sales") {
            let index = parseInt(entry.month) - 1;
            salesData.splice(index, 1, salesData[index] + parseFloat(entry.quantity));
          }
        });

        let netImportData = importData.map((imp, idx) => {
          return imp - exportData[idx];
        });
        let grossBalanceData = productionData.map((prd, idx) => {
          return prd - salesData[idx];
        });
        let netBalanceData = grossBalanceData.map((bal, idx) => {
          return bal + netImportData[idx];
        });
        let barColorData = netBalanceData.map((bal, idx) => {
          if (bal > 0) {
            return 'rgb(75, 192, 192)'
          } else {
            return 'rgb(255, 99, 132)'
          }
        })
        setNetBalances(netBalanceData);
        setGrossBalances(grossBalanceData);
        setNetImports(netImportData);
        setBarColors(barColorData);
        setLoading(false);
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
          THAILAND SUMMARY
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
              <Grid container spacing={2}>
              <Grid item xs={12}>
                <CompositeChart
                  key="1"
                  name={`Summary of ${commodity} in ${year}`}
                  lineOneName="Gross Balance"
                  lineTwoName = "Net Imports"
                  barName = "Net Balance"
                  lineOneData={grossBalances}
                  lineTwoData={netImports}
                  barData={netBalances}
                  barColors={barColors}
                />
              </Grid>
            </Grid>
        </Box>
      }
    </>
  )
}

export default ThailandComposite;