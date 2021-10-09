import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, ListItemText, MenuItem, MenuList } from '@mui/material';
import * as M from '@mui/material';
import * as RR from 'react-redux';
import { setSelected } from '../../features/sidebar/sidebarSlice.js';

const SideBar = () => {
  const dispatch = RR.useDispatch();
  const sidebar = RR.useSelector((state) => state.sidebar);
  const { value } = sidebar;

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

  return (
    <M.Grid item md={3} sx={{ pt: 2 }}>
      <Grid container direction='column' justifyContent='end'>
        <M.List>
          <MenuList>
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                disableRipple
                selected={index === value}
                onClick={(e) => handleClick(e, index)}
                component={Link}
                to={item.to}
              >
                <ListItemText>{item.name}</ListItemText>
              </MenuItem>
            ))}
          </MenuList>
        </M.List>
      </Grid>
    </M.Grid>
  );
};

export default SideBar;
