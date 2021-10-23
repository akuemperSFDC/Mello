import React, { useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import ListAreaHeader from './list-components/ListAreaHeader.js';
import List from './list-components/List.js';
import CreateNewListButton from './list-components/CreateNewListButton.js';
import { DragDropContext } from 'react-beautiful-dnd';
import {
  dragAndDropCardAsync,
  dragAndDropCard,
} from '../../features/lists/listsSlice.js';

const ListsArea = ({ visible }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const small = useMediaQuery(theme.breakpoints.down('sm'));

  const { currentBoard } = useSelector((state) => state.boards);

  const { sorted, cards, destinationListId, sourceListId, movedCard } =
    useSelector((state) => state.lists.dnd && state.lists.dnd);

  const boardMenuVisible = useSelector((state) => state.boardMenu.visible);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    dispatch(
      dragAndDropCard({
        cardId: draggableId,
        destinationListId: destination.droppableId,
        destinationIndex: destination.index,
        sourceIndex: source.index,
        sourceListId: source.droppableId,
        sorted: true,
        movedCard: draggableId,
      })
    );
  };

  useEffect(() => {
    if (sorted) {
      dispatch(
        dragAndDropCardAsync({
          cards,
          destinationListId,
          sourceListId,
          movedCard,
        })
      );
    }
  }, [dispatch, sorted, cards, destinationListId, sourceListId, movedCard]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        m: 1,
      }}
    >
      <ListAreaHeader visible={visible} currentBoard={currentBoard} />
      <DragDropContext onDragEnd={onDragEnd}>
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
            minHeight: `calc(100vh - ${theme.mixins.denseToolbar.minHeight} - ${
              small ? '76px' : '54px'
            })`,
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
      </DragDropContext>
    </Box>
  );
};

export default ListsArea;
