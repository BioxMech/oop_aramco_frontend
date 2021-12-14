import React from 'react';
import Box from '@mui/material/Box';
import { Bar } from 'react-chartjs-2';

function LineChart(props) {

  const dataTemp = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        type: 'line',
        label: props.lineName,
        borderColor: 'rgb(201, 93, 20)',
        borderWidth: 2.5,
        fill: false,
        borderColor: props.color,
        data: props.data
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
    },
    scales: {
      yAxes: {
        title: {
            display: true,
            text: "Kilobarrel",
            font: {
                size: 13
            }
        }
      }
    }
  };

  return (
    <Box sx={{ minWidth: "350px", width: "72vw", height: "100%", margin: "auto" }}>
      <Bar data ={dataTemp} options={options} />
    </Box>
  )
}

export default LineChart;