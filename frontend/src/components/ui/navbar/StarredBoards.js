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
import StarredBoardsList from './StarredBoardsList';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 16px',
}));

const StarredBoards = () => {
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
          Starred
        </Typography>
        <KeyboardArrowDown sx={{ color: 'white' }} />
      </Button>
      <Menu sx={{ mt: 1 }} onClick={handleClose} open={open} anchorEl={anchor}>
        <Box sx={{ minWidth: '304px' }}>
          <StyledBox>
            <Close sx={{ color: 'transparent', pointerEvents: 'none' }} />
            <Typography sx={{ mx: 'auto', userSelect: 'none' }}>
              Starred boards
            </Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </StyledBox>
          <Divider variant='middle' />
        </Box>
        <StarredBoardsList />
      </Menu>
    </>
  );
};

export default StarredBoards;
