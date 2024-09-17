import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Button, SelectChangeEvent } from '@mui/material';

interface Filters {
  breed: string;
  ageMin: number;
  ageMax: number;
  zipCode: string;
}

interface SearchFiltersProps {
  filters: Filters;
  breeds: string[];
  sortOrder: 'asc' | 'desc';
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => void;
  handleSortOrderChange: () => void;
  handleSaveSearch: () => void;
}

const SearchFilter: React.FC<SearchFiltersProps> = ({
  filters,
  breeds,
  sortOrder,
  handleFilterChange,
  handleSortOrderChange,
  handleSaveSearch
}) => {
  return (
    <Box sx={{ mb: 5 }}>
      <FormControl sx={{ minWidth: 120, mr: 2 }}>
        <InputLabel id="breed-select-label">Breed</InputLabel>
        <Select
          labelId="breed-select-label"
          value={filters.breed}
          onChange={(event: SelectChangeEvent<string>) => handleFilterChange(event)}
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
      <Button onClick={handleSaveSearch} variant="contained" sx={{textTransform: 'none'}}>
        Save Search
      </Button>
    </Box>
  );
};

export default SearchFilter;
