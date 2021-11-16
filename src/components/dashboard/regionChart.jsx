import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Bar } from 'react-chartjs-2';

function RegionChart(props) {
  const [chartData, setChartData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const colors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#808000', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075']
  
  useEffect(() => {
    let dataTemp = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          type: 'line',
          label: props.lineName,
          borderColor: '#f032e6',
          borderWidth: 2.5,
          fill: false,
          data: props.lineData
        }
      ],
    };
    let count = 0;
    for (const region in props.regionData) {
      let entry = {
        type: 'bar',
        label: region,
        data: props.regionData[region],
        backgroundColor: colors[count]
      };
      dataTemp.datasets.push(entry);
      count += 1
    }
    setChartData(dataTemp);
    setIsLoading(false);
  }, [props.regionData, props.lineData])

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: props.name,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true
      }
    }
  };

  return (
    <>
    { isLoading ? (<></>) : (
      <Box sx={{ minWidth: "350px", width: "72vw", height: "100%", margin: "auto" }}>
        <Bar data ={chartData} options={options} />
      </Box>
    )
    }
    </>
  )
}

export default RegionChart;