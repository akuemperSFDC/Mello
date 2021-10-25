import { Storage } from '@mui/icons-material';
import {
  Box,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActivitiesForUserAsync } from '../../../../features/activities/activitySlice';
import ActivityItem from './ActivityItem';

const TabPanel = ({ children, value, index }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const currentUserActivities = useSelector(
    (state) => state?.activities?.currentUserActivities
  );

  useEffect(() => {
    dispatch(getActivitiesForUserAsync());
  }, [dispatch]);

  return (
    <Box
      sx={{
        width: matches ? '100%' : '900px',
        mx: 'auto',
        height: '100%',
        overflow: matches ? undefined : 'auto',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Storage sx={{ width: '32px', height: '32px', color: '#172B4D' }} />
        <Box sx={{ flexGrow: 1, ml: 2 }}>
          <Typography
            sx={{ fontSize: '16px', fontWeight: 600, py: 1, color: '#172B4D' }}
          >
            Activity
          </Typography>
          <Divider />
        </Box>
      </Box>
      {currentUserActivities?.map((activity) => (
        <ActivityItem key={activity._id} activity={activity} />
      ))}
    </Box>
  );
};

export default TabPanel;
