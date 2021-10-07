import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getBoardsAsync } from '../features/boards/boardSlice.js';

const RegisterScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoardsAsync());
  }, [dispatch]);

  return <div></div>;
};

export default RegisterScreen;
