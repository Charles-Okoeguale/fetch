import React, { useState, useEffect } from 'react';
import { Box, Container, Button, Typography, Pagination, CircularProgress, SelectChangeEvent, Dialog, DialogContent, DialogTitle,  } from '@mui/material';
import { User, Dog, SearchFilters, SavedSearch, Match } from '../types';
import DogCardGrid from '../components/dogCard';
import MatchCard from '../components/matchCard';
import SearchFilter from '../components/searchFilter';
import ErrorSnackbar from '../components/snackbarError';
import { useSearchDogs } from '../hooks/useSearchDogs';
import useFetchBreeds from '../hooks/useFetchBreeds';
import { useGenerateMatch } from '../hooks/useGeneralMatch';


interface SearchPageProps {
  user: User;
  onSaveSearch: (search: SavedSearch) => void;
  onSaveMatch: (match: Match) => void;
}

const SearchPage: React.FC<SearchPageProps> = ({ user, onSaveSearch, onSaveMatch }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    breed: '',
    ageMin: 0,
    ageMax: 20,
    zipCode: '',
  });
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [match, setMatch] = useState<Dog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: breeds = [], isLoading: breedsLoading, error: breedsError } = useFetchBreeds();
  const { data: searchData, isLoading: searchLoading, refetch } = useSearchDogs({ filters, sortOrder, page });



  useEffect(() => {
    const storedFavorites = getFavoriteIds();
    setFavorites(storedFavorites);
    refetch();
  }, [filters, sortOrder, page, refetch]);

  const getFavoriteIds = (): string[] => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
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

  const handleSaveSearch = () => {
    const savedSearch: SavedSearch = {
      id: Date.now().toString(),
      ...filters,
      name: ''
    };
    onSaveSearch(savedSearch);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { mutate: generateMatch } = useGenerateMatch(
    (dogMatch) => {
      setMatch(dogMatch)
    },
    setMatch 
  );

  const handleGenerateMatch = async () => {
    await generateMatch(favorites);
    setIsModalOpen(true)
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontFamily: 'Kanit' }}>
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
        {searchLoading || breedsLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <DogCardGrid
            dogs={(searchData as { dogsData: any[] }).dogsData || []}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination count={(searchData as { totalPages: number })?.totalPages || 1} page={page} onChange={handlePageChange} />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button
            onClick={handleGenerateMatch}
            sx={{ textTransform: 'none', fontFamily: 'Kanit' }}
            variant="contained"
            disabled={favorites.length === 0}
          >
            Generate Match
          </Button>
        </Box>
        <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogContent>
          {match ? (
            <>
              <MatchCard match={match} />
            </>
          ) : (
            <Typography>No match data available</Typography>
          )}
        </DialogContent>
      </Dialog>
      </Box>
      <ErrorSnackbar
        error={error}
        onClose={() => setError(null)}
      />
    </Container>
  );
};

export default SearchPage;
