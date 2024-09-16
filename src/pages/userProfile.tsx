import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { User, SavedSearch, Dog } from '../types';

interface UserProfileProps {
  user: User;
  onUpdateUser: (updatedUser: User) => void;
  onError: (message: string) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onUpdateUser, onError }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [favorites, setFavorites] = useState<Dog[]>([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isViewingSavedSearch, setIsViewingSavedSearch] = useState(false);
  const [selectedSavedSearch, setSelectedSavedSearch] = useState<SavedSearch | null>(null);

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

  const handleUpdateProfile = () => {
    const updatedUser = { ...user, name, email };
    onUpdateUser(updatedUser);
    setIsEditingProfile(false);
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

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Profile
        </Typography>
        <Card sx={{ mb: 4 }}>
          <CardContent>
            {isEditingProfile ? (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
              </Grid>
            ) : (
              <>
                <Typography variant="h6">Name: {user.name}</Typography>
                <Typography variant="body1">Email: {user.email}</Typography>
              </>
            )}
          </CardContent>
          <CardActions>
            {isEditingProfile ? (
              <Button onClick={handleUpdateProfile} variant="contained" color="primary">
                Save Changes
              </Button>
            ) : (
              <Button onClick={() => setIsEditingProfile(true)} variant="outlined">
                Edit Profile
              </Button>
            )}
          </CardActions>
        </Card>

        <Typography variant="h5" gutterBottom>
          Saved Searches
        </Typography>
        <List>
          {savedSearches.map((search) => (
            <ListItem key={search.id}>
              <ListItemText 
                primary={`${search.breed || 'All breeds'} - Age: ${search.ageMin}-${search.ageMax}, Zip: ${search.zipCode}`} 
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="view" onClick={() => handleViewSavedSearch(search)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteSavedSearch(search.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Favorite Dogs
        </Typography>
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
      </Box>

      <Dialog open={isViewingSavedSearch} onClose={() => setIsViewingSavedSearch(false)}>
        <DialogTitle>Saved Search Details</DialogTitle>
        <DialogContent>
          {selectedSavedSearch && (
            <>
              <Typography>Breed: {selectedSavedSearch.breed || 'All breeds'}</Typography>
              <Typography>Min Age: {selectedSavedSearch.ageMin}</Typography>
              <Typography>Max Age: {selectedSavedSearch.ageMax}</Typography>
              <Typography>Zip Code: {selectedSavedSearch.zipCode}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsViewingSavedSearch(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserProfile;