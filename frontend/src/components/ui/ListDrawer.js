import {
  Add,
  ChevronLeft,
  ChevronRight,
  KeyboardArrowDown,
  KeyboardArrowUp,
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
import { styled } from '@mui/material/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSelected } from '../../features/listDrawer/listDrawerSlice.js';
import { createBoardModal } from '../../features/modal/modalSlice.js';

const StyledBox = styled(Box)(({ theme }) => ({
  width: 40,
  display: 'flex',
  justifyContent: 'center',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: theme.palette.secondary.main,
  },
  backgroundColor: theme.palette.primary.main,
  height: `calc(100vh - ${theme.mixins.denseToolbar.minHeight}`,
  transition: 'all 0.5s',
  borderRadius: 0,
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  flexShrink: 0,
  [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  padding: 3,
  justifyContent: 'space-around',
  alignItems: 'center',
  marginTop: `calc(15px +  ${theme.mixins.denseToolbar.minHeight})`,
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

  const [open, setOpen] = React.useState(false);
  const [openBoardsMenu, setOpenBoardsMenu] = React.useState(true);

  const { user } = useSelector((state) => state.auth) || {};
  const { value } = useSelector((state) => state.listDrawer);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {!open && (
        <StyledBox onClick={handleOpen}>
          <ChevronRight sx={{ color: 'white' }} />
        </StyledBox>
      )}
      <StyledDrawer
        variant='persistent'
        open={open}
        anchor='left'
        sx={{ width: open ? 240 : 0 }}
      >
        <DrawerHeader>
          <Avatar variant='rounded' sx={{ width: '30px', height: '30px' }}>
            {user.firstName[0]}
          </Avatar>
          <Typography variant='subtitle1'>
            {user.firstName}'s Workspace
          </Typography>
          <Avatar
            sx={{
              width: '30px',
              height: '30px',
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
            <ChevronLeft />
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
