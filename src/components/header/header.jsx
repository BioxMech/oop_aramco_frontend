import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Icon from '@mui/material/Icon';
import { makeStyles } from '@mui/styles';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

import './header.styles.scss';
import ThailandFlag from '../../assets/images/thailandFlag.svg';
import ChinaFlag from '../../assets/images/chinaFlag.svg';
import { thailandHeader, chinaHeader } from './headerData';
import AramcoLogo from '../../assets/images/aramco-logo.png';


export default function Header() {

  const pathname = window.location.pathname;
  // const path = pathname === '/' ? 'home' : pathname.substr(1);
  // const country = pathname.split("/")[1];
  // var item = null;
  // if (pathname.split("/").length > 2) {
  //   var item = pathname.split("/")[2];
  // }

  const [openTH, setOpenTH] = useState(true);
  const [openCH, setOpenCH] = useState(true);

  const handleClick = () => {
    setOpenTH(!openTH);
  };

  const handleClickCH = () => {
    setOpenCH(!openCH);
  };

  // For the icons
  const useStyles = makeStyles({
    imageIcon: {
      height: '100%'
    },
    iconRoot: {
      textAlign: 'center'
    }
  });

  const [state, setState] = useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
    >
      <Box my={1}>
        <Toolbar component="a" href="/">
          <img style={{width:"100%"}} src="https://www.aramco.com/images/affiliateLogo.png" alt="Aramco"  />
        </Toolbar>
      </Box>
      <Divider />
      <List>
        {/* Thailand */}
        <ListItem button onClick={handleClick} >
          <ListItemIcon >
            <Icon classes={{root: useStyles.iconRoot}}>
              <img className={useStyles.imageIcon} src={ThailandFlag} alt="TH" />
            </Icon>
          </ListItemIcon>
          <ListItemText primary={`Thailand`} />
          {openTH ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        {/* Thailand List */}
        <Collapse in={openTH} timeout="auto" unmountOnExit>
          <List component="div" disablePadding >
            {
              thailandHeader.map(({ item, href }) => (
                  <List component="div" disablePadding className={"" + ( pathname === href ? "current" : "") }>
                    <ListItem button sx={{ pl: 4 }} component="a" href={href} >
                      <ListItemText primary={item} />
                    </ListItem>
                  </List>
              ))
            }
          </List>
        </Collapse>

        {/* China */}
        <ListItem button onClick={handleClickCH}>
          <ListItemIcon>
            <Icon classes={{root: useStyles.iconRoot}}>
              <img className={useStyles.imageIcon} src={ChinaFlag} alt="CH" />
            </Icon>
          </ListItemIcon>
          <ListItemText primary={"China"} />
          {openCH ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openCH} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {
                chinaHeader.map(({ item, href }) => (
                    <List component="div" disablePadding className={"" + ( pathname === href ? "current" : "") }>
                      <ListItem button sx={{ pl: 4 }} component="a" href={href} >
                        <ListItemText primary={item} />
                      </ListItem>
                    </List>
                ))
              }
            </List>
          </Collapse>
      </List>
    </Box>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent" enableColorOnDark="true">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer('left', true)}
            >
              <MenuIcon />
            </IconButton>
            <SwipeableDrawer
              anchor={'left'}
              open={state['left']}
              onClose={toggleDrawer('left', false)}
            >
              { list('left') }
            </SwipeableDrawer>
            <Box mx={"auto"}>
              <Button component="a" href="/" style={{ backgroundColor: 'transparent', color: 'black' }}>
                <img style={{width:"80%"}} src="https://www.aramco.com/images/affiliateLogo.png" alt="Aramco"  />
                {/* <Box mr={1} mt={1}>
                  <img src={AramcoLogo} alt="A" style={{ width: "24px" }} />
                </Box>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Aramco
                </Typography> */}
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
    
  );
}
