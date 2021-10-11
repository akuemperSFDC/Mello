import React, { useState, useEffect } from 'react';
import {
  Box,
  ClickAwayListener,
  styled,
  Typography,
  alpha,
  Collapse,
  Button,
  IconButton,
  Fade,
  InputBase,
  List,
  listClasses,
} from '@mui/material';
import { Add, Clear } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import { createCardAsync } from '../../../features/lists/listsSlice.js';

const StyledBox = styled(Box)(({ theme }) => ({
  maxWidth: '250px',
  minHeight: '30px',
  height: '100%',
  justifyContent: 'center',
  padding: '4px 8px',
  marginRight: '0px !important',
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  backgroundColor: '#EBECF0',
  '&:hover': {
    backgroundColor: theme.palette.grey[300],
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  border: `3px solid ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'white',
  width: '100%',
  // maxHeight: '36px',
  padding: 0,
  fontSize: '14px',
  lineHeight: '20px',
  wordSpacing: '0px',
  [`& .MuiInputBase-input`]: {
    padding: '8px 12px',
  },
}));

const AddCardButton = ({ list }) => {
  const dispatch = useDispatch();
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState('');

  const handleCreateCard = () => {
    dispatch(createCardAsync({ id: list._id, title }));
    setShowInput(false);
    setTitle('');
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        setShowInput(false);
        setTitle('');
      }}
    >
      <StyledBox>
        {showInput ? (
          <Fade in={showInput}>
            <Box sx={{ width: '100%' }} onClick={() => setShowInput(true)}>
              <StyledInputBase
                placeholder='Enter a title for this card...'
                autoFocus={true}
                multiline={true}
                minRows='2'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Box>
          </Fade>
        ) : (
          <Box
            onClick={() => setShowInput(true)}
            sx={{
              minHeight: '32px',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <Add sx={{ mr: '5px', fontSize: '14px' }} />
            <Typography sx={{ fontSize: '14px' }}>Add a card</Typography>
          </Box>
        )}
        <Collapse in={showInput}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant='contained'
              size='small'
              sx={{ color: 'white', mr: 1 }}
              onClick={handleCreateCard}
            >
              Add card
            </Button>
            <IconButton disableRipple onClick={() => setShowInput(false)}>
              <Clear
                onClick={() => {
                  setShowInput(false);
                  setTitle('');
                }}
              />
            </IconButton>
          </Box>
        </Collapse>
      </StyledBox>
    </ClickAwayListener>
  );
};

export default AddCardButton;
