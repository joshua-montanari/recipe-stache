import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withRouter } from 'react-router-dom'
import { Button, useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      flexGrow: 1,
    }
  },
  headerOptions:{
    display: 'flex',
    flex: 1,
    justifyContent: 'space-evenly'
  }
}));

const Header = (props) => {
  const { history } = props
  const classes = useStyles();
  // const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme()
  //*responds true if screen size is 'sm' or smaller
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageURL) => {
    history.push(pageURL)
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      {/* <FormGroup>
        <FormControlLabel
          control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup> */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} >
            Recipe Stache
          </Typography>
            <div>
              {isMobile ? (
              <>
              <IconButton 
                edge="start" 
                className={classes.menuButton} 
                color="inherit" 
                aria-label="menu" 
                onClick={handleMenu}>
                <MenuIcon />
               </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => handleMenuClick('/')}>Home</MenuItem>
                <MenuItem onClick={() => handleMenuClick('/profile')}>Recipes</MenuItem>
                <MenuItem onClick={() => handleMenuClick('/login')}>Login</MenuItem>
              </Menu>
              </>
              
              ) : (
                <div className={classes.headerOptions}>
                  <Button variant='contained' onClick={() => handleMenuClick('/')}> Home </Button>
                  <Button variant='contained' onClick={() => handleMenuClick('/profile')}> Recipes </Button>
                  <Button variant='contained' onClick={() => handleMenuClick('/login')}> Login </Button>
                </div>
            )  
            }
              
            </div>
          
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Header)