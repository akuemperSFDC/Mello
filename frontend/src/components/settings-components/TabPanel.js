import { Box, useTheme } from '@mui/material';

const TabPanel = ({ children, value, index }) => {
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
