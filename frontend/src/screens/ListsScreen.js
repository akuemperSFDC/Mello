import { Grid, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListDrawer from '../components/ui/ListDrawer.js';
import { getBoardsAsync } from '../features/boards/boardSlice.js';

const ListsScreen = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { boards } = useSelector((s) => s.boards) || [];

  useEffect(() => {
    dispatch(getBoardsAsync());
  }, [dispatch]);

  return (
    <Grid
      container
      sx={{
        mt: theme.mixins.denseToolbar.minHeight,
        height: `calc(100vh - ${theme.mixins.denseToolbar.minHeight})`,
      }}
    >
      <ListDrawer boards={boards} />
      <div className=''>Testing</div>
    </Grid>
  );
};

export default ListsScreen;
