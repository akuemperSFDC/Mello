import React from 'react';
import { Box, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';

import ListAreaHeader from './list-components/ListAreaHeader.js';
import List from './list-components/List.js';
import CreateNewListButton from './list-components/CreateNewListButton.js';

const ListsArea = ({ visible }) => {
  const theme = useTheme();

  const { currentBoard } = useSelector((state) => state.boards);

  const boardMenuVisible = useSelector((state) => state.boardMenu.visible);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        m: 1,
      }}
    >
      <ListAreaHeader visible={visible} currentBoard={currentBoard} />
      <Box
        sx={{
          marginTop: 1,
          display: 'flex',
          width: `calc(100% - ${visible ? '240px' : '40px'} - ${
            boardMenuVisible ? '340px' : '0px'
          })`,
          paddingLeft: visible ? '0px' : '40px',
          marginLeft: visible ? '240px' : '0px',
          overflowX: 'auto',
          minHeight: `calc(100vh - ${theme.mixins.denseToolbar.minHeight} - 54px)`,
          '&::-webkit-scrollbar': {
            height: 10,
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#807E7F',
            borderRadius: '20px',
          },
        }}
      >
        <List />
        <CreateNewListButton />
      </Box>
    </Box>
  );
};

export default ListsArea;
