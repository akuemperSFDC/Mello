import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, alpha, Box, useTheme, useMediaQuery } from '@mui/material';
import SettingsPageHeader from '../components/settings-components/SettingsPageHeader';
import TabPanel from '../components/settings-components/TabPanel';
import AboutPanel from '../components/settings-components/panels/about-panel/AboutPanel';
import ActivityPanel from '../components/settings-components/panels/activity-panel/ActivityPanel';

const UserSettingsScreen = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const { tabValue } = useSelector((state) => state?.userSettings);

  const boxStyles = {
    paddingTop: theme.mixins.denseToolbar.minHeight,
    maxHeight: `calc(100vh - ${theme.mixins.denseToolbar.minHeight})`,
    overflow: matches ? 'auto' : 'hidden',
  };

  return (
    <Box sx={{ ...boxStyles }}>
      {/* -------------------------------- Header -------------------------------- */}
      <SettingsPageHeader value={tabValue} />

      {/* ------------------------------ About panel ----------------------------- */}
      <TabPanel value={tabValue} index={0}>
        <AboutPanel />
      </TabPanel>

      {/* ---------------------------- Activity panel ---------------------------- */}
      <TabPanel value={tabValue} index={1}>
        <ActivityPanel />
      </TabPanel>
    </Box>
  );
};

export default UserSettingsScreen;
