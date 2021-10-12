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
} from '@mui/material';

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
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState('');

  const { currentList } = useSelector(
    (state) => state.lists.currentList && state.lists
  );

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
          m: 3,
          alignItems: 'center',
          mb: 0,
          maxHeight: '31px',
        }}
      >
        <Topic />
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
    </>
  );
};

export default Header;
