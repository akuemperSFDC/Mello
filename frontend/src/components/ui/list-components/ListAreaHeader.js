import React, { useState, useEffect } from 'react';
import { styled, alpha, Box, Button, Typography } from '@mui/material';
import { StarBorder, Star } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import { editBoardAsync } from '../../../features/boards/boardSlice.js';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ffffff3d',
  '&:hover': {
    backgroundColor: alpha('#ffffff3d', theme.palette.action[10]),
  },
  maxHeight: '30px',
  minWidth: '20px',
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

  useEffect(() => {
    if (currentBoard) {
      setTitle(currentBoard.title);
    }
  }, [currentBoard]);

  return (
    <Box>
      {showInput ? (
        <div onClick={() => setShowInput(false)}>{currentBoard.title}</div>
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
          sx={{ maxWidth: '30px', ml: 0.5 }}
        >
          <Star sx={{ width: '20px', height: '20px', color: 'white' }} />
        </StyledButton>
      ) : (
        <StyledButton
          onClick={handleFavorite}
          variant='contained'
          sx={{ maxWidth: '30px', ml: 0.5 }}
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
    </Box>
  );
};

export default ListAreaHeader;
