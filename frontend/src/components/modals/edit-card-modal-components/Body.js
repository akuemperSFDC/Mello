import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, InputBase, Typography, useTheme } from '@mui/material';
import { Description } from '@mui/icons-material';
import SideMenu from './SideMenu';
import DescriptionInput from './DescriptionInput';

const Body = () => {
  const dispatch = useDispatch();

  return (
    <Box sx={{ display: 'flex', mx: 3, my: 3 }}>
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Description />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            ml: 3,
            mr: 2,
            flexGrow: 1,
          }}
        >
          <Typography sx={{ fontWeight: 500, mb: 0.5 }}>Description</Typography>
          <DescriptionInput />
        </Box>
      </Box>
      <SideMenu />
    </Box>
  );
};

export default Body;
