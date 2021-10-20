import { Storage } from '@mui/icons-material';
import { Avatar, Box, Button, styled, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getNextActivitiesByBoardAsync } from '../../../../features/activities/activitySlice';
import ActivityInformation from './ActivityInformation';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '6px',
  fontWeight: 500,
  fontSize: '1rem',
}));

const iconStyles = {
  width: '22px',
  height: '22px',
};

const ActivitySection = () => {
  const dispatch = useDispatch();

  const { currentBoard } = useSelector(
    (state) => state.boards.currentBoard && state.boards
  );

  const { currentBoardActivities, prevItem, lastItemFetched, loading } =
    useSelector(
      (state) => state.activities.currentBoardActivities && state.activities
    );

  const handleNextBatch = () => {
    dispatch(
      getNextActivitiesByBoardAsync({
        id: currentBoard._id,
        prevItem,
      })
    );
  };

  return (
    <Box>
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
          _id,
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
          <Box mt={1} mb={2} display='flex' key={_id}>
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
      {lastItemFetched ? (
        <Typography
          sx={{
            width: '100%',
            flexGrow: 1,
            textAlign: 'center',
            userSelect: 'none',
          }}
        >
          No more activities
        </Typography>
      ) : (
        <Button
          disableRipple
          onClick={handleNextBatch}
          sx={{ width: '100%', flexGrow: 1 }}
        >
          {loading ? 'Loading...' : 'Load more activity'}
        </Button>
      )}
    </Box>
  );
};

export default ActivitySection;
