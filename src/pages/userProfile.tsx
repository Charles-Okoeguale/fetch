import React, { useEffect, useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import ProfileCard from '../components/profileCard';
import SavedSearchList from '../components/savedSearchList';
import FavoriteDogsList from '../components/faavoriteDogList';
import SavedSearchDialog from '../components/savedSearchDialog';
import { SavedSearch, UserProfileProps } from '../types';
import { useFavorites } from '../hooks/useFavorites';
import { useQueryClient } from '@tanstack/react-query';

const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdateUser, onError }) => {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [isViewingSavedSearch, setIsViewingSavedSearch] = useState(false);
  const [selectedSavedSearch, setSelectedSavedSearch] = useState<SavedSearch | null>(null);
  const queryClient = useQueryClient();

  const { data: favorites = [], isLoading, error } = useFavorites();

  useEffect(() => {
    loadSavedSearches();
  }, []);

  useEffect(() => {
    if (error) {
      onError('Error loading favorites: ' + (error instanceof Error ? error.message : String(error)));
    }
  }, [error, onError]);

  const loadSavedSearches = () => {
    const saved = localStorage.getItem('savedSearches');
    if (saved) {
      setSavedSearches(JSON.parse(saved));
    }
  };

  const handleDeleteSavedSearch = (id: string) => {
    const updatedSearches = savedSearches.filter(search => search.id !== id);
    setSavedSearches(updatedSearches);
    localStorage.setItem('savedSearches', JSON.stringify(updatedSearches));
  };

  const handleDeleteFavorite = (id: string) => {
    const updatedFavorites = favorites.filter((dog: { id: string; }) => dog.id !== id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites.map((dog: { id: string; }) => dog.id)));
    queryClient.invalidateQueries({ queryKey: ['favorites'] });
  };

  const handleViewSavedSearch = (search: SavedSearch) => {
    setSelectedSavedSearch(search);
    setIsViewingSavedSearch(true);
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontFamily: 'Kanit' }}>
          User Profile
        </Typography>
        <ProfileCard
          user={user}
          onUpdateProfile={onUpdateUser}
        />

        <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Kanit', fontWeight: 700 }}>
          Saved Searches
        </Typography>
        <SavedSearchList
          savedSearches={savedSearches.map(search => ({ ...search, name: search.name || 'Default' }))}
          handleViewSavedSearch={(search) => handleViewSavedSearch(search as SavedSearch)}
          handleDeleteSavedSearch={handleDeleteSavedSearch}
        />

        <Typography variant="h5" gutterBottom sx={{ mt: 8, fontFamily: 'Kanit', fontWeight: 800 }}>
          Favorite Dogs
        </Typography>
        {isLoading ? (
          <Typography>Loading favorites...</Typography>
        ) : (
          <FavoriteDogsList
            favorites={favorites}
            handleDeleteFavorite={handleDeleteFavorite}
          />
        )}
      </Box>

      <SavedSearchDialog
        isOpen={isViewingSavedSearch}
        onClose={() => setIsViewingSavedSearch(false)}
        selectedSavedSearch={selectedSavedSearch}
      />
    </Container>
  );
};

export default UserProfile;