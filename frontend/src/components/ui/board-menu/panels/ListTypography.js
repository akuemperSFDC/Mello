import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, alpha, Typography } from '@mui/material';
import DateFormatter from './DateFormatter';

const typographyStyles = {
  fontSize: '14px',
};

const CustomSpan = ({
  content,
  fontWeight,
  textDecoration = 'underline',
  beginningSpace = false,
  endSpace = true,
}) => {
  const dispatch = useDispatch();

  return (
    <span style={{ fontWeight, textDecoration }}>
      {beginningSpace ? ' ' : ''}
      {content}
      {endSpace ? ' ' : ''}
    </span>
  );
};

const ListTypography = ({
  user,
  documentType,
  typeOfActivity,
  valueOfActivity,
  previousPropertyValue,
  propertyChanged,
  source,
  destination,
  createdAt,
}) => {
  const dispatch = useDispatch();

  let renameList;
  let createList;
  let changedList;
  let movedList;
  let copiedList;

  if (documentType === 'list') {
    if (typeOfActivity === 'renamed') {
      renameList = (
        <Typography sx={{ ...typographyStyles }}>
          <CustomSpan
            content={user.firstName}
            fontWeight={800}
            textDecoration='none'
          />
          {typeOfActivity} this board{' '}
          <CustomSpan content={valueOfActivity} endSpace={false} /> (from
          <CustomSpan
            content={previousPropertyValue}
            beginningSpace={true}
            endSpace={false}
          />
          )
        </Typography>
      );
    }
    if (typeOfActivity === 'added') {
      createList = (
        <>
          <CustomSpan
            content={user.firstName}
            fontWeight={800}
            textDecoration='none'
          />
          created this board
        </>
      );
    }
    if (typeOfActivity === 'changed') {
      changedList = (
        <>
          <CustomSpan
            content={user.firstName}
            fontWeight={800}
            textDecoration='none'
          />
          created this board
        </>
      );
    }
  }

  return (
    <Typography sx={{ ...typographyStyles }}>
      {renameList}
      {createList}
      {changedList}
    </Typography>
  );
};

export default ListTypography;
