import { Box, useTheme, Paper } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ListDrawer from '../components/ui/ListDrawer.js';
import { getBoardsAsync } from '../features/boards/boardSlice.js';

const ListsScreen = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { boards } = useSelector((s) => s.boards) || [];
  const { visible } = useSelector((state) => state.listDrawer) || false;

  const normalizeBoards = {};

  boards &&
    boards.forEach((board) => {
      normalizeBoards[board._id] = board;
    });

  const curBoard = normalizeBoards[id];

  useEffect(() => {
    dispatch(getBoardsAsync());
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        position: 'relative',
      }}
    >
      <ListDrawer boards={boards} />

      <Paper
        sx={{
          paddingLeft: visible ? '250px' : '40px',
          paddingTop: theme.mixins.denseToolbar.minHeight,
          borderRadius: 0,
          width: '100%',
          backgroundImage: curBoard && `url(${curBoard.backgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        The fuck
      </Paper>
    </Box>
  );
};

export default ListsScreen;
