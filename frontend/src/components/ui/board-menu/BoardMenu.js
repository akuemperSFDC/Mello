import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, Drawer } from '@mui/material';
import PanelAbout from './panels/about/PanelAbout';
import PanelBackground from './panels/background/PanelBackground';
import { menuVisible } from '../../../features/boardMenu/boardMenuSlice';
import PanelMain from './panels/PanelMain';

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
      {mainMenu && <PanelMain handleClose={handleClose} />}
      {aboutMenu && <PanelAbout handleClose={handleClose} />}
      {backgroundMenu && <PanelBackground handleClose={handleClose} />}
    </StyledDrawer>
  );
};

export default BoardMenu;
