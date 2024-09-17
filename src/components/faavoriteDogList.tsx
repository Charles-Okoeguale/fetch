import React, { useEffect, useRef } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, Skeleton } from '@mui/material';

interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  zip_code: string;
  img: string;
}

interface FavoriteDogsListProps {
  currentFavorites: Dog[];
  handleDeleteFavorite: (dogId: string) => void;
  isLoading: boolean;  
  loadMore: () => void; 
}

const FavoriteDogsList: React.FC<FavoriteDogsListProps> = ({ currentFavorites, handleDeleteFavorite, isLoading, loadMore }) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [isLoading, loadMore]);

  return (
    <Grid container spacing={2}>
      {isLoading && currentFavorites.length === 0 ? (
        Array.from(new Array(6)).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ background: '#F7F7F7', boxShadow: 'none' }}>
              <Skeleton variant="rectangular" height={300} />
              <CardContent>
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="40%" />
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        currentFavorites.map((dog) => (
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
                  sx={{ fontWeight: 900, textTransform: 'none', fontFamily: 'Kanit', fontSize: '1.1em' }}
                  color="warning"
                >
                  {'Remove from favorite'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))
      )}
      <div ref={observerRef} style={{ height: '20px', width: '100%' }} />
    </Grid>
  );
};

export default FavoriteDogsList;
