import React, { useState, useEffect } from 'react';
import { Box, Container, Button, Typography, Pagination, CircularProgress, SelectChangeEvent } from '@mui/material';
import { User, Dog, SearchFilters, SavedSearch, Match } from '../types';
import DogCardGrid from '../components/dogCard';
import MatchCard from '../components/matchCard';
import SearchFilter from '../components/searchFilter';
import ErrorSnackbar from '../components/snackbarError';

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

        if (filters.breed) queryParams.append('breeds[]', filters.breed);
        if (filters.ageMin) queryParams.append('ageMin', filters.ageMin.toString());
        if (filters.ageMax) queryParams.append('ageMax', filters.ageMax.toString());
        if (filters.zipCode) queryParams.append('zipCodes[]', filters.zipCode);
        queryParams.append('sort', `breed:${sortOrder}`);
        queryParams.append('size', '20');
        queryParams.append('from', ((page - 1) * 20).toString());

        const url = `https://frontend-take-home-service.fetch.com/dogs/search?${queryParams}`;

        const response = await fetch(url, {
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

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
        const { name, value } = event.target as HTMLInputElement & { name?: string; value: string };
    
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
        <Typography variant="h4" component="h1" gutterBottom sx={{mb: 4}}>
          Find Your Perfect Furry Friend
        </Typography>
        <SearchFilter
            filters={filters}
            breeds={breeds}
            sortOrder={sortOrder}
            handleFilterChange={handleFilterChange}
            handleSortOrderChange={handleSortOrderChange}
            handleSaveSearch={handleSaveSearch}
        />
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
            <DogCardGrid
                dogs={dogs}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
            />
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination count={totalPages} page={page} onChange={handlePageChange} />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button onClick={generateMatch} variant="contained" disabled={favorites.length === 0 || loading}>
            Generate Match
          </Button>
        </Box>
        {match && <MatchCard match={match} />}
      </Box>
      <ErrorSnackbar
        error={error}
        onClose={() => setError(null)}
      />
    </Container>
  );
};

export default SearchPage;


