import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { styled, alpha } from '@mui/material/styles';
import { StarBorder, Star } from '@mui/icons-material';

import List from './list-components/List.js';
import CreateNewListButton from './list-components/CreateNewListButton.js';

const ListsArea = ({ visible }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [showInput, setShowInput] = useState(false);
  const [favorite, setFavorite] = useState(false);

  const { currentBoard } = useSelector((state) => state.boards);

  const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#ffffff3d',
    '&:hover': {
      backgroundColor: alpha('#ffffff3d', theme.palette.action[10]),
    },
    maxHeight: '30px',
    minWidth: '20px',
  }));

  useEffect(() => {
    // dispatch();
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        m: 1,
      }}
    >
      <Box>
        {showInput ? (
          <div>input</div>
        ) : (
          <StyledButton
            size='small'
            variant='contained'
            onClick={() => setShowInput(true)}
          >
            <Typography variant='h5'>{currentBoard?.title}</Typography>
          </StyledButton>
        )}
        {favorite ? (
          <StyledButton
            onClick={() => setFavorite(false)}
            variant='contained'
            sx={{ maxWidth: '30px', ml: 0.5 }}
          >
            <Star sx={{ width: '20px', height: '20px', color: 'white' }} />
          </StyledButton>
        ) : (
          <StyledButton
            onClick={() => setFavorite(true)}
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
      <Box
        sx={{
          marginTop: 1,
          display: 'flex',
          maxWidth: visible ? 'calc(100vh - 240px)' : 'calc(100vh - 40px)',
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
