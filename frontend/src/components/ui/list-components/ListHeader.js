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

  const [showListInput, setShowListInput] = useState(false);
  const [title, setTitle] = useState('');

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
                autoFocus='true'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
              alignItems: 'center',
              cursor: 'pointer',
              padding: '0 8px',
              flexGrow: 1,
            }}
          >
            <Typography variant='listTitle'>{list.title}</Typography>
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
