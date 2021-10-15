import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, alpha, Box, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

const CardActionsHeader = ({ title, handleClose }) => {
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        display: 'flex',
        padding: '8px',
      }}
    >
      <IconButton
        sx={{
          color: 'transparent',
          pointerEvents: 'none',
          width: '25px',
          height: '25px',
        }}
      >
        <Close />
      </IconButton>
      <Typography
        sx={{ fontSize: '14px', userSelect: 'none', fontWeight: 600 }}
      >
        {title}
      </Typography>
      <IconButton onClick={handleClose} sx={{ width: '25px', height: '25px' }}>
        <Close sx={{ fontSize: '20px' }} />
      </IconButton>
    </Box>
  );
};

export default CardActionsHeader;
