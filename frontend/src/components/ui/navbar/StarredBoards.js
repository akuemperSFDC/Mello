import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  styled,
  alpha,
  Button,
  Typography,
  Menu,
  Box,
  Divider,
  Paper,
  useTheme,
  IconButton,
} from '@mui/material';
import {
  Close,
  KeyboardArrowDown,
  Star,
  StarBorder,
} from '@mui/icons-material';
import StarredBoardsList from './StarredBoardsList';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 16px',
}));

const StarredBoards = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

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
