import React, { useState, useEffect } from 'react';
import {
  styled,
  alpha,
  Box,
  Button,
  Typography,
  InputBase,
  ClickAwayListener,
  Grid,
  useMediaQuery,
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
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  '&.MuiButton-root': {
    maxWidth: '100%',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  backgroundColor: 'white',
  maxHeight: '30px',
  minHeight: '30px',
  borderRadius: theme.shape.borderRadius,
  border: `3px solid ${theme.palette.primary.main}`,
  marginRight: 5,
  maxWidth: '300px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const ListAreaHeader = ({ currentBoard, visible }) => {
  const dispatch = useDispatch();
  const small = useMediaQuery((theme) => theme.breakpoints.down('sm'));

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
    <Grid
      container
      direction='row'
      justifyContent='center'
      sx={{
        pl: visible ? '240px' : '40px',
        maxWidth: small ? '100%' : '60%',
      }}
    >
      <Grid item xs={11} md>
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
            <Typography
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              variant='h5'
            >
              {currentBoard?.title}
            </Typography>
          </StyledButton>
        )}
      </Grid>
      <Grid item xs={1} md={1}>
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
      </Grid>
      <Grid item justifyContent='center' md={3}>
        <StyledButton onClick={handleClick}>
          <MoreHoriz sx={{ color: 'white', mr: 0.5, fontSize: '18px' }} />
          <Typography
            sx={{ color: 'white', fontSize: '14px', fontWeight: 500 }}
          >
            Show menu
          </Typography>
        </StyledButton>
      </Grid>

      <BoardMenu />
    </Grid>
  );
};

export default ListAreaHeader;
