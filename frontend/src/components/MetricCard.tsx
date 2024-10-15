import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface MetricCardProps {
  title: string;
  value: string | number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value }) => {
  return (
    <Card className="card" variant="outlined">
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
      </CardContent>
    </Card>
  );
};

export default MetricCard;