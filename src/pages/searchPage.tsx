import React, { useState, useEffect, ChangeEvent } from 'react';
import { Box, Container, TextField, Button, Typography, Grid, Card, CardContent, CardActions, Pagination, Select, MenuItem, FormControl, InputLabel, CircularProgress, Snackbar, Alert, SelectChangeEvent, CardMedia } from '@mui/material';
import { User, Dog, SearchFilters, SavedSearch, Match } from '../types';

interface SearchPageProps {
  user: User;
  onSaveSearch: (search: SavedSearch) => void;
  onSaveMatch: (match: Match) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ user, onSaveSearch, onSaveMatch }) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [breeds, setBreeds] = useState<string[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({
    breed: '',
    ageMin: 0,
    ageMax: 20,
    zipCode: '',
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [match, setMatch] = useState<Dog | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBreeds();
    searchDogs();
    const storedFavorites = getFavoriteIds();
    setFavorites(storedFavorites);
  }, []);

  const getFavoriteIds = (): string[] => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  };

  const fetchBreeds = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setBreeds(data);
      } else {
        throw new Error('Failed to fetch breeds');
      }
    } catch (error) {
      setError('Error fetching breeds. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const searchDogs = async () => {
    try {
        setLoading(true);

        const queryParams = new URLSearchParams();
        if (filters.breed) queryParams.append('breed', filters.breed);
        if (filters.ageMin) queryParams.append('ageMin', filters.ageMin.toString());
        if (filters.ageMax) queryParams.append('ageMax', filters.ageMax.toString());
        if (filters.zipCode) queryParams.append('zipCodes', filters.zipCode);
        queryParams.append('sort', `breed:${sortOrder}`);
        queryParams.append('size', '20');
        queryParams.append('from', ((page - 1) * 20).toString());

      const response = await fetch(`https://frontend-take-home-service.fetch.com/dogs/search?${queryParams}`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        const dogIds = data.resultIds;
        const dogsResponse = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dogIds),
          credentials: 'include',
        });

        if (dogsResponse.ok) {
          const dogsData = await dogsResponse.json()
          setDogs(dogsData);
          setTotalPages(Math.ceil(data.total / 20));
        } else {
          throw new Error('Failed to fetch dog details');
        }
      } else {
        throw new Error('Failed to search dogs');
      }
    } catch (error) {
      setError('Error searching dogs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (event: SelectChangeEvent<string> | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    if (name === 'ageMin' && Number(value) < 0) {
        return;
    }
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setPage(1);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const toggleFavorite = (dogId: string) => {  
    setFavorites(prev => {
      const updatedFavorites = prev.includes(dogId)
        ? prev.filter(id => id !== dogId) 
        : [...prev, dogId];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const generateMatch = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(favorites),
        credentials: 'include',
      });

      if (response.ok) {
        const matchData = await response.json();
        const matchId = matchData.match;
        const dogsResponse = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify([matchId]),
            credentials: 'include',
          });
          if (dogsResponse.ok) {
          const dogsData = await dogsResponse.json()
          setMatch(dogsData[0]);
        } else {
          throw new Error('Failed to fetch dog details');
        }
        onSaveMatch({ id: Date.now().toString(), dog: matchData, timestamp: Date.now() });
      } else {
        throw new Error('Failed to generate match');
      }
    } catch (error) {
      setError('Error generating match. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSearch = () => {
    const savedSearch: SavedSearch = {
        id: Date.now().toString(),
        ...filters,
        sortOrder,
        name: ''
    };
    onSaveSearch(savedSearch);
  };

  useEffect(() => {
    searchDogs();
    
  }, [filters, sortOrder, page]);

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Find Your Perfect Furry Friend
        </Typography>
        <Box sx={{ mb: 2 }}>
          <FormControl sx={{ minWidth: 120, mr: 2 }}>
            <InputLabel id="breed-select-label">Breed</InputLabel>
            <Select
              labelId="breed-select-label"
              value={filters.breed}
              onChange={(e) => handleFilterChange(e)}
              name="breed"
              label="Breed"
            >
              <MenuItem value="">All breeds</MenuItem>
              {breeds.map((breed) => (
                <MenuItem key={breed} value={breed}>{breed}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Min Age"
            type="number"
            name="ageMin"
            value={filters.ageMin}
            onChange={handleFilterChange}
            sx={{ mr: 2 }}
          />
          <TextField
            label="Max Age"
            type="number"
            name="ageMax"
            value={filters.ageMax}
            onChange={handleFilterChange}
            sx={{ mr: 2 }}
          />
          <TextField
            label="Zip Code"
            name="zipCode"
            value={filters.zipCode}
            onChange={handleFilterChange}
            sx={{ mr: 2 }}
          />
          <Button onClick={handleSortOrderChange} variant="outlined" sx={{ mr: 2 }}>
            Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
          </Button>
          <Button onClick={handleSaveSearch} variant="contained">
            Save Search
          </Button>
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            {dogs.map((dog) => (
              <Grid item xs={12} sm={6} md={4} key={dog.id}>
                <Card>
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
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination count={totalPages} page={page} onChange={handlePageChange} />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button onClick={generateMatch} variant="contained" disabled={favorites.length === 0 || loading}>
            Generate Match
          </Button>
        </Box>
        {match && (
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
        )}
      </Box>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SearchPage;