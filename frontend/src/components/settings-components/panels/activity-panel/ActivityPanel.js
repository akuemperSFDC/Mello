import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  styled,
  alpha,
  Box,
  Typography,
  useTheme,
  Divider,
} from '@mui/material';
import { Storage } from '@mui/icons-material';
import ActivityItem from './ActivityItem';

const TabPanel = ({ children, value, index }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <Box sx={{ width: '900px', mx: 'auto', height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Storage sx={{ width: '32px', height: '32px', color: '#172B4D' }} />
        <Box sx={{ flexGrow: 1, ml: 2 }}>
          <Typography
            sx={{ fontSize: '16px', fontWeight: 600, py: 1, color: '#172B4D' }}
          >
            Activity
          </Typography>
          <Divider />
        </Box>
      </Box>
      <ActivityItem />
    </Box>
  );
};

export default TabPanel;
