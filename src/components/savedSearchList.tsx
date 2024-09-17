import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { SavedSearch } from '../types';

interface SavedSearchListProps {
  savedSearches: SavedSearch[];
  handleViewSavedSearch: (search: SavedSearch) => void;
  handleDeleteSavedSearch: (id: string) => void;
}

const SavedSearchList: React.FC<SavedSearchListProps> = ({
  savedSearches,
  handleViewSavedSearch,
  handleDeleteSavedSearch
}) => {
  return (
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
  );
};

export default SavedSearchList;
