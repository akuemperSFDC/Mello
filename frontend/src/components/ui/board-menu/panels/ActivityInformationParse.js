import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, alpha, Typography } from '@mui/material';
import DateFormatter from './DateFormatter';

const typographyStyles = {
  fontSize: '14px',
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
  const { currentBoard } = useSelector(
    (state) => state.boards.currentBoard && state.boards
  );

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

  return (
    <Typography sx={{ ...typographyStyles }}>
      {renameBoard && renameBoard}
      {createBoard && createBoard}
      {changedBoard && changedBoard}
      {renameList && renameList}
      {createList && createList}
      {changedList && changedList}
      {movedList && movedList}
      {copiedList && copiedList}
      {deletedList && deletedList}
      <DateFormatter createdAt={createdAt} />
    </Typography>
  );
};

export default ActivityInformationParse;
