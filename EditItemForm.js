import React, { useState } from 'react';
import { TextField, Button, Box, Container, Paper, Typography } from '@mui/material';

const EditItemForm = ({ id, item, quantity, expiration, onSave }) => {
  const [updatedItem, setUpdatedItem] = useState(item);
  const [updatedQuantity, setUpdatedQuantity] = useState(quantity);
  const [updatedExpiration, setUpdatedExpiration] = useState(expiration);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id, item: updatedItem, quantity: updatedQuantity, expiration: updatedExpiration });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 2, marginTop: 3 }}>
        <Typography variant="h6" component="h1" gutterBottom>
          Edit Item
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Item"
            value={updatedItem}
            onChange={(e) => setUpdatedItem(e.target.value)}
          />
          <TextField
            label="Quantity"
            value={updatedQuantity}
            onChange={(e) => setUpdatedQuantity(e.target.value)}
          />
          <TextField
            label="Expiration Date"
            type="date"
            value={updatedExpiration}
            onChange={(e) => setUpdatedExpiration(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default EditItemForm;
