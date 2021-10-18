import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu } from '@mui/material';
import { deleteListAsync } from '../../../../features/lists/listsSlice';
import PanelMain from './PanelMain';
import PanelMoveList from './PanelMoveList';
import PanelCopyList from './PanelCopyList';

const ListMenu = ({ anchorEl, handleClose, open, list }) => {
  const dispatch = useDispatch();

  const { mainMenu, copyMenu, moveMenu } = useSelector(
    (state) => state.listMenu
  );

  const handleDelete = () => {
    dispatch(deleteListAsync(list._id));
  };

  return (
    <Menu
      anchorEl={anchorEl}
      onClose={handleClose}
      open={open}
      sx={{ '& .MuiList-root': { p: 0 } }}
    >
      {/* Main panel */}
      {mainMenu && (
        <PanelMain handleDelete={handleDelete} handleClose={handleClose} />
      )}
      {/* Add card */}
      {/* Copy list panel */}
      {copyMenu && <PanelCopyList handleClose={handleClose} list={list} />}
      {/* Move list panel */}
      {moveMenu && <PanelMoveList handleClose={handleClose} list={list} />}
    </Menu>
  );
};

export default ListMenu;