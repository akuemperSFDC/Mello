import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, alpha, Box, Typography } from '@mui/material';

const AboutPanel = ({ value, index }) => {
  const dispatch = useDispatch();

  return <Box sx={{ width: '530px', mx: 'auto', height: '100%' }}>About</Box>;
};

export default AboutPanel;
