import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const SearchItems = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    onSearch(search);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <TextField label="Search" value={search} onChange={handleChange} />
      <Button variant="contained" onClick={handleSearch}>Search</Button>
    </Box>
  );
};

export default SearchItems;
