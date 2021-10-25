import { Typography } from '@mui/material';
import DateFormatter from './DateFormatter';

const CustomSpan = ({ children }) => {
  return (
    <span style={{ textDecoration: 'underline', fontWeight: 600 }}>
      {children}
    </span>
  );
};

const ActivityParser = ({ activity }) => {
  const {
    documentType,
    typeOfActivity,
    valueOfActivity,
    source,
    destination,
    previousPropertyValue,
    propertyChanged,
    user,
    board,
    createdAt,
  } = activity;

  let createdBoardFlag = false;
  if (documentType === 'board' && typeOfActivity === 'added') {
    createdBoardFlag = true;
  } else {
    createdBoardFlag = false;
  }

  /* -------------------------------- Boards -------------------------------- */
  let addedBoard;
  let changedBoard;
  let deletedBoard;
  let renamedBoard;

  if (documentType === 'board') {
    if (typeOfActivity === 'added') {
      addedBoard = (
        <>
          <span>created board </span>
          <CustomSpan>{valueOfActivity}</CustomSpan>
        </>
      );
    }

    if (typeOfActivity === 'changed') {
      if (propertyChanged === 'background image') {
        changedBoard = (
          <>
            <span>changed the background image</span>
          </>
        );
      }
      if (propertyChanged === 'description') {
        changedBoard = (
          <>
            <span>changed the description of board </span>
            <CustomSpan>{board.title}</CustomSpan>
          </>
        );
      }
      if (propertyChanged === 'favorite') {
        changedBoard = (
          <>
            <span>
              {valueOfActivity === 'false' ? 'un-starred' : 'starred'} the board{' '}
            </span>
            <CustomSpan>{board.title}</CustomSpan>
          </>
        );
      }
    }

    if (typeOfActivity === 'deleted') {
      deletedBoard = (
        <>
          <span>deleted board </span>
          <CustomSpan>{valueOfActivity}</CustomSpan>
        </>
      );
    }

    if (typeOfActivity === 'renamed') {
      renamedBoard = (
        <>
          <span>renamed board </span>
          <CustomSpan>{previousPropertyValue}</CustomSpan>
          <span> to </span>
          <CustomSpan>{valueOfActivity}</CustomSpan>{' '}
        </>
      );
    }
  }

  /* -------------------------------- Lists -------------------------------- */
  let addedList;
  let changedList;
  let copiedList;
  let deletedList;
  let movedList;
  let renamedList;
  if (documentType === 'list') {
    if (typeOfActivity === 'added') {
      addedList = (
        <>
          <span>created list </span>
          <CustomSpan>{valueOfActivity}</CustomSpan>
        </>
      );
    }

    if (typeOfActivity === 'copied') {
      copiedList = (
        <>
          <span>copied list </span>
          <CustomSpan>{valueOfActivity}</CustomSpan>
          <span> to board </span>
          <CustomSpan>{destination}</CustomSpan>
          <span> from board </span>
          <CustomSpan>{source}</CustomSpan>
        </>
      );
    }

    if (typeOfActivity === 'deleted') {
      deletedList = (
        <>
          <span>deleted list </span>
          <CustomSpan>{valueOfActivity}</CustomSpan>
          <span> from board </span>
          <CustomSpan>{source}</CustomSpan>
        </>
      );
    }

    if (typeOfActivity === 'moved') {
      movedList = (
        <>
          <span>moved list </span>
          <CustomSpan>{valueOfActivity}</CustomSpan>
          <span> to board </span>
          <CustomSpan>{destination}</CustomSpan>
          <span> from board </span>
          <CustomSpan>{source}</CustomSpan>
        </>
      );
    }

    if (typeOfActivity === 'renamed') {
      renamedList = (
        <>
          <span>changed the title of list </span>
          <CustomSpan>{previousPropertyValue}</CustomSpan>
          <span> to </span>
          <CustomSpan>{valueOfActivity}</CustomSpan>
        </>
      );
    }
  }

  /* -------------------------------- Cards -------------------------------- */
  let addedCard;
  let changedCard;
  let copiedCard;
  let deletedCard;
  let movedCard;
  let renamedCard;
  if (documentType === 'card') {
    if (typeOfActivity === 'added') {
      if (propertyChanged === 'description') {
        addedCard = (
          <>
            <span>added description to card </span>
            <CustomSpan>{source}</CustomSpan>
          </>
        );
      } else {
        addedCard = (
          <>
            <span>created card </span>
            <CustomSpan>{valueOfActivity}</CustomSpan>
            <span> to list </span>
            <CustomSpan>{destination}</CustomSpan>
          </>
        );
      }
    }

    if (typeOfActivity === 'changed') {
      changedCard = (
        <>
          <span>changed description of card </span>
          <CustomSpan>{source}</CustomSpan>
        </>
      );
    }

    if (typeOfActivity === 'copied') {
      copiedCard = (
        <>
          <span>copied card </span>
          <CustomSpan>{valueOfActivity}</CustomSpan>
          <span> to list </span>
          <CustomSpan>{destination}</CustomSpan>
          <span> from list </span>
          <CustomSpan>{source}</CustomSpan>
        </>
      );
    }

    if (typeOfActivity === 'deleted') {
      deletedCard = (
        <>
          <span>deleted card </span>
          <CustomSpan>{valueOfActivity}</CustomSpan>
          <span> from list </span>
          <CustomSpan>{source}</CustomSpan>
        </>
      );
    }

    if (typeOfActivity === 'moved') {
      movedCard = (
        <>
          <span>moved card </span>
          <CustomSpan>{valueOfActivity}</CustomSpan>
          <span> to list </span>
          <CustomSpan>{destination}</CustomSpan>
          <span> from list </span>
          <CustomSpan>{source}</CustomSpan>
        </>
      );
    }

    if (typeOfActivity === 'renamed') {
      renamedCard = (
        <>
          <span>renamed card </span>
          <CustomSpan>{previousPropertyValue}</CustomSpan>
          <span> to </span>
          <CustomSpan>{valueOfActivity}</CustomSpan>
        </>
      );
    }
  }

  return (
    <Typography component='div'>
      {addedBoard && addedBoard}
      {changedBoard && changedBoard}
      {deletedBoard && deletedBoard}
      {renamedBoard && renamedBoard}
      {addedList && addedList}
      {changedList && changedList}
      {copiedList && copiedList}
      {deletedList && deletedList}
      {movedList && movedList}
      {renamedList && renamedList}
      {addedCard && addedCard}
      {changedCard && changedCard}
      {copiedCard && copiedCard}
      {deletedCard && deletedCard}
      {movedCard && movedCard}
      {renamedCard && renamedCard}
      <DateFormatter
        createdAt={createdAt}
        board={board}
        createdBoardFlag={createdBoardFlag}
      />
    </Typography>
  );
};

export default ActivityParser;
