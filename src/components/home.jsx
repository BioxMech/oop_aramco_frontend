import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Icon from '@mui/material/Icon';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

import ThailandFlag from '../assets/images/thailandFlag.svg';
import ChinaFlag from '../assets/images/chinaFlag.svg';

function Home() {

    // For the icons
    const useStyles = makeStyles({
      imageIcon: {
        height: '100%'
      },
      iconRoot: {
        textAlign: 'center'
      }
    });

  return (
    <div style={{ marginTop: "40%", textAlign: "center"}}>
      <Box mb={3}>
        <Typography variant="h5">
          Dashboard (Country)
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        
        <Stack direction="row" spacing={2}>
          <Button color="error" variant="contained" startIcon={
            <Icon classes={{root: useStyles.iconRoot}}>
              <img className={useStyles.imageIcon} src={ChinaFlag} alt="CH" />
            </Icon>
            }
            component="a"
            href="/china/import"
          >
            China
          </Button>
          <Button  variant="contained" startIcon={
            <Icon classes={{root: useStyles.iconRoot}}>
              <img className={useStyles.imageIcon} src={ThailandFlag} alt="TH" />
            </Icon>
            }
            component="a"
            href="/thailand/import"
          >
            Thailand
          </Button>
        </Stack>
      </Box>
    </div>
  )
}

export default Home;