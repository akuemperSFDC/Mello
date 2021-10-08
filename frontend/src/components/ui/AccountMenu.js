import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, logout } from '../../features/auth/authSlice.js';
import {
  Box,
  Tooltip,
  IconButton,
  ListItemIcon,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Typography,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Logout, Settings, Dashboard } from '@mui/icons-material';

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  pointerEvents: 'none',
  '&:hover': {
    pointerEvents: 'none',
  },
}));

const AccountMenu = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const auth = useSelector(selectCurrentUser);
  const { user } = auth && auth;

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    console.log(e.target);
    if (e.target.id === 1) return;
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title='Account settings'>
          <IconButton onClick={handleClick} size='small' sx={{ ml: 2 }}>
            <Avatar sx={{ width: 32, height: 32 }}>
              {user && user.firstName[0]}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            width: '17rem',
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <StyledMenuItem>
          <Typography sx={{ mx: 'auto' }}>Account</Typography>
        </StyledMenuItem>

        <Divider />
        <StyledMenuItem>
          <Grid container direction='row' alignContent='center'>
            <Grid item sx={{ my: 'auto' }}>
              <Avatar />
            </Grid>
            <Grid item>
              <Grid container direction='column'>
                <Grid item>
                  <Typography sx={{ fontSize: '.9rem' }}>
                    {user && user.firstName}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography sx={{ fontSize: '.75rem', color: '#6A778D' }}>
                    {user && user.email}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </StyledMenuItem>

        <Divider />
        <MenuItem component={Link} to={user && `/account/user/${user._id}`}>
          <ListItemIcon>
            <Settings fontSize='small' />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem component={Link} to='/boards'>
          <ListItemIcon>
            <Dashboard fontSize='small' />
          </ListItemIcon>
          My Boards
        </MenuItem>

        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;
