import { Box, useTheme, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Toast from '../components/utils/Toast.js';
import ListDrawer from '../components/ui/ListDrawer.js';
import ListsArea from '../components/ui/ListsArea.js';
import { getBoardsAsync } from '../features/boards/boardSlice.js';

const ListsScreen = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [open, setOpen] = useState(false);

  const boards = useSelector(
    (s) => s.boards.boards && Object.values(s.boards?.boards)
  );

  const { visible } = useSelector((state) => state.listDrawer) || false;

  const normalizedBoards = useSelector((s) => s.boards?.boards);
  const curBoard = normalizedBoards && normalizedBoards[id];

  const { errors } = useSelector((state) => state.lists);
  const boardMenuVisible = useSelector((state) => state.boardMenu.visible);

  useEffect(() => {
    dispatch(getBoardsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (errors) {
      setOpen(true);
    }
  }, [errors]);

  return (
    <>
      {errors &&
        errors.map((err, i) => (
          <Toast key={i} open={open} setOpen={setOpen}>
            {err}
          </Toast>
        ))}
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          position: 'relative',
          maxWidth: '100vw',
        }}
      >
        <ListDrawer boards={boards} />

        <Paper
          sx={{
            paddingTop: theme.mixins.denseToolbar.minHeight,
            borderRadius: 0,
            width: '100%',
            backgroundImage: curBoard && `url(${curBoard.backgroundImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundAttachment: 'scroll',
          }}
        >
          <ListsArea visible={visible} />
        </Paper>
      </Box>
    </>
  );
};

export default ListsScreen;
