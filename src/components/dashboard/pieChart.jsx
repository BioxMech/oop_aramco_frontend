import React, { useEffect, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import { Pie } from 'react-chartjs-2';
// import axios from 'axios';
// import { Context } from '../store/Store';

function PieChart({ name, data, year, dataValues }) {

  // const [state, dispatch] = useContext(Context);
  // const [exportVals, setExportVals] = useState([]);
  // const [importVals, setImportVals] = useState([]);

  // useEffect(() => {
  //   setExportVals([])
  //   setImportVals([])

  //   for(let i = 1; i < data.length; i++) { // start at 1 cause the 1st is 'All'

  //     axios.get(`${state.api}/china/${year}/${data[i]}`)
  //       .then(res => {
  //         let importData = Array(12).fill(0);
  //         let exportData = Array(12).fill(0);
  //         res.data.forEach(entry => {
  //           if (entry.type === "export") {
  //             let index = parseInt(entry.month) - 1;
  //             exportData.splice(index, 1, parseInt(entry.quantity));
  //           } else if (entry.type === "import") {
  //             let index = parseInt(entry.month) - 1;
  //             importData.splice(index, 1, parseInt(entry.quantity));
  //           }
  //         });
  //         let netData = importData.map((imp, idx) => {
  //           return imp - exportData[idx];
  //         })
  //         let netColors = netData.map((net, idx) => {
  //           return net < 0 ? "rgb(255, 99, 132)" : "rgb(0, 154, 123)";
  //         })
  //         setExportVals(exportData);
  //         setImportVals(importData);
  //       })
      
  //   }
  // }, [data, year])

  // console.log(exportVals)
  // console.log("import:", importVals)
  // console.log("data",data)

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
    <Box sx={{ minWidth: "350px", width: "36vw", margin: "auto" }}>
      <Pie data={dataPoints} options={options} key={name} />
    </Box>
  )
};

export default PieChart;