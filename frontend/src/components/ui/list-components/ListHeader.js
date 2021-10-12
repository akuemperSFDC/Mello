import React, { useState } from 'react';
import {
  Box,
  InputBase,
  styled,
  Typography,
  Fade,
  ClickAwayListener,
  useTheme,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch } from 'react-redux';

import { editListAsync } from '../../../features/lists/listsSlice.js';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  border: `3px solid ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'white',
  maxHeight: '28px',
  padding: 0,
  width: '100%',
  fontSize: '14px',
  lineHeight: '20px',
  wordSpacing: '0px',
  [`& .MuiInputBase-input`]: {
    paddingLeft: '4px',
    paddingRight: '4px',
  },
}));

const ListHeader = ({ list, i }) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [showListInput, setShowListInput] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    if (e.key === 'Enter') {
      dispatch(editListAsync({ id: list._id, title }));
      setShowListInput(false);
    }
  };

  React.useEffect(() => {
    setTitle(list.title);
  }, [list.title]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <ClickAwayListener onClickAway={() => setShowListInput(false)}>
        {showListInput ? (
          <Fade in={showListInput}>
            <Box sx={{ width: 'auto', flexGrow: 1 }}>
              <StyledInputBase
                placeholder='Enter list title...'
                autoFocus={true}
                onFocus={(event) => {
                  event.target.select();
                }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleSubmit}
              />
            </Box>
          </Fade>
        ) : (
          <Box
            id={i}
            onClick={() => setShowListInput(true)}
            sx={{
              minHeight: '28px',
              display: 'flex',
              // alignItems: 'center',
              cursor: 'pointer',
              padding: '6px 8px 2px',
              flexGrow: 1,
            }}
          >
            <Typography
              sx={{
                wordWrap: 'break-word',
                maxWidth: '230px',
                lineHeight: '20px',
              }}
              variant='listTitle'
            >
              {list.title}
            </Typography>
          </Box>
        )}
      </ClickAwayListener>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '30px',
          height: '30px',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: theme.palette.grey[300],
          },
          borderRadius: '4px',
        }}
      >
        <MoreHorizIcon
          sx={{
            fontSize: '22px',
            color: 'common.darkGrey',
          }}
        />
      </Box>
    </Box>
  );
};

export default ListHeader;
