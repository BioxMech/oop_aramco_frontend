import React from 'react';
import Box from '@mui/material/Box';
import { Pie } from 'react-chartjs-2';

function PieChart({ name, data, year, dataValues }) {

  const dataPoints = {
    labels: data,
    datasets: [
      {
        label: '# of Votes',
        data: dataValues,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: name,
      },
    },
  };

  return (
    <Box sx={{ minWidth: "350px", width: "40vw", margin: "auto" }}>
      <Pie data={dataPoints} options={options} key={name} />
    </Box>
  )
};

export default PieChart;