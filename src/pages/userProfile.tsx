import React, { useEffect, useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import ProfileCard from '../components/profileCard';
import SavedSearchList from '../components/savedSearchList';
import FavoriteDogsList from '../components/faavoriteDogList';
import SavedSearchDialog from '../components/savedSearchDialog';
import { Dog, SavedSearch, UserProfileProps } from '../types';


const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdateUser, onError }) => {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [favorites, setFavorites] = useState<Dog[]>([]);
  const [isViewingSavedSearch, setIsViewingSavedSearch] = useState(false);
  const [selectedSavedSearch, setSelectedSavedSearch] = useState<SavedSearch | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadSavedSearches();
    loadFavorites();
  }, []);

  const loadSavedSearches = () => {
    const saved = localStorage.getItem('savedSearches');
    if (saved) {
      setSavedSearches(JSON.parse(saved));
    }
  };

  const loadFavorites = async () => {
    try {
      const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (favoriteIds.length > 0) {
        const response = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(favoriteIds),
          credentials: 'include',
        });
        if (response.ok) {
          const favoriteDogs = await response.json();
          setFavorites(favoriteDogs);
        } else {
          throw new Error('Failed to fetch favorite dogs');
        }
      }
    } catch (error) {
      onError('Error loading favorites: ' + (error instanceof Error ? error.message : String(error)));
    }
  };

  const handleDeleteSavedSearch = (id: string) => {
    const updatedSearches = savedSearches.filter(search => search.id !== id);
    setSavedSearches(updatedSearches);
    localStorage.setItem('savedSearches', JSON.stringify(updatedSearches));
  };

  const handleDeleteFavorite = (id: string) => {
    const updatedFavorites = favorites.filter(dog => dog.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites.map(dog => dog.id)));
  };

  const handleViewSavedSearch = (search: SavedSearch) => {
    setSelectedSavedSearch(search);
    setIsViewingSavedSearch(true);
  };

  const loadMore = () => {
    setIsLoading(true);
    // Simulate API call
    fetch(`/api/favorites?page=${page}&limit=10`)
      .then((response) => response.json())
      .then((newDogs) => {
        setFavorites((prev) => [...prev, ...newDogs]);
        setPage((prevPage) => prevPage + 1);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadMore();
  }, []);

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
        <FavoriteDogsList
          favorites={favorites}
          handleDeleteFavorite={handleDeleteFavorite}
        />
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
