import {
  Add,
  KeyboardArrowDown,
  KeyboardArrowUp,
  DoubleArrow,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  MenuList,
  Typography,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  setSelected,
  setShown,
} from '../../features/listDrawer/listDrawerSlice.js';
import { setShowSidebar } from '../../features//sidebar/sidebarSlice.js';
import { createBoardModal } from '../../features/modal/modalSlice.js';

const StyledBox = styled(Box)(({ theme }) => ({
  width: 40,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'absolute',
  background: `linear-gradient(to bottom, ${alpha(
    theme.palette.common.black,
    theme.palette.action[30]
  )}, ${alpha(theme.palette.common.black, theme.palette.action[0])} 70%)`,
  transition: theme.durations.short,
  '&:hover': {
    cursor: 'pointer',
    background: theme.palette.common.white,
    '& > .double-arrow': {
      color: theme.palette.grey[800],
    },
  },
  marginTop: theme.mixins.denseToolbar.minHeight,
  height: `calc(100vh - ${theme.mixins.denseToolbar.minHeight})`,
  borderRadius: 0,
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  flexShrink: 0,
  [`& .MuiDrawer-paper`]: {
    width: 240,
    boxSizing: 'border-box',
    marginTop: theme.mixins.denseToolbar.minHeight,
  },
  position: 'absolute',
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: 3,
  justifyContent: 'space-around',
  alignItems: 'center',
  marginTop: 12,
}));

const StyledSmallAvatar = styled(Avatar)(({ theme }) => ({
  width: '24px',
  cursor: 'pointer',
  height: '24px',
  transition: theme.durations.short,
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
}));

const ListDrawer = ({ boards }) => {
  const dispatch = useDispatch();

  const [openBoardsMenu, setOpenBoardsMenu] = React.useState(true);

  const { user } = useSelector((state) => state.auth) || {};
  const { value } = useSelector((state) => state.listDrawer);
  const { visibility } = useSelector((state) => state.sidebar);

  const handleOpen = () => {
    dispatch(setShown(true));
    dispatch(setShowSidebar(true));
  };

  const handleClose = () => {
    dispatch(setShown(false));
    dispatch(setShowSidebar(false));
  };

  return (
    <>
      {!visibility && (
        <StyledBox onClick={handleOpen}>
          <Avatar
            variant='rounded'
            sx={{
              width: '30px',
              height: '30px',
              backgroundColor: 'secondary.main',
              mt: 1,
            }}
          >
            {user.firstName[0]}
          </Avatar>
          <DoubleArrow
            className='double-arrow'
            fontSize='20px'
            sx={{ color: 'white', mt: 2 }}
          />
        </StyledBox>
      )}
      <StyledDrawer
        variant='persistent'
        open={visibility}
        anchor='left'
        sx={{ width: visibility ? 240 : 0 }}
      >
        <DrawerHeader>
          <Avatar
            variant='rounded'
            sx={{
              width: '30px',
              height: '30px',
              backgroundColor: 'secondary.main',
            }}
          >
            {user.firstName[0]}
          </Avatar>
          <Typography variant='subtitle1'>
            {user.firstName}'s Workspace
          </Typography>
          <Avatar
            sx={{
              width: '30px',
              height: '30px',
              transform: 'rotate(-180deg)',
              transition: (theme) => theme.durations.short,
              '&:hover': {
                cursor: 'pointer',
                backgroundColor: 'grey.300',
                '& > *': {
                  transition: (theme) => theme.durations.short,
                  color: 'grey.800',
                },
              },
            }}
            variant='rounded'
            onClick={handleClose}
          >
            <DoubleArrow sx={{ fontSize: '20px' }} />
          </Avatar>
        </DrawerHeader>
        <Divider sx={{ my: 2 }} />
        <List>
          <ListItem>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                marginBottom: '0',
              }}
            >
              <ListItemText
                primary={'Your boards'}
                primaryTypographyProps={{
                  variant: 'sidebarHeader',
                  sx: { userSelect: 'none' },
                }}
              />
              <Box
                sx={{ display: 'flex', justifyContent: 'center', margin: 0 }}
              >
                <StyledSmallAvatar variant='rounded'>
                  {openBoardsMenu ? (
                    <KeyboardArrowUp
                      sx={{ color: 'grey.800' }}
                      onClick={() => setOpenBoardsMenu(false)}
                    />
                  ) : (
                    <KeyboardArrowDown
                      onClick={() => setOpenBoardsMenu(true)}
                      sx={{ color: 'grey.800' }}
                    />
                  )}
                </StyledSmallAvatar>

                <StyledSmallAvatar variant='rounded'>
                  <Add
                    onClick={() => dispatch(createBoardModal(true))}
                    sx={{ color: 'grey.800' }}
                  />
                </StyledSmallAvatar>
              </Box>
            </Box>
          </ListItem>
          <Collapse in={openBoardsMenu} timeout='auto'>
            <MenuList>
              {boards &&
                boards.map((board, i) => (
                  <MenuItem
                    key={board._id}
                    disableRipple
                    component={Link}
                    to={`/b/${board._id}`}
                    onClick={() => dispatch(setSelected(i))}
                    selected={i === value}
                  >
                    <Avatar
                      variant='square'
                      src={board.backgroundImage}
                      sx={{ width: '25px', height: '20px', mr: 2 }}
                    />
                    <ListItemText
                      primary={board.title}
                      primaryTypographyProps={{
                        variant: 'sidebar',
                        sx: {
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        },
                      }}
                    />
                  </MenuItem>
                ))}
            </MenuList>
          </Collapse>
        </List>
      </StyledDrawer>
    </>
  );
};

export default ListDrawer;
