import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Context } from '../components/store/Store';
import Loading from '../components/loading/loading.component';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

function DownloadsThailand(props) {

    const [loading, setLoading] = useState(true);
    const [state] = useContext(Context);
    const [APILinks, setAPILinks] = useState([]);
    const [saveNew, setSaveNew] = useState(false);
    const commodities = ["Diesel", "Crude Oil", "Gasoline", "Fuel Oil", "Condensate", "Kerosene", "JP", "LPG"]

    const saveAllExcel = (event) => {
        setLoading(true);
        axios.get(`${state.api}/thailand/saveallexcel`)
        .then(resp => {
            // console.log(resp);
            if (resp.status === 200){
                setSaveNew(true);
                setLoading(false);
            } else{
                alert("There was an issue saving latest excel files.")
                setLoading(false);
            }
        })
    }


    useEffect(() => {
        let linksArray = {};
        commodities.forEach((commodity, idx) => {
            let newCommodity = commodity.replace(/ /g, "+");
            axios.get(`${state.api}/s3/retrieves3link/thailand/` + newCommodity)
            .then(resp => {
                // console.log(resp);
                let current = resp.data.s3LinksList[0];
                if (Object.keys(current).length > 0){
                    for (let commodityAndType of Object.keys(current)){
                        // console.log(current[commodityAndType]);
                        linksArray[commodityAndType] = current[commodityAndType];
                    }
                }
                if (idx === commodities.length - 1) {
                    setAPILinks(linksArray);
                }
            }).catch(error => {
                console.log(error);
            });
        })
    }, [saveNew])

    useEffect(() => {
        setLoading(false);
    }, [APILinks])
  
    return (
      <>
        {
            loading ?
            <Loading />
            :
            <Container maxWidth="md">
                <Box  my={3} style={{ textAlign: "center" }}>
                    <Typography variant="h4" >
                            <strong style={{ color: 'blue' }}>Thailand</strong> Downloads
                    </Typography>
                    <Button variant="contained" sx={{ ml: 1, mt : 2 }} onClick={saveAllExcel}>
                        Save Latest Excel
                    </Button>
                    <TableContainer component={Paper} sx={{ width: "80%", margin: "auto", mt: 5,textAlign: "center" }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow style={{ backgroundColor: "#221cc9" }}>
                                    <TableCell colSpan={2}>
                                        <Typography variant="subtitle1">
                                            <strong style={{ color: "white" }}>Commodity</strong>
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                            Object.entries(APILinks).map(([key, value], idx) => (
                                <TableRow
                                key={key}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                style ={ idx % 2? { background : "#e4e3ff" }:{ background : "white" }}
                                >
                                    <TableCell component="th" scope="row">
                                        {key}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button variant="contained" href={value}>
                                            Download
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Container>
        }
      </>
    )
  }
  
  export default DownloadsThailand;