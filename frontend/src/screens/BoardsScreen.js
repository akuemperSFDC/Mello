import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import { getBoardsAsync } from '../features/boards/boardSlice.js';
import defaultImage from '../img/defaultBackground.jpg';

const BoardsScreen = () => {
  const dispatch = useDispatch();
  const { boards } = useSelector((s) => s.boards) || [];

  useEffect(() => {
    dispatch(getBoardsAsync());
  }, [dispatch]);

  return (
    <Grid
      container
      spacing={2}
      sx={{ width: '100vw', height: '100vh', mt: 10, p: 10 }}
    >
      {boards &&
        boards.map((board) => (
          <Grid item>
            <Paper
              sx={{
                minWidth: '12rem',
                backgroundImage: `url(${defaultImage})`,
                height: '6rem',
                backgroundSize: 'cover',
              }}
            >
              <Typography gutterBottom component='div' sx={{ color: 'white ' }}>
                {board.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
    </Grid>
  );
};

export default BoardsScreen;
