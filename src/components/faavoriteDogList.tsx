import React, { useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Pagination, CardActions, Button } from '@mui/material';

interface FavoriteDogsListProps {
  favorites: { id: string; name: string; breed: string; age: number; zip_code: string; img: string }[];
  handleDeleteFavorite: (id: string) => void;
}

const FavoriteDogsList: React.FC<FavoriteDogsListProps> = ({ favorites, handleDeleteFavorite }) => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(favorites.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFavorites = favorites.slice(startIndex, endIndex);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Grid container spacing={2}>
        {currentFavorites.map((dog) => (
          <Grid item xs={12} sm={6} md={4} key={dog.id}>
            <Card sx={{ background: '#F7F7F7', boxShadow: 'none' }}>
              <CardMedia
                component="img"
                height="300"
                image={dog.img}
                alt={dog.name}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontFamily: 'Kanit' }}>{dog.name}</Typography>
                <Typography sx={{ fontFamily: 'Kanit' }}>Breed: {dog.breed}</Typography>
                <Typography sx={{ fontFamily: 'Kanit' }}>Age: {dog.age}</Typography>
                <Typography sx={{ fontFamily: 'Kanit' }}>Zip Code: {dog.zip_code}</Typography>
              </CardContent>
              <CardActions>
              <Button
                size="small"
                onClick={() => handleDeleteFavorite(dog.id)}
                sx={{fontWeight: 900, textTransform: 'none', fontFamily: 'Kanit', fontSize: '1.1em'}}
                color='warning'
              >
                {'Remove from favorite'}
              </Button>
            </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
      />
    </>
  );
};

export default FavoriteDogsList;
