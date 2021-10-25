import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  ListItemText,
  MenuItem,
  MenuList,
  useTheme,
} from '@mui/material';
import * as M from '@mui/material';
import * as RR from 'react-redux';
import { setSelected } from '../../features/sidebar/sidebarSlice.js';
import { useLocation } from 'react-router-dom';

const SideBar = () => {
  const dispatch = RR.useDispatch();
  const theme = useTheme();
  const matches = M.useMediaQuery(theme.breakpoints.down('sm'));
  const sidebar = RR.useSelector((state) => state.sidebar);
  const { value } = sidebar;
  const { pathname } = useLocation();

  const handleClick = (e, index) => {
    dispatch(setSelected(index));
  };

  const menuItems = [
    {
      name: 'Boards',
      to: '/boards',
    },
    {
      name: 'Templates',
      to: '/boards/templates',
    },
  ];

  useEffect(() => {
    if (pathname === '/boards') {
      dispatch(setSelected(0));
    }

    if (pathname === '/boards/templates') {
      dispatch(setSelected(1));
    }
  }, [pathname, dispatch]);

  return (
    <M.Grid
      item
      md={3}
      sx={{ pt: matches ? 0 : 2, width: matches ? '100%' : undefined }}
    >
      <Grid container direction='column' justifyContent='end'>
        <M.List>
          <MenuList>
            {menuItems.map((item, index) => (
              <MenuItem
                sx={{ width: matches ? '100%' : 'auto' }}
                key={index}
                disableRipple
                selected={index === value}
                onClick={(e) => handleClick(e, index)}
                component={Link}
                to={item.to}
              >
                <ListItemText
                  sx={{
                    mx: matches ? 'auto' : undefined,
                    ml: 'auto',
                    textAlign: matches && 'center',
                  }}
                >
                  {item.name}
                </ListItemText>
              </MenuItem>
            ))}
          </MenuList>
        </M.List>
      </Grid>
    </M.Grid>
  );
};

export default SideBar;
