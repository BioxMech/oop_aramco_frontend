import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Bar } from 'react-chartjs-2';

function CompositeChart(props) {

  const dataTemp = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        type: 'line',
        label: props.lineOneName,
        borderColor: 'rgb(255, 159, 64)',
        borderWidth: 2.5,
        fill: false,
        data: props.lineOneData
      },
      {
        type: 'line',
        label: props.lineTwoName,
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 2.5,
        fill: false,
        data: props.lineTwoData
      },
      {
        type: 'bar',
        label: props.barName,
        backgroundColor: props.barColors,
        data: props.barData,
        borderColor: 'white',
        borderWidth: 2
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: props.name,
      },
    }
  };

  return (
    <Box sx={{ minWidth: "350px", width: "72vw", height: "100%", margin: "auto" }}>
      <Bar data ={dataTemp} options={options} />
    </Box>
  )
}

export default CompositeChart;