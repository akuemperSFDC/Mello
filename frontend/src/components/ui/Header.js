import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Button,
  useScrollTrigger,
  Slide,
  Tabs,
  Tab,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { alpha, styled, useTheme } from '@mui/material/styles';

const AppBarTab = styled(Tab)(({ theme }) => ({
  transition: 'opacity .25s',
  '&:hover': {
    opacity: 0.7,
  },
  color: 'white',
  '&:active': {
    color: 'white',
  },
}));

const SiteName = styled(Typography)(({ theme }) => ({
  transition: 'opacity .25s',
  '&:hover': {
    opacity: 0.7,
  },
}));

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = (props) => {
  const theme = useTheme();

  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <HideOnScroll {...props}>
        <AppBar position='fixed'>
          <Toolbar variant='dense'>
            <Button component={Link} to='/' disableRipple>
              <SiteName
                color='white'
                variant='h6'
                component='div'
                sx={{ flexGrow: 1 }}
              >
                Mello
              </SiteName>
            </Button>
            <Tabs
              onChange={handleChange}
              value={tabValue}
              textColor='inherit'
              sx={{ marginLeft: 'auto' }}
            >
              <AppBarTab value={0} component={Link} to='/login' label='Login' />
              <AppBarTab
                value={1}
                component={Link}
                to='/register'
                label='Register'
              />
            </Tabs>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </Box>
  );
};

export default Header;
