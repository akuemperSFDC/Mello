import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, alpha, Box, Typography } from '@mui/material';
import ActivityInformationParse from './ActivityInformationParse';

const ActivityInformation = (
  props,
  {
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
  }
) => {
  const dispatch = useDispatch();

  return (
    <Box ml={2} display='flex'>
      <ActivityInformationParse {...props} />
    </Box>
  );
};

export default ActivityInformation;
