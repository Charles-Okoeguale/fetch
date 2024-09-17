import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material';
import { SavedSearch } from '../types'; 


interface SavedSearchDialogProps {
    isOpen: boolean;
    onClose: () => void;
    selectedSavedSearch: SavedSearch | null;
  }
  

const SavedSearchDialog: React.FC<SavedSearchDialogProps> = ({ isOpen, onClose, selectedSavedSearch }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Saved Search Details</DialogTitle>
      <DialogContent>
        {selectedSavedSearch ? (
          <>
            <Typography>Breed: {selectedSavedSearch.breed || 'All breeds'}</Typography>
            <Typography>Min Age: {selectedSavedSearch.ageMin}</Typography>
            <Typography>Max Age: {selectedSavedSearch.ageMax}</Typography>
            <Typography>Zip Code: {selectedSavedSearch.zipCode}</Typography>
          </>
        ) : (
          <Typography>No details available</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SavedSearchDialog;
