import React, { useState } from 'react';
import { styled, alpha, Box, Button, Typography } from '@mui/material';
import { StarBorder, Star } from '@mui/icons-material';

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ffffff3d',
  '&:hover': {
    backgroundColor: alpha('#ffffff3d', theme.palette.action[10]),
  },
  maxHeight: '30px',
  minWidth: '20px',
}));

const ListAreaHeader = ({ currentBoard }) => {
  const [showInput, setShowInput] = useState(false);
  const [favorite, setFavorite] = useState(false);

  return (
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
  );
};

export default ListAreaHeader;
