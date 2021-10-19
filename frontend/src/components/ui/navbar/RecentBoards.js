import { Close, KeyboardArrowDown } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  styled,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import RecentBoardsList from './RecentBoardsList';
import StarredBoardsList from './StarredBoardsList';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 16px',
}));

const RecentBoards = () => {
  const [anchor, setAnchor] = useState(null);
  const open = !!anchor;

  const handleClick = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        disableRipple
        sx={{ '&:hover': { backgroundColor: '#ffffff50' } }}
      >
        <Typography sx={{ color: 'white', fontSize: '15px' }}>
          Recent
        </Typography>
        <KeyboardArrowDown sx={{ color: 'white' }} />
      </Button>
      <Menu sx={{ mt: 1 }} onClick={handleClose} open={open} anchorEl={anchor}>
        <Box sx={{ minWidth: '304px' }}>
          <StyledBox>
            <Close sx={{ color: 'transparent', pointerEvents: 'none' }} />
            <Typography sx={{ mx: 'auto', userSelect: 'none' }}>
              Recent boards
            </Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </StyledBox>
          <Divider variant='middle' />
        </Box>
        <RecentBoardsList />
      </Menu>
    </>
  );
};

export default RecentBoards;
