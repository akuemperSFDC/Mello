import React from 'react';
import * as M from '@mui/material';
import * as RR from 'react-redux';
import { createBoardModal } from '../../features/modal/modalSlice.js';
import { createBoardAsync } from '../../features/boards/boardSlice.js';
import defaultImage from '../../img/defaultBackground.jpg';
import Toast from '../utils/Toast.js';

import { styled } from '@mui/material/styles';

const StyledInputBase = styled(M.InputBase)(({ theme }) => ({
  margin: 8,
  marginLeft: 10,
  fontSize: '1rem',
  borderRadius: 4,
  padding: 4,
  width: '90%',
  color: 'white',
  '&:placeholder': {
    opacity: 1,
    color: 'white',
  },
  '&:hover': {
    backgroundColor: theme.palette.common.lightGrey,
  },
  '&.Mui-focused': {
    backgroundColor: theme.palette.common.darkGrey,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.common.lightGrey,
    },
  },
}));

const StyledPaper = styled(M.Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
}));

const StyledBox = styled(M.Box)(({ theme }) => ({
  width: '28px',
  height: '28px',
  marginBottom: '6px',
  '&:hover': {
    cursor: 'pointer',
    opacity: 0.8,
  },
}));

const CreateBoardModal = () => {
  const dispatch = RR.useDispatch();
  const theme = M.useTheme();
  const [open, setOpen] = React.useState(false);

  const [title, setTitle] = React.useState('');

  const createBoard = RR.useSelector((state) => state.modals.createBoard);
  const { errors } = RR.useSelector((s) => s.boards) || [];

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      dispatch(createBoardAsync(title));
      dispatch(createBoardModal(false));
      setTitle('');
    }
  };

  const handleClose = () => {
    dispatch(createBoardModal(false));
  };

  const handleSubmit = () => {
    dispatch(createBoardAsync(title));
    dispatch(createBoardModal(false));
    setTitle('');
  };

  React.useEffect(() => {
    if (errors) {
      setOpen(true);
    }
  }, [errors]);

  return (
    <>
      {errors &&
        errors.map((error) => (
          <Toast open={open} setOpen={setOpen}>
            {error}
          </Toast>
        ))}
      <M.Modal
        open={createBoard}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <M.Grid
          container
          sx={{
            maxWidth: '25em',
            maxHeight: '6em',
            minHeight: '6em',
            mx: 'auto',
            mt: theme.mixins.denseToolbar.minHeight,
          }}
        >
          <M.Grid
            item
            md={9}
            sx={{
              backgroundSize: 'cover',
              backgroundImage: `url(${defaultImage})`,
              minHeight: '100%',
              p: 0,
            }}
          >
            <M.Paper
              id='modal-modal-title'
              variant='h6'
              sx={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                color: 'white',
                minHeight: '100%',
              }}
            >
              <StyledInputBase
                onKeyDown={handleEnterKey}
                multiline={true}
                minRows={1}
                maxRows={2}
                size='small'
                placeholder='Add board title'
                autoFocus={true}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </M.Paper>
          </M.Grid>
          <M.Grid item md={3}>
            <M.Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                ml: '8px',
                alignItems: 'stretch',
                maxHeight: '6em',
                minHeight: '6em',
              }}
            >
              <StyledBox component='div'>
                <StyledPaper />
              </StyledBox>
              <StyledBox>
                <StyledPaper />
              </StyledBox>
              <StyledBox>
                <StyledPaper />
              </StyledBox>
              <StyledBox>
                <StyledPaper />
              </StyledBox>
              <StyledBox>
                <StyledPaper />
              </StyledBox>
              <StyledBox>
                <StyledPaper />
              </StyledBox>
              <StyledBox>
                <StyledPaper />
              </StyledBox>
              <StyledBox>
                <StyledPaper />
              </StyledBox>
              <StyledBox>
                <StyledPaper />
              </StyledBox>
            </M.Box>
          </M.Grid>
          <M.Grid container sx={{ pt: 1 }}>
            <M.Button
              variant='contained'
              disabled={title.length === 0}
              size='small'
              sx={{ px: 2 }}
              onClick={handleSubmit}
            >
              Create board
            </M.Button>
          </M.Grid>
        </M.Grid>
      </M.Modal>
    </>
  );
};

export default CreateBoardModal;
