import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from './firebase';
import AddItemForm from './components/AddItemForm';
import ItemList from './components/ItemList';
import Signup from './components/Signup';
import Login from './components/Login';
import About from './components/About';  // Import the About component
import RecipeSuggestionsPage from './components/RecipeSuggestionsPage'; // Import the RecipeSuggestionsPage component
import { Container, Grid, Button, Typography, Box } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import './App.css';
import './styles.css';
import './components/theme.css'; // Import the new CSS file

function App() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const fetchItems = async () => {
    if (user) {
      const userUid = user.uid;
      const userPantryCollection = collection(db, `users/${userUid}/pantryItems`);
      const querySnapshot = await getDocs(userPantryCollection);
      const itemList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setItems(itemList);
      setFilteredItems(itemList);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [user]);

  const handleAddItem = (item) => {
    setItems(prevItems => [...prevItems, item]);
    setFilteredItems(prevItems => [...prevItems, item]);
  };

  const handleUpdateItem = (updatedItem) => {
    setItems(prevItems => prevItems.map(item => item.id === updatedItem.id ? updatedItem : item));
    setFilteredItems(prevItems => prevItems.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const handleDeleteItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    setFilteredItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const handleSearch = (searchTerm) => {
    setFilteredItems(items.filter(item => item.item.toLowerCase().includes(searchTerm.toLowerCase())));
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <>
      <Box sx={{ textAlign: 'center', mt: 4}}>
        
      </Box>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} /> {/* Add the About route */}
        <Route path="/recipe-suggestions" element={<RecipeSuggestionsPage />} /> {/* Add the RecipeSuggestionsPage route */}
        <Route path="/recipes" element={<RecipeSuggestionsPage />} />
        <Route path="/tracker" element={
          <Container maxWidth="lg" sx={{ marginTop: 4 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <AddItemForm onAdd={handleAddItem} onUpdate={handleUpdateItem} />
              </Grid>
              <Grid item xs={12} md={6}>
                <ItemList
                  items={filteredItems}
                  onDelete={handleDeleteItem}
                  onEdit={handleUpdateItem}
                  onSearch={handleSearch}
                />
              </Grid>
              {user && (
                <Button color="inherit" onClick={handleLogout} sx={{ position: 'absolute', top: 16, right: 16 }}>
                  Logout
                </Button>
              )}
            </Grid>
          </Container>
        } />
      </Routes>
    </>
  );
}

export default App;
