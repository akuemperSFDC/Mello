import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  styled,
  alpha,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';

const TabPanel = ({ children, value, index }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <Box
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{
        maxHeight: `calc(100vh - ${theme.mixins.denseToolbar.minHeight} - ${theme.mixins.userSettingsTabHeader.minHeight} - ${theme.mixins.userSettingsUserInfoHeader.minHeight})`,
        backgroundColor: 'white',
        display: 'flex',
      }}
    >
      {value === index && <Box sx={{ p: 4, mx: 'auto' }}>{children}</Box>}
    </Box>
  );
};

export default TabPanel;
