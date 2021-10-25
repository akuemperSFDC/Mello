import { useEffect, useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import * as M from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBoardsAsync } from '../features/boards/boardSlice.js';
import SideBar from '../components/ui/SideBar.js';
import { createBoardModal } from '../features/modal/modalSlice.js';

const BoardsScreen = () => {
  const dispatch = useDispatch();
  const theme = M.useTheme();
  const matches = M.useMediaQuery(theme.breakpoints.down('sm'));

  const [transition, setTransition] = useState(false);

  const boards = useSelector(
    (s) => s.boards.boards && Object.values(s.boards.boards)
  );

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
          <Grid container sx={{ p: matches ? 0 : 2, mt: 3 }}>
            <Grid item sx={{ width: '100%', mb: matches ? 1 : undefined }}>
              <Typography variant='h6' align={matches ? 'center' : undefined}>
                Your boards
              </Typography>
            </Grid>
          </Grid>

          <Grid container sx={{ px: matches ? 0 : 2 }}>
            {boards &&
              boards.map((board, i) => (
                <Grid
                  key={board._id}
                  item
                  component={Link}
                  to={`/b/${board._id}`}
                  sx={{
                    textDecoration: 'none',
                    mb: 3,
                    mr: matches ? undefined : 2,
                    '&:hover': {
                      opacity: 0.8,
                    },
                    width: matches ? '100%' : 'auto',
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
                        minWidth: matches ? '100%' : '11.5rem',
                        maxWidth: matches ? '100%' : '11.5rem',
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
            <Grid item sx={{ width: matches ? '100%' : 'auto' }}>
              <Paper
                onClick={() => dispatch(createBoardModal(true))}
                component={M.Button}
                disableRipple
                sx={{
                  minWidth: matches ? '100%' : '11.5rem',
                  backgroundColor: 'common.grey',
                  height: '6rem',
                  mr: matches ? 0 : 2,
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
