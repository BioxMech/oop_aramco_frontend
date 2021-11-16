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


function DownloadChina(props) {

    const [loading, setLoading] = useState(true);
    const [state, dispatch] = useContext(Context);
    const [APILinks, setAPILinks] = useState([]);
    const [saveNew, setSaveNew] = useState(false);
    const [commodities, setCommodities] = useState([]);

    const saveAllExcel = (event) => {
        setLoading(true);
        axios.get(`${state.api}/china/saveallexcel`)
        .then(resp => {
            console.log(resp);
            if (resp.status == 200){
                setSaveNew(true);
                setLoading(false);
            } else{
                alert("There was an issue saving latest excel files.")
                setLoading(false);
            }
        })
    }

    useEffect(() => {
        axios.get(`${state.api}/china/commodities`)
        .then(res => {
            let comms = res.data;
            comms.sort();
            setCommodities(comms);
        }, (error) => {
            console.log(error);
        });
    },[])

    useEffect(() => {
        let linksArray = Array(commodities.length).fill('');
        commodities.forEach((commodity, idx) => {
            let newCommodity = commodity.replace(/ /g, "+");
            axios.get(`${state.api}/s3/retrieves3link/China/` + newCommodity)
            .then(resp => {
                linksArray[idx] = resp.data.url;
                if (idx == commodities.length - 1) {
                    setAPILinks(linksArray);
                }
            }).catch(error => {
                console.log(error);
            });
        })
    }, [commodities, saveNew])

    useEffect(() => {
        console.log(APILinks);
        setLoading(false);
    }, [APILinks])
    return (
      <>
        {
            loading ?
                <Loading />
                :
                <Box my={3} mx={1.5} style={{ textAlign: "center" }}>
                    <Typography variant="h3" >
                        China Downloads
                    </Typography>
                    <Button variant="contained" sx={{ ml: 1, mt : 2 }} onClick={saveAllExcel}>
                            Save Latest Excel
                    </Button>
                    <TableContainer component={Paper} sx={{ width: "80%", margin: "auto", mt: 5,textAlign: "center" }}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Commodity</TableCell>
                                    <TableCell align="right">Link</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {APILinks.map((link, idx) => (
                                    <TableRow
                                    key={idx}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {commodities[idx]}
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button variant="contained" href={link}>
                                                {link}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
        }
      </>
    )
  }
  
  export default DownloadChina;