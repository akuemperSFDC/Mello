import React, { useState, useEffect } from 'react';
import {
  styled,
  alpha,
  Box,
  Button,
  Typography,
  InputBase,
  ClickAwayListener,
} from '@mui/material';
import { StarBorder, Star, MoreHoriz } from '@mui/icons-material';
import { useDispatch } from 'react-redux';

import { editBoardAsync } from '../../../features/boards/boardSlice.js';
import BoardMenu from '../board-menu/BoardMenu.js';
import { menuVisible } from '../../../features/boardMenu/boardMenuSlice.js';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ffffff3d',
  '&:hover': {
    backgroundColor: alpha('#ffffff3d', theme.palette.action[10]),
  },
  maxHeight: '30px',
  minWidth: '20px',
  marginRight: 5,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  backgroundColor: 'white',
  maxHeight: '30px',
  borderRadius: theme.shape.borderRadius,
  border: `3px solid ${theme.palette.primary.main}`,
}));

const ListAreaHeader = ({ currentBoard }) => {
  const dispatch = useDispatch();

  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState('');

  const handleFavorite = () => {
    dispatch(
      editBoardAsync({ id: currentBoard._id, favorite: !currentBoard.favorite })
    );
  };

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      dispatch(
        editBoardAsync({
          id: currentBoard._id,
          title,
        })
      );
      setShowInput(false);
    }
  };

  const handleClick = () => {
    dispatch(menuVisible(true));
  };

  useEffect(() => {
    if (currentBoard) {
      setTitle(currentBoard.title);
    }
  }, [currentBoard]);

  return (
    <Box sx={{ display: 'flex' }}>
      {showInput ? (
        <ClickAwayListener onClickAway={() => setShowInput(false)}>
          <StyledInputBase
            onKeyDown={handleEnterKey}
            value={title}
            autoFocus={true}
            onFocus={(event) => {
              event.target.select();
            }}
            onChange={(e) => setTitle(e.target.value)}
          />
        </ClickAwayListener>
      ) : (
        <StyledButton
          size='small'
          variant='contained'
          onClick={() => setShowInput(true)}
        >
          <Typography variant='h5'>{currentBoard?.title}</Typography>
        </StyledButton>
      )}
      {currentBoard && currentBoard.favorite ? (
        <StyledButton
          onClick={handleFavorite}
          variant='contained'
          sx={{ maxWidth: '30px' }}
        >
          <Star sx={{ width: '20px', height: '20px', color: 'white' }} />
        </StyledButton>
      ) : (
        <StyledButton
          onClick={handleFavorite}
          variant='contained'
          sx={{ maxWidth: '30px' }}
        >
          <StarBorder
            sx={{
              width: '20px',
              height: '20px',
              color: 'white',
            }}
          />
        </StyledButton>
      )}
      <StyledButton onClick={handleClick}>
        <MoreHoriz sx={{ color: 'white', mr: 0.5, fontSize: '18px' }} />
        <Typography sx={{ color: 'white', fontSize: '14px', fontWeight: 500 }}>
          Show menu
        </Typography>
      </StyledButton>
      <BoardMenu />
    </Box>
  );
};

export default ListAreaHeader;
