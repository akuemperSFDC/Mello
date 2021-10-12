import { PersonOutline } from '@mui/icons-material';
import { Box, Typography, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';

const BoardOwner = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { user } = useSelector((state) => state.auth.user && state.auth);

  return (
    <>
      <Box
        sx={{ p: '12px 6px 12px 12px', display: 'flex', alignItems: 'center' }}
      >
        <PersonOutline sx={{ fontSize: '2rem' }} />
        <Typography sx={{ fontWeight: 600, ml: 2 }}>Board owner</Typography>
      </Box>
      <Box sx={{ p: '12px 6px 12px 12px', display: 'flex' }}>
        <Avatar sx={{ width: '50px', height: '50px' }}>
          {user.firstName[0]}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2 }}>
          <Typography sx={{ fontWeight: 600 }}>{user.firstName}</Typography>
          <Link style={{ textDecoration: 'none' }} to='/account/settings'>
            <Typography
              sx={{
                color: theme.palette.grey[500],
                fontSize: '14px',
                textDecoration: 'underline',
              }}
            >
              Edit profile info
            </Typography>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default BoardOwner;
