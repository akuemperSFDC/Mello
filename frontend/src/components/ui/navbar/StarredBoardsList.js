import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, Box, Typography, useTheme, Paper } from '@mui/material';
import { StarBorder } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const StyledBox = styled(Box)(({ theme }) => ({
  marginTop: 5,
  display: 'flex',
  alignItems: 'center',
  padding: '8px 16px',
  textDecoration: 'none',
  '&:visited': {
    color: 'inherit',
  },
  '&:hover': {
    backgroundColor: theme.palette.common.hoverDark,
    '& .star': {
      color: 'white',
    },
  },
}));

const StarredBoardsList = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { user } = useSelector((state) => state.auth.user && state.auth);

  const boards = useSelector(
    (state) => state.boards.boards && Object.values(state.boards.boards)
  );

  const starredBoards = boards.filter((board) => board.favorite === true);

  return starredBoards.length === 0 ? (
    <StyledBox sx={{ justifyContent: 'center' }}>
      <Typography
        sx={{
          fontSize: '14px',
          color: theme.palette.warning.dark,
          fontWeight: 600,
        }}
      >
        No starred boards
      </Typography>
    </StyledBox>
  ) : (
    starredBoards.map((board) => (
      <StyledBox component={Link} to={`/b/${board._id}`}>
        <Paper
          sx={{
            width: '40px',
            height: '32px',
            backgroundImage: `url(${board.backgroundImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            ml: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: '12px',
              fontWeight: 600,
              maxWidth: '90%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {board.title}
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {user.firstName}'s Workspace
          </Typography>
        </Box>
        <Box sx={{ ml: 'auto' }}>
          <StarBorder className='star' sx={{ color: '#F5E061' }} />
        </Box>
      </StyledBox>
    ))
  );
};

export default StarredBoardsList;
