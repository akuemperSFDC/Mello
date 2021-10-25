import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  useScrollTrigger,
  Slide,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

import AccountMenu from './AccountMenu.js';
import StarredBoards from './StarredBoards.js';
// import SearchBar from './SearchBar.js';
import RecentBoards from './RecentBoards.js';

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
  const { pathname } = useLocation();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const [bgColor, setBgColor] = useState(false);

  useEffect(() => {
    const regex = new RegExp('/b/');
    if (regex.test(pathname)) {
      setBgColor(true);
    } else {
      setBgColor(false);
    }
  }, [pathname]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <HideOnScroll {...props}>
        <AppBar
          position='fixed'
          elevation={0}
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: !bgColor
              ? 'primary.main'
              : `${alpha(
                  theme.palette.common.black,
                  theme.palette.action[30]
                )}`,
          }}
        >
          <Toolbar
            variant='dense'
            sx={{
              display: 'flex',
              justifyContent: matches ? 'space-between' : undefined,
            }}
          >
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
            <StarredBoards />
            <RecentBoards />
            {/* Above is left side */}
            {!matches && <Box sx={{ flexGrow: 1 }} />}
            {/* Right Side */}
            {/* <SearchBar /> */}
            <AccountMenu />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    </Box>
  );
};

export default Header;
