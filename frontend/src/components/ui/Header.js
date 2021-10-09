import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  useScrollTrigger,
  Slide,
} from '@mui/material';
import { styled } from '@mui/material/styles';

import AccountMenu from './AccountMenu.js';

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
  return (
    <Box sx={{ flexGrow: 1 }}>
      <HideOnScroll {...props}>
        <AppBar
          position='fixed'
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar variant='dense'>
            <Button component={Link} to='/boards' disableRipple>
              <SiteName
                color='white'
                variant='h6'
                component='div'
                sx={{ flexGrow: 1 }}
              >
                Mello
              </SiteName>
            </Button>
            <Box sx={{ ml: 'auto' }}>
              <AccountMenu />
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </Box>
  );
};

export default Header;
