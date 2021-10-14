import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  styled,
  alpha,
  Menu,
  Box,
  Typography,
  Paper,
  Popper,
} from '@mui/material';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'blue',
}));

const SearchBarResults = ({ focus, anchor, handleClickAway }) => {
  const dispatch = useDispatch();

  const { boardResults } = useSelector(
    (state) => state.search.boardResults && state.search
  );

  const { listResults } = useSelector(
    (state) => state.search.listResults && state.search
  );

  const { cardResults } = useSelector(
    (state) => state.search.cardResults && state.search
  );

  const allResults = [...boardResults, ...listResults, ...cardResults];

  return (
    <Menu
      open={focus}
      anchorEl={anchor}
      hideBackdrop={true}
      disableEnforceFocus={true}
      sx={{
        '&.MuiModal-root': {
          position: 'absolute',
          width: '100%',
          height: '100%',
        },
      }}
    >
      <Box
        sx={{
          width: '575px',
          height: '264px',
          p: '8px',
          display: 'flex',
        }}
      >
        <Box>
          <Typography sx={{ color: 'black' }}>Boards</Typography>
          {boardResults.map((res) => (
            <StyledBox>
              <Paper
                sx={{
                  width: '40px',
                  height: '32px',
                  backgroundImage: `url(${res.backgroundImage})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
              />
            </StyledBox>
          ))}
        </Box>
        <StyledBox></StyledBox>
        <StyledBox></StyledBox>
      </Box>
    </Menu>
  );
};

export default SearchBarResults;
