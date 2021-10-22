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
    axios.get(`${state.api}/thailand/commodities`)
    .then(res => {
      let newList = ["All"];
      setCommodityList(newList.concat(res.data));
    }, (error) => {
      console.log(error);
    });
    axios.get(`${state.api}/thailand/years`)
    .then(res => {
      // console.log(res.data);
      setYearList(res.data);
    }, (error) => {
      console.log(error);
    });
  },[])

  return (
    <>
      {
        loading ?
        <Loading />
        :
        <Box>Loaded</Box>
      }
    </>
  )
}

export default Thailand;