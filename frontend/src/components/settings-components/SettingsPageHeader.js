import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  styled,
  alpha,
  Tabs,
  Tab,
  Avatar,
  Typography,
  useTheme,
} from '@mui/material';
import AboutPanel from './panels/about-panel/AboutPanel';
import { setTabValue } from '../../features/userSettings/userSettingsSlice';

const SettingsPageHeader = ({ value }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { user } = useSelector((state) => state.auth.user && state.auth);

  const tabProps = (index) => {
    return {
      id: `tab-${index}`,
      'aria-controls': `tab-${index}`,
    };
  };

  const handleChange = (e, newValue) => {
    dispatch(setTabValue(newValue));
  };

  const headerBoxStyles = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'yellow',
  };

  const userInfoBoxStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: theme.mixins.userSettingsUserInfoHeader.minHeight,
  };

  const tabsBoxStyles = {
    height: theme.mixins.userSettingsTabHeader.minHeight,
    display: 'flex',
    justifyContent: 'center',
    '& .MuiTabs-scroller': {
      maxHeight: theme.mixins.userSettingsTabHeader.minHeight,
    },
  };

  return (
    <Box sx={{ ...headerBoxStyles }}>
      {/* ---------------------------- Avatar and name --------------------------- */}
      <Box sx={{ ...userInfoBoxStyles }}>
        <Avatar>{user.firstName[0]}</Avatar>
        <Typography>
          {user.firstName} {user.lastName}
        </Typography>
      </Box>
      {/* --------------------------------- Tabs --------------------------------- */}
      <Box sx={{ ...tabsBoxStyles }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab disableRipple label='About' {...tabProps} />
          <Tab disableRipple label='Activity' {...tabProps} />
        </Tabs>
      </Box>
    </Box>
  );
};

export default SettingsPageHeader;
