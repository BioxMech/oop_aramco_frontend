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
import Chart from '../components/dashboard/chart';
import axios from 'axios';
import { Context } from '../components/store/Store';
import BarChart from '../components/dashboard/barChart';

function ImportExport(props) {

  // const pathname = props.location.pathname;
  // const country = pathname.split("/")[1];
  // if (pathname.split("/").length > 2) {
  //   var item = pathname.split("/")[2];
  // }

  const [state, dispatch] = useContext(Context);
  const [year, setYear] = useState("2021");
  const [commodity, setCommodity] = useState("All");
  const [commodityList, setCommodityList] = useState(["All"]);
  const [yearList, setYearList] = useState([]);
  const [chartTitle, setChartTitle] = useState("");
  const [exportVals, setExportVals] = useState([]);
  const [importVals, setImportVals] = useState([]);
  const [netVals, setNetVals] = useState([]);
  const [barColors, setBarColors] = useState([]);

  const handleCommodity = (event) => {
    setCommodity(event.target.value);
  };
  
  const handleYear = (event) => {
    setYear(event.target.value);
  };
  
  useEffect(() => {
    axios.get(`${state.api}/china/commodities`)
    .then(res => {
      let newList = commodityList;
      setCommodityList(newList.concat(res.data));

    }, (error) => {
      console.log(error);
    });
    axios.get(`${state.api}/china/years`)
    .then(res => {
      console.log(res.data);
      setYearList(res.data);
    }, (error) => {
      console.log(error);
    });
  },[])

  useEffect(() => {
    setChartTitle(` Net Imports of ${commodity} in ${year}`)
    axios.get(`${state.api}/china/${year}/${commodity}`)
      .then(res => {
        console.log(res.data);
        let importData = Array(12).fill(0);
        let exportData = Array(12).fill(0);
        res.data.forEach(entry => {
          if (entry.type == "export") {
            let index = parseInt(entry.month) - 1;
            exportData.splice(index, 1, parseInt(entry.quantity));
          } else if (entry.type == "import") {
            let index = parseInt(entry.month) - 1;
            importData.splice(index, 1, parseInt(entry.quantity));
          }
        });
        let netData = importData.map((imp, idx) => {
          return imp - exportData[idx];
        })
        let netColors = netData.map((net, idx) => {
          return net < 0 ? "rgb(255, 99, 132)" : "rgb(0, 154, 123)";
        })
        setExportVals(exportData);
        setImportVals(importData);
        setNetVals(netData);
        setBarColors(netColors);
      })
  }, [commodity, year])

  return (
    <Box my={3} mx={1.5}>
      <Typography variant="h5" style={{ textAlign: "center" }}>
        CHINA: IMPORT / EXPORT
        {/* { country.toUpperCase() }{ item ? ` : ${item.toUpperCase()}` : ''} */}
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
        commodity == "All" ? 
        (
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
        ) : (
          <Grid container spacing={2}>
          <Grid item xs={12}>
            <BarChart
              name={chartTitle}
              lineOneName="Exports"
              lineTwoName="Imports"
              barName="Net Imports"
              lineOneData={exportVals}
              lineTwoData={importVals}
              barData = {netVals}
              barColors = {barColors}
            />
          </Grid>
        </Grid>
        ) 
      }

    </Box>
  )
}

export default ImportExport;