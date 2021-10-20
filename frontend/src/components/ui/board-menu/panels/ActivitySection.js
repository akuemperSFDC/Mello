import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  styled,
  alpha,
  Box,
  ButtonBase,
  Typography,
  Avatar,
} from '@mui/material';
import { Storage } from '@mui/icons-material';
import ActivityInformation from './ActivityInformation';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '6px',
  fontWeight: 500,
  fontSize: '1rem',
  width: '100%',
}));

const iconStyles = {
  width: '22px',
  height: '22px',
};

const ActivitySection = () => {
  const dispatch = useDispatch();

  const { currentBoardActivities } = useSelector(
    (state) => state.activities.currentBoardActivities && state.activities
  );

  return (
    <>
      {/* -------------------------------- Header -------------------------------- */}
      <StyledBox>
        <Storage sx={{ ...iconStyles }} />
        <Typography sx={{ fontWeight: 700, ml: 2 }} variant='subtitle2'>
          Activity
        </Typography>
      </StyledBox>

      {/* --------------------------------- Items -------------------------------- */}
      {currentBoardActivities.map(
        ({
          user,
          documentType,
          typeOfActivity,
          valueOfActivity,
          previousPropertyValue,
          propertyChanged,
          source,
          destination,
          createdAt,
          board,
          list,
          card,
        }) => (
          <Box mt={1} display='flex'>
            <Avatar sx={{ height: '32px', width: '32px' }}>
              {user.firstName[0]}
            </Avatar>
            <ActivityInformation
              user={user}
              documentType={documentType}
              typeOfActivity={typeOfActivity}
              valueOfActivity={valueOfActivity}
              previousPropertyValue={previousPropertyValue}
              propertyChanged={propertyChanged}
              source={source}
              destination={destination}
              createdAt={createdAt}
              board={board}
              list={list}
              card={card}
            />
          </Box>
        )
      )}
    </>
  );
};

export default ActivitySection;
