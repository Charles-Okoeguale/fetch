import React from 'react';
import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material';

interface Match {
  name: string;
  breed: string;
  age: number;
  zip_code: string;
  img: string;
}

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h5">Your Match:</Typography>
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={match.img}
          alt={match.name}
        />
        <CardContent>
          <Typography variant="h6">{match.name}</Typography>
          <Typography>Breed: {match.breed}</Typography>
          <Typography>Age: {match.age}</Typography>
          <Typography>Zip Code: {match.zip_code}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MatchCard;
