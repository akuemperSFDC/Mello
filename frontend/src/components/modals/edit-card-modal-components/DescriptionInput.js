import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  styled,
  alpha,
  InputBase,
  Typography,
  ClickAwayListener,
  useTheme,
  Button,
  Box,
  IconButton,
  Fade,
} from '@mui/material';
import { Close } from '@mui/icons-material';

const DescriptionInput = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  return show ? (
    <ClickAwayListener onClickAway={() => setShow(false)}>
      <Box>
        <InputBase
          sx={{
            backgroundColor: '#EAECF0',
            width: '100%',
            fontSize: '14px',
            py: '6px',
            px: 1,
            border: `3px solid ${theme.palette.primary.main}`,
            borderRadius: '4px',
            '& .MuiInputBase-input': {
              padding: 0,
            },
          }}
          placeholder='Add a more detailed description...'
          multiline={true}
          minRows={5}
          maxRows={5}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
          <Button
            variant='contained'
            size='small'
            sx={{ minWidth: '40px', maxWidth: '50px', mr: 1 }}
          >
            Save
          </Button>
          <IconButton
            sx={{ width: '30px', height: '30px' }}
            onClick={() => setShow(false)}
          >
            <Close />
          </IconButton>
        </Box>
      </Box>
    </ClickAwayListener>
  ) : (
    <InputBase
      sx={{
        backgroundColor: '#EAECF0',
        width: '100%',
        fontSize: '14px',
        py: '6px',
        px: 1,
        border: `3px solid transparent`,
        borderRadius: '4px',
        '& .MuiInputBase-input': {
          padding: 0,
        },
      }}
      disabled
      placeholder='Add a more detailed description...'
      multiline={true}
      minRows={2}
      maxRows={5}
      onClick={handleShow}
    />
  );
};

export default DescriptionInput;
