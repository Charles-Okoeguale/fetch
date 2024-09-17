
import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { SavedSearch } from '../types';
import { useStyles } from './styles/savedSearchList';

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

  const classes = useStyles()
  return (
    <List>
      {savedSearches.map((search) => (
        <ListItem key={search.id} className={classes.listItem}>
          <ListItemText 
            primary={
              <Box className={classes.listItemText}>
                <Typography variant="body2">
                  {search.breed || 'All breeds'}
                </Typography>
                <Typography variant="body2">
                  Age: {search.ageMin} - {search.ageMax}
                </Typography>
                <Typography variant="body2">
                  Zip code: {search.zipCode || 'N/A'}
                </Typography>
              </Box>
            }
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
