import React from 'react';
import * as M from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const DrawerHeader = M.styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Drawer = () => {
  const theme = M.useTheme();

  return (
    <M.Drawer
      sx={{
        // width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          // width: drawerWidth,
          boxSizing: 'border-box',
          marginTop: '50px',
        },
      }}
      variant='persistent'
      anchor='left'
      // open={open}
    >
      <DrawerHeader>
        <M.IconButton
        // onClick={handleDrawerClose}
        >
          <ChevronRightIcon />
        </M.IconButton>
      </DrawerHeader>
      <M.Divider />
      <M.List></M.List>
      <M.Divider />
    </M.Drawer>
  );
};

export default Drawer;
