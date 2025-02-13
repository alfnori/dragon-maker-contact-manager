import { Box, Divider, Grid2, Typography } from '@mui/material';
import React from 'react';

export const ContactAdd: React.FC = () => {
  return (
    <Grid2 container spacing={2}>
      <Grid2>
        <Typography variant="h4" sx={{ my: 2 }}>
          Add Contact
        </Typography>
        <Box>Form here!</Box>
        <Divider />
      </Grid2>
    </Grid2>
  );
};
