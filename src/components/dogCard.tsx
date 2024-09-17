import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Skeleton } from '@mui/material';

interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  zip_code: string;
  img: string;
}


interface SearchData {
  dogsData: Dog[];
}


interface DogCardGridProps {
  dogs: Dog[];
  favorites: string[];
  toggleFavorite: (dogId: string) => void;
}

interface Dog {
  id: string;
  img: string;
  name: string;
  breed: string;
  age: number;
  zip_code: string;
}

interface SearchData {
  dogsData: Dog[];
}

interface DogCardGridProps {
  dogs: Dog[];
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

const DogCardGrid: React.FC<DogCardGridProps> = ({ dogs, favorites, toggleFavorite }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <Grid container spacing={2}>
          {Array.from(new Array(12)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ background: '#F7F7F7', boxShadow: 'none' }}>
                <Skeleton variant="rectangular" width="100%" height={300} />
                <CardContent>
                  <Typography variant="h6">
                    <Skeleton />
                  </Typography>
                  <Typography>
                    <Skeleton />
                  </Typography>
                  <Typography>
                    <Skeleton />
                  </Typography>
                  <Typography>
                    <Skeleton />
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {dogs.map((dog) => (
            <Grid item xs={12} sm={6} md={4} key={dog.id}>
              <Card sx={{ background: '#F7F7F7', boxShadow: 'none' }}>
                <img src={dog.img} alt={dog.name} height="300" width="100%" />
                <CardContent>
                  <Typography variant="h6" sx={{ fontFamily: 'Kanit' }}>{dog.name}</Typography>
                  <Typography sx={{ fontFamily: 'Kanit' }}>Breed: {dog.breed}</Typography>
                  <Typography sx={{ fontFamily: 'Kanit' }}>Age: {dog.age}</Typography>
                  <Typography sx={{ fontFamily: 'Kanit' }}>Zip Code: {dog.zip_code}</Typography>
                </CardContent>
                <Button
                  size="small"
                  onClick={() => toggleFavorite(dog.id)}
                  sx={{
                    fontWeight: 900,
                    textTransform: 'none',
                    fontFamily: 'Kanit',
                    fontSize: '1.1em',
                    color: favorites.includes(dog.id) ? 'primary' : 'lightgrey',
                  }}
                >
                  {favorites.includes(dog.id) ? 'Favorite' : 'Favorite'}
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};


export default DogCardGrid;
