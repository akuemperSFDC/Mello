import { Close, Search } from '@mui/icons-material';
import {
  Box,
  ClickAwayListener,
  IconButton,
  InputBase,
  styled,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  getBoardsSearchAsync,
  getCardsSearchAsync,
  getListsSearchAsync,
} from '../../../features/search/searchSlice';
import SearchBarResults from './SearchBarResults';

const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'focus',
})(({ focus, theme }) => ({
  backgroundColor: '#ffffff66',
  maxHeight: '32px',
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  minWidth: '240px',
  maxWidth: '240px',
  '&:hover': {
    backgroundColor: '#ffffff80',
  },
  '&.Mui-focused': {
    backgroundColor: 'white',
  },
  ...(focus && {
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white',
    },
  }),
}));

const StyledInputBase = styled(InputBase, {
  shouldForwardProp: (prop) => prop !== 'focus',
})(({ focus, theme }) => ({
  maxHeight: '32px',
  flexGrow: 1,
  marginRight: '100px',
  padding: '4px 4px 4px 0px',
  fontSize: '14px',
  '& .MuiInputBase-input': {
    '&::placeholder': {
      color: 'white',
      opacity: 1,
    },
  },
  ...(focus && {
    '& .MuiInputBase-input': {
      '&::placeholder': {
        color: 'black',
        opacity: 1,
      },
    },
  }),
}));

const SearchBar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [focus, setFocus] = useState(false);
  const [search, setSearch] = useState('');
  const [anchor, setAnchor] = useState(null);

  const handleClick = (e) => {
    setFocus(true);
    setAnchor(e.currentTarget);
  };

  const handleClickAway = () => {
    setFocus(false);
    setSearch('');
  };

  useEffect(() => {
    if (search) {
      dispatch(getBoardsSearchAsync(search));
      dispatch(getListsSearchAsync(search));
      dispatch(getCardsSearchAsync(search));
    }
  }, [dispatch, search]);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <>
        <StyledBox focus={focus}>
          <Search sx={{ m: 0.5, color: focus ? 'black' : 'white' }} />
          <StyledInputBase
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            focus={focus}
            sx={{ color: focus ? 'black' : 'white', mr: 'auto' }}
            onClick={handleClick}
            placeholder='Search'
          />
          {focus && (
            <IconButton sx={{ width: '24px', height: '24px', mr: 0.75 }}>
              <Close
                sx={{
                  color: theme.palette.grey[700],
                  fontSize: '16px',
                }}
              />
            </IconButton>
          )}
          <SearchBarResults
            focus={focus}
            anchor={anchor}
            handleClickAway={handleClickAway}
          />
        </StyledBox>
      </>
    </ClickAwayListener>
  );
};

export default SearchBar;
