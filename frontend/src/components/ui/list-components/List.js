import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, styled } from '@mui/material';
import { Droppable } from 'react-beautiful-dnd';

import ListHeader from './ListHeader.js';
import AddCardButton from './AddCardButton.js';
import Card from './Card.js';
import { getListsAsync } from '../../../features/lists/listsSlice.js';

const StyledBox = styled(Box)(({ theme }) => ({
  minWidth: '270px',
  backgroundColor: theme.palette.list.main,
  minHeight: '68px',
  height: '100%',
  maxHeight: `calc(100vh - ${theme.mixins.denseToolbar.minHeight} - 70px)`,
  overflowY: 'auto',
  marginRight: 8,
  borderRadius: theme.shape.borderRadius,
  padding: '4px',
}));

const List = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const currentLists =
    useSelector((state) => Object.values(state.lists.currentLists)) || [];

  useEffect(() => {
    dispatch(getListsAsync(id));
  }, [dispatch, id]);

  return currentLists.map((list, i) => (
    <Fragment key={list._id}>
      <StyledBox>
        <ListHeader list={list} i={i} />
        <Droppable droppableId={list._id}>
          {(provided, snapshot) => (
            <Box
              sx={{ minHeight: 2 }}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {list.cards.map((card, index) => (
                <Card key={card._id} list={list} card={card} index={index} />
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
        <AddCardButton list={list} />
      </StyledBox>
    </Fragment>
  ));
};

export default List;
