import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Button, SelectChangeEvent, useMediaQuery, Grid } from '@mui/material';

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
  const isMobile = useMediaQuery('(max-width:600px)');
  return (
    <Box sx={{ mb: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
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
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <TextField
            label="Min Age"
            type="number"
            name="ageMin"
            value={filters.ageMin}
            onChange={handleFilterChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <TextField
            label="Max Age"
            type="number"
            name="ageMax"
            value={filters.ageMax}
            onChange={handleFilterChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Zip Code"
            name="zipCode"
            value={filters.zipCode}
            onChange={handleFilterChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <Button onClick={handleSortOrderChange} variant="outlined" fullWidth sx={{ fontFamily: 'Kanit', fontWeight: 900 }}>
            Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
          </Button>
        </Grid>

        <Grid item xs={6} sm={3} md={2}>
          <Button onClick={handleSaveSearch} variant="contained" fullWidth sx={{ textTransform: 'none', fontFamily: 'Kanit', fontWeight: 900, color: 'white' }}>
            Save Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SearchFilter;
