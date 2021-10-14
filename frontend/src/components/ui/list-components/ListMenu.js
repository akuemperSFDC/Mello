import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  styled,
  alpha,
  Menu,
  Box,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { deleteListAsync } from '../../../features/lists/listsSlice';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '8px',
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  padding: '8px 16px 8px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.common.hoverDark,
  },
}));

const ListMenu = ({ anchorEl, handleClose, open, list }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteListAsync(list._id));
  };

  return (
    <Menu
      anchorEl={anchorEl}
      onClose={handleClose}
      open={open}
      sx={{ '& .MuiList-root': { p: 0 } }}
    >
      <Box sx={{ width: '280px' }}>
        <StyledBox
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
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
            List actions
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{ width: '25px', height: '25px' }}
          >
            <Close sx={{ fontSize: '20px' }} />
          </IconButton>
        </StyledBox>
        <Divider sx={{ mx: 2 }} />

        {/* Action Items */}
        <StyledBox sx={{ flexDirection: 'column', p: 0 }}>
          <StyledTypography sx={{ mt: 0.5 }}>Add card...</StyledTypography>
          <StyledTypography>Copy list...</StyledTypography>
          <StyledTypography sx={{ mb: 0.5 }}>Move list...</StyledTypography>
        </StyledBox>
        <Divider sx={{ mx: 2 }} />
        <StyledBox
          sx={{ flexDirection: 'column', p: 0 }}
          onClick={handleDelete}
        >
          <StyledTypography sx={{ my: 0.5 }}>Delete list</StyledTypography>
        </StyledBox>
      </Box>
    </Menu>
  );
};

export default ListMenu;
