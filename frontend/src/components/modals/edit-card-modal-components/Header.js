import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Topic, Close } from '@mui/icons-material';
import {
  styled,
  Box,
  InputBase,
  Typography,
  IconButton,
  ClickAwayListener,
  Fade,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import { editCardAsync } from '../../../features/lists/listsSlice';
import { editCurrentCard } from '../../../features/cards/cardSlice.js';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  width: '200px',
  flexGrow: 1,
  ...theme.typography.h6,
  backgroundColor: 'white',
  paddingLeft: '6px',
  paddingRight: '6px',
  paddingTop: '2px',
  paddingBottom: '2px',
  border: `3px solid ${theme.palette.primary.main}`,
  '& .MuiInputBase-input': {
    padding: 0,
    margin: 0,
  },
}));

const Header = ({ currentCard, handleClose }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState('');

  const { currentList } = useSelector(
    (state) => state.lists.currentList && state.lists
  );

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      dispatch(editCardAsync({ id: currentCard._id, title }));
      dispatch(editCurrentCard(title));
      setShowInput(false);
    }
  };

  useEffect(() => {
    if (currentCard) {
      setTitle(currentCard.title);
    }
  }, [currentCard]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          mt: matches ? 1 : 0,
          m: matches ? 0 : 3,
          alignItems: 'center',
          mb: 0,
          maxHeight: '31px',
        }}
      >
        {!matches && <Topic />}
        <ClickAwayListener onClickAway={() => setShowInput(false)}>
          <Box sx={{ display: 'flex', flexGrow: 2, mx: 2, p: 0 }}>
            {showInput ? (
              <Fade in={showInput} timeout={300}>
                <StyledInputBase
                  autoFocus={true}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onFocus={(event) => {
                    event.target.select();
                  }}
                  onKeyDown={handleEnterKey}
                />
              </Fade>
            ) : (
              <Typography
                sx={{
                  flexGrow: 1,
                  cursor: 'pointer',
                  py: '2px',
                  px: '6px',
                  border: '3px solid transparent',
                  '& .MuiTypography-root': {
                    p: 0,
                  },
                }}
                variant='h6'
                onClick={() => setShowInput(true)}
              >
                {title}
              </Typography>
            )}
          </Box>
        </ClickAwayListener>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </Box>
      {!matches && (
        <Box sx={{ ml: 9.2, mt: 0.5, display: 'flex', alignItems: 'flex-end' }}>
          <Typography variant='subtitle2' sx={{ mr: 0.5 }}>
            in list
          </Typography>
          <Typography
            sx={{
              textDecoration: 'underline',
              fontSize: '15px',
            }}
          >
            {currentList.title}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Header;
