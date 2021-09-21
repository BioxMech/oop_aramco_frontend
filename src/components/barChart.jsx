import React from 'react';
import Box from '@mui/material/Box';
import { Bar } from 'react-chartjs-2';

function BarChart({ name }) {

  const rand = () => Math.round(Math.random() * 20 - 10);

  // it will be taken from the db
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        type: 'line',
        label: 'Dataset 1',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 2,
        fill: false,
        data: [rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand()],
      },
      {
        type: 'line',
        label: 'Dataset 3',
        borderColor: 'green',
        borderWidth: 2,
        fill: false,
        data: [rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand()],
      },
      {
        type: 'bar',
        label: 'Dataset 2',
        backgroundColor: 'rgb(255, 99, 132)',
        data: [rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand()],
        borderColor: 'white',
        borderWidth: 2,
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
        text: name,
      },
    },
  };

  return (
    <Box sx={{ minWidth: "350px", width: "72vw", height: "100%", margin: "auto" }}>
      <Bar data ={data} options={options} />
    </Box>
  )
}

export default BarChart;