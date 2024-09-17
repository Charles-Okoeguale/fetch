import React from 'react';
import { Grid, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import { Dog } from '../types'; 

interface FavoriteDogsListProps {
  favorites: Dog[];
  handleDeleteFavorite: (id: string) => void;
}

const FavoriteDogsList: React.FC<FavoriteDogsListProps> = ({ favorites, handleDeleteFavorite }) => {
  return (
    <Grid container spacing={2}>
      {favorites.map((dog) => (
        <Grid item xs={12} sm={6} md={4} key={dog.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{dog.name}</Typography>
              <Typography>Breed: {dog.breed}</Typography>
              <Typography>Age: {dog.age}</Typography>
              <Typography>Zip Code: {dog.zip_code}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleDeleteFavorite(dog.id)} color="secondary">
                Remove from Favorites
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FavoriteDogsList;
