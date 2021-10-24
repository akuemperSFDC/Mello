import { useEffect, useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import * as M from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  getBoardsAsync,
  viewBoardAsync,
} from '../features/boards/boardSlice.js';
import SideBar from '../components/ui/SideBar.js';
import { createBoardModal } from '../features/modal/modalSlice.js';

const BoardsScreen = () => {
  const dispatch = useDispatch();
  const theme = M.useTheme();

  const [transition, setTransition] = useState(false);

  const boards = useSelector(
    (s) => s.boards.boards && Object.values(s.boards.boards)
  );

  const handleViewBoard = (id) => {
    dispatch(viewBoardAsync(id));
  };

  useEffect(() => {
    dispatch(getBoardsAsync());
  }, [dispatch]);

  useEffect(() => {
    setTransition(true);
  }, []);

  return (
    <>
      <Grid
        container
        flexGrow={1}
        sx={{
          mt: theme.mixins.denseToolbar.minHeight,
          p: 1,
          maxWidth: 'lg',
          mx: 'auto',
        }}
      >
        {/* Sidebar */}
        <SideBar />

        {/* Main content */}
        <Grid item md={9}>
          <Grid container sx={{ p: 2, mt: 3 }}>
            <Grid item>
              <Typography variant='h6'>Your boards</Typography>
            </Grid>
          </Grid>

          <Grid container sx={{ px: 2 }}>
            {boards &&
              boards.map((board, i) => (
                <Grid
                  key={board._id}
                  item
                  component={Link}
                  onClick={() => handleViewBoard(board._id)}
                  to={`/b/${board._id}`}
                  sx={{
                    textDecoration: 'none',
                    mb: 3,
                    mr: 2,
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                >
                  <M.Slide
                    in={transition}
                    direction='down'
                    timeout={300 + 60 * i}
                    easing='ease-in-out'
                  >
                    <Paper
                      sx={{
                        minWidth: '11.5rem',
                        maxWidth: '11.5rem',
                        backgroundImage: `url(${board.backgroundImage})`,
                        height: '6rem',
                        backgroundPosition: 'center',
                      }}
                    >
                      <Paper
                        sx={{
                          minWidth: '11.5rem',
                          backgroundColor: 'rgba(0, 0, 0, 0.13)',
                          height: '6rem',
                        }}
                      >
                        <Typography
                          gutterBottom
                          component='div'
                          sx={{
                            color: 'white',
                            p: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {board.title}
                        </Typography>
                      </Paper>
                    </Paper>
                  </M.Slide>
                </Grid>
              ))}
            {/* Add new board button */}
            <Grid item>
              <Paper
                onClick={() => dispatch(createBoardModal(true))}
                component={M.Button}
                disableRipple
                sx={{
                  minWidth: '11.5rem',
                  backgroundColor: 'common.grey',
                  height: '6rem',
                  mr: 2,
                }}
              >
                <Typography gutterBottom component='div'>
                  Create a new board
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default BoardsScreen;
