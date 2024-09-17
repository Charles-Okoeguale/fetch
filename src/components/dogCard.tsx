import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';

interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  zip_code: string;
  img: string;
}

interface DogCardGridProps {
  dogs: Dog[];
  favorites: string[];
  toggleFavorite: (dogId: string) => void;
}

const DogCardGrid: React.FC<DogCardGridProps> = ({ dogs, favorites, toggleFavorite }) => {
  return (
    <Grid container spacing={2}>
      {dogs.map((dog) => (
        <Grid item xs={12} sm={6} md={4} key={dog.id}>
          <Card sx={{ background: 'pink' }}>
            <CardMedia
              component="img"
              height="140"
              image={dog.img}
              alt={dog.name}
            />
            <CardContent>
              <Typography variant="h6">{dog.name}</Typography>
              <Typography>Breed: {dog.breed}</Typography>
              <Typography>Age: {dog.age}</Typography>
              <Typography>Zip Code: {dog.zip_code}</Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => toggleFavorite(dog.id)}
                color={favorites.includes(dog.id) ? 'secondary' : 'primary'}
              >
                {favorites.includes(dog.id) ? 'Unfavorite' : 'Favorite'}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DogCardGrid;
