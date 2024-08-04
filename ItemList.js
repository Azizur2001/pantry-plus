import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteDoc, doc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import SearchItems from './SearchItems';
import EditItemForm from './EditItemForm';
import { IconButton, Typography, Container, Box, Dialog, DialogTitle, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddItemForm from './AddItemForm';
import './ItemList.css';

const ItemList = ({ items, onDelete, onEdit, onSearch }) => {
  const [editItem, setEditItem] = useState(null);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const handleDelete = async (id) => {
    if (user) {
      const userUid = user.uid;
      await deleteDoc(doc(db, `users/${userUid}/pantryItems`, id));
      onDelete(id);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleSave = async (updatedItem) => {
    if (user) {
      const userUid = user.uid;
      const itemDocRef = doc(db, `users/${userUid}/pantryItems`, updatedItem.id);
      const updatedData = {
        item: updatedItem.item,
        quantity: updatedItem.quantity,
        expiration: updatedItem.expiration
      };

      if (updatedItem.image !== undefined) {
        updatedData.image = updatedItem.image;
      }

      await updateDoc(itemDocRef, updatedData);
      setEditItem(null);
      onEdit(updatedItem);
    }
  };

  const pantryItems = items.map(item => item.item);
  console.log('Pantry Items:', pantryItems); // Debugging log
  
  const handleRecipeSuggestions = () => {
    navigate('/recipes', { state: { items: pantryItems } });
  };
  

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <a href="#" className="navbar-logo" onClick={() => navigate('/login')}>Pantry TrackerPlus</a>
          <div className="navbar-links">
            <Link to="/about">About</Link>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
      <Container className="item-list-container">
        <Typography variant="h4" component="h1" gutterBottom className="item-list-title">
          Pantry Items
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <SearchItems onSearch={onSearch} />
        </Box>
        <Box sx={{ marginTop: 2, maxHeight: '400px', overflowY: 'auto' }}>
          <table className="item-list-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Expiration</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.item}</td>
                  <td>{item.quantity}</td>
                  <td>{item.expiration}</td>
                  <td className="item-list-actions">
                    <IconButton edge="end" onClick={() => handleEdit(item)} className="item-list-icon">
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDelete(item.id)} className="item-list-icon">
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
        <Button variant="contained" color="primary" onClick={handleRecipeSuggestions}>
          Get Recipe Suggestions
        </Button>
        <Dialog open={!!editItem} onClose={() => setEditItem(null)}>
          <DialogTitle>Edit Item</DialogTitle>
          {editItem && (
            <EditItemForm
              id={editItem.id}
              item={editItem.item}
              quantity={editItem.quantity}
              expiration={editItem.expiration}
              onSave={handleSave}
            />
          )}
        </Dialog>
      </Container>
    </>
  );
};

export default ItemList;
