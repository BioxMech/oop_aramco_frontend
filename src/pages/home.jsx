import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Icon from '@mui/material/Icon';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Typewriter from 'typewriter-effect';

import ThailandFlag from '../assets/images/thailandFlag.svg';
import ChinaFlag from '../assets/images/chinaFlag.svg';
import Overview from '../assets/images/overview.png';

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
    <Container maxWidth="lg">
      <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Box mb={3}>
          <Typography variant="h5" style={{ display: 'flex' }}>
            Choose Your Country: &nbsp;
            <Typewriter
              onInit={(typewriter) => {
                typewriter.typeString("<strong style='color: red'>China</strong>")
                  // .callFunction(() => {
                  //   console.log('String typed out!');
                  // })
                  .pauseFor(2500)
                  .deleteChars(7)
                  .typeString("<strong style='color: blue'>Thailand</strong>")
                  .pauseFor(2500)
                  // .callFunction(() => {
                  //   console.log('All strings were deleted');
                  // })
                  .start();
              }}
              options={{
                autoStart: true,
                loop: true,
              }}
            />
          </Typography>
          
        </Box>
        <Box >
          
          <Stack direction="row" spacing={2}>
            <Button color="error" variant="contained" startIcon={
              <Icon classes={{root: useStyles.iconRoot}}>
                <img className={useStyles.imageIcon} src={ChinaFlag} alt="CH" />
              </Icon>
              }
              component="a"
              href="/china/importExport"
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
            <Button color="inherit" variant="contained" startIcon={ 
              <img style={{ width: "20px"}} src={Overview} alt="Overview" />
              }
              component="a"
              href="/overview"
            >Overview</Button>
          </Stack>
        </Box>
        
      </Stack>
    </Container>
  )
}

export default Home;