import { useEffect } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import * as M from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBoardsAsync } from '../features/boards/boardSlice.js';
import SideBar from '../components/ui/SideBar.js';
import Spinner from '../components/utils/Spinner.js';
import { createBoardModal } from '../features/modal/modalSlice.js';

const BoardsScreen = () => {
  const dispatch = useDispatch();

  const boardsMain = useSelector((s) => s.boards);
  let { boards } = boardsMain;
  boards = boards && Object.values(boards);

  const { loading } = useSelector((s) => s.boards) || [];

  const theme = M.useTheme();

  useEffect(() => {
    dispatch(getBoardsAsync());
  }, [dispatch]);

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
          {loading ? (
            <Spinner />
          ) : (
            <Grid container sx={{ px: 2 }}>
              {boards &&
                boards.map((board) => (
                  <Grid
                    key={board._id}
                    item
                    component={Link}
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
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default BoardsScreen;
