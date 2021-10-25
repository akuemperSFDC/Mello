import { Typography } from '@mui/material';
import DateFormatter from './DateFormatter';

const typographyStyles = {
  fontSize: '14px',
  userSelect: 'none',
};

const CustomSpan = ({
  content,
  fontWeight = 600,
  textDecoration = 'underline',
}) => {
  return <span style={{ fontWeight, textDecoration }}>{content}</span>;
};

const ActivityInformationParse = ({
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
}) => {
  /* --------------------------------- boards -------------------------------- */

  let renameBoard;
  let createBoard;
  let changedBoard;

  if (documentType === 'board') {
    if (typeOfActivity === 'renamed') {
      renameBoard = (
        <>
          <CustomSpan
            content={user.firstName}
            textDecoration='none'
            fontWeight={800}
          />{' '}
          {typeOfActivity} this board to{' '}
          <CustomSpan content={valueOfActivity} />
        </>
      );
    }
    if (typeOfActivity === 'added') {
      createBoard = (
        <>
          <CustomSpan
            content={user.firstName}
            fontWeight={800}
            textDecoration='none'
          />
          {' created this board'}
        </>
      );
    }
    if (typeOfActivity === 'changed') {
      if (propertyChanged === 'favorite') {
        changedBoard = (
          <>
            <CustomSpan
              content={user.firstName}
              fontWeight={800}
              textDecoration='none'
            />{' '}
            <span>
              {valueOfActivity === 'false' ? 'un-starred' : 'starred'} this
              board
            </span>
          </>
        );
      } else {
        changedBoard = (
          <>
            <CustomSpan
              content={user.firstName}
              fontWeight={800}
              textDecoration='none'
            />{' '}
            changed the {propertyChanged} of this board
          </>
        );
      }
    }
  }

  /* --------------------------------- lists -------------------------------- */

  let renameList;
  let createList;
  let changedList;
  let movedList;
  let copiedList;
  let deletedList;

  if (documentType === 'list') {
    if (typeOfActivity === 'renamed') {
      renameList = (
        <>
          <CustomSpan
            content={user.firstName}
            fontWeight={800}
            textDecoration='none'
          />{' '}
          {typeOfActivity} the list{' '}
          <CustomSpan
            content={previousPropertyValue}
            fontWeight={600}
            endSpace={false}
          />{' '}
          to{' '}
          <CustomSpan
            content={valueOfActivity}
            fontWeight={600}
            endSpace={false}
          />
        </>
      );
    }
    if (typeOfActivity === 'added') {
      createList = (
        <>
          <CustomSpan
            content={user.firstName}
            fontWeight={800}
            textDecoration='none'
          />{' '}
          created the list{' '}
          <CustomSpan
            content={valueOfActivity}
            fontWeight={600}
            endSpace={false}
          />
        </>
      );
    }
    if (typeOfActivity === 'moved') {
      movedList = (
        <>
          <CustomSpan
            content={user.firstName}
            fontWeight={800}
            textDecoration='none'
          />
          {' moved list '}
          <CustomSpan content={valueOfActivity} />
          {' to list '}
          <CustomSpan content={destination} />
        </>
      );
    }
    if (typeOfActivity === 'copied') {
      copiedList = (
        <>
          <CustomSpan
            content={user.firstName}
            fontWeight={800}
            textDecoration='none'
          />
          {' copied the list '}
          <CustomSpan content={valueOfActivity} />
          {' from board '}
          <CustomSpan content={source} />
        </>
      );
    }
    if (typeOfActivity === 'deleted') {
      deletedList = (
        <>
          <CustomSpan
            content={user.firstName}
            fontWeight={800}
            textDecoration='none'
          />
          {' deleted the list '}
          <CustomSpan content={valueOfActivity} />
        </>
      );
    }
  }

  /* --------------------------------- card -------------------------------- */

  let renameCard;
  let createCard;
  let changedCard;
  let movedCard;
  let copiedCard;
  let deletedCard;

  if (documentType === 'card') {
    if (typeOfActivity === 'renamed') {
      renameCard = (
        <>
          <CustomSpan
            content={user.firstName}
            fontWeight={800}
            textDecoration='none'
          />{' '}
          {typeOfActivity}
          {' the card '}
          <CustomSpan
            content={previousPropertyValue}
            fontWeight={600}
            endSpace={false}
          />
          {' to '}
          <CustomSpan
            content={valueOfActivity}
            fontWeight={600}
            endSpace={false}
          />
        </>
      );
    }
    if (typeOfActivity === 'changed') {
      renameCard = (
        <>
          <CustomSpan
            content={user.firstName}
            fontWeight={800}
            textDecoration='none'
          />{' '}
          {typeOfActivity}
          {' the description of card '}
          <CustomSpan content={source} fontWeight={600} endSpace={false} />
        </>
      );
    }
    if (typeOfActivity === 'added') {
      createCard = (
        <>
          <CustomSpan
            content={user.firstName}
            fontWeight={800}
            textDecoration='none'
          />
          {propertyChanged === 'description'
            ? ' created a description for card '
            : ' created the card '}
          {propertyChanged === 'description' ? (
            <CustomSpan content={source} />
          ) : (
            <CustomSpan
              content={valueOfActivity}
              fontWeight={600}
              endSpace={false}
            />
          )}
          {propertyChanged !== 'description' && (
            <>
              {' in list '}
              <CustomSpan content={destination} />
            </>
          )}
        </>
      );
    }
    if (typeOfActivity === 'moved') {
      movedCard = (
        <>
          <CustomSpan
            content={user.firstName}
            fontWeight={800}
            textDecoration='none'
          />
          {' moved card '}
          <CustomSpan content={valueOfActivity} />
          {' to list '}
          <CustomSpan content={destination} />
        </>
      );
    }
    if (typeOfActivity === 'copied') {
      copiedCard = (
        <>
          <CustomSpan
            content={user.firstName}
            fontWeight={800}
            textDecoration='none'
          />
          {' copied the card '}
          <CustomSpan content={valueOfActivity} />
          {' from list '}
          <CustomSpan content={source} />
          {' to list '}
          <CustomSpan content={destination} />
        </>
      );
    }
    if (typeOfActivity === 'deleted') {
      deletedCard = (
        <>
          <CustomSpan
            content={user.firstName}
            fontWeight={800}
            textDecoration='none'
          />
          {' deleted the card '}
          <CustomSpan content={valueOfActivity} />
        </>
      );
    }
  }

  return (
    <Typography component={'div'} sx={{ ...typographyStyles }}>
      {renameBoard && renameBoard}
      {createBoard && createBoard}
      {changedBoard && changedBoard}
      {renameList && renameList}
      {createList && createList}
      {changedList && changedList}
      {movedList && movedList}
      {copiedList && copiedList}
      {deletedList && deletedList}
      {renameCard && renameCard}
      {createCard && createCard}
      {changedCard && changedCard}
      {movedCard && movedCard}
      {copiedCard && copiedCard}
      {deletedCard && deletedCard}
      <DateFormatter createdAt={createdAt} />
    </Typography>
  );
};

export default ActivityInformationParse;
