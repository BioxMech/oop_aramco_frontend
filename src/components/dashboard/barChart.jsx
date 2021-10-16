import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Bar } from 'react-chartjs-2';

function BarChart(props) {

  const [data, setData] = useState(null);

  const rand = () => Math.round(Math.random() * 20 - 10);

  const dataTemp = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        type: 'line',
        label: props.lineOneName,
        borderColor: 'rgb(201, 93, 20)',
        borderWidth: 2.5,
        fill: false,
        data: props.lineOneData,
        // id: 'A'
      },
      {
        type: 'line',
        label: props.lineTwoName,
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 2.5,
        fill: false,
        data: props.lineTwoData,
        // id: 'A'
      },
      {
        type: 'bar',
        label: props.barName,
        backgroundColor: props.barColors,
        data: props.barData,
        borderColor: 'white',
        borderWidth: 2,
        // id: 'B'
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      // legend: {
      //   position: 'right',
      // },
      title: {
        display: true,
        text: props.name,
      },
    },
    // scales: {
    //   yAxes: [{
    //     id: 'A',
    //     type: 'linear',
    //     position: 'left',
    //   }, {
    //     id: 'B',
    //     type: 'linear',
    //     position: 'right',
    //   }]
    // }
  };

  return (
    <Box sx={{ minWidth: "350px", width: "72vw", height: "100%", margin: "auto" }}>
      <Bar data ={dataTemp} options={options} />
    </Box>
  )
}

export default BarChart;