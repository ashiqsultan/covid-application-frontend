import { Card, Typography } from '@mui/material';
import React from 'react';

const InfoCard: React.FC<{
  number: number;
  description: string;
}> = ({ number, description }) => {
  return (
    <Card
      sx={{
        padding: '20px',
        textAlign: 'center',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        minHeight: '50px',
        minWidth: '180px',
      }}
    >
      <Typography
        variant='h2'
        sx={{
          fontSize: '1.75rem',
          fontWeight: 'bold',
          marginBottom: '10px',
        }}
      >
        {number}
      </Typography>
      <Typography
        variant='body1'
        sx={{
          fontSize: '1.2rem',
        }}
      >
        {description}
      </Typography>
    </Card>
  );
};

export default InfoCard;
