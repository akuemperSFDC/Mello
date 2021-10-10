import React, { useState, useEffect } from 'react';
import { Accordion, Typography } from '@mui/material';

const CreateNewListButton = () => {
  return (
    <Accordion>
      <Typography>+ Add another list</Typography>
    </Accordion>
  );
};

export default CreateNewListButton;
