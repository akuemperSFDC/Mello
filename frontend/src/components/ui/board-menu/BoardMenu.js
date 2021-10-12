import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  styled,
  Drawer,
  List,
  Divider,
  ButtonBase,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import Header from './Header';
import { Description } from '@mui/icons-material';
import AboutButton from './AboutButton';
import ChangeBackgroundButton from './ChangeBackgroundButton';
import DeleteButton from './DeleteButton';
import PanelAbout from './PanelAbout';
import PanelBackground from './PanelBackground';
import { menuVisible } from '../../../features/boardMenu/boardMenuSlice';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  backgroundColor: '#F4F5F7',
  [`& .MuiDrawer-paper`]: {
    width: 340,
    boxSizing: 'border-box',
    marginTop: theme.mixins.denseToolbar.minHeight,
  },
}));

const BoardMenu = ({ open, setOpen }) => {
  const dispatch = useDispatch();

  const { visible, mainMenu, aboutMenu, backgroundMenu } = useSelector(
    (state) => state.boardMenu
  );

  const handleClose = () => {
    dispatch(menuVisible(false));
  };

  const handleDelete = () => {
    // dispatch()
  };

  return (
    <StyledDrawer variant='persistent' anchor='right' open={visible}>
      {mainMenu && (
        <Box>
          <Header title='Menu' handleClose={handleClose} />
          <Divider variant='middle' />
          <List sx={{ p: '12px 6px 12px 12px' }}>
            <AboutButton />
            <ChangeBackgroundButton />
          </List>
          <Divider variant='middle' />
          <List sx={{ p: '12px 6px 12px 12px' }}>
            <DeleteButton />
          </List>
        </Box>
      )}
      {aboutMenu && <PanelAbout handleClose={handleClose} />}
      {backgroundMenu && <PanelBackground handleClose={handleClose} />}
    </StyledDrawer>
  );
};

export default BoardMenu;
