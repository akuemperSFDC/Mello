import { Description } from '@mui/icons-material';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import DescriptionInput from './DescriptionInput';
import SideMenu from './SideMenu';

const Body = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: matches ? 'column' : 'row',
        mx: 3,
        my: 3,
      }}
    >
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {!matches && <Description />}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            ml: matches ? 0 : 3,
            mr: matches ? 0 : 2,
            flexGrow: 1,
          }}
        >
          {!matches && (
            <Typography sx={{ fontWeight: 500, mb: 0.5 }}>
              Description
            </Typography>
          )}
          <DescriptionInput />
        </Box>
      </Box>
      <SideMenu />
    </Box>
  );
};

export default Body;
