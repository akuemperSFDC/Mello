import React from 'react';
import * as M from '@mui/material';
import SideBar from '../components/ui/SideBar';

const TemplatesScreen = () => {
  const theme = M.useTheme();

  return (
    <M.Grid
      container
      flexGrow={1}
      sx={{
        mt: theme.mixins.denseToolbar.minHeight,
        p: 1,
        maxWidth: 'lg',
        mx: 'auto',
      }}
    >
      <SideBar />
    </M.Grid>
  );
};

export default TemplatesScreen;
