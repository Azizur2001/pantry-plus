import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import './RecipeSuggestionsPage.css';

const RecipeSuggestionsPage = () => {
  const location = useLocation();
  const { items } = location.state || { items: [] };
  const [suggestions, setSuggestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const recipesPerPage = 3;

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  useEffect(() => {
    const getSuggestions = async () => {
      try {
        if (!Array.isArray(items) || items.length === 0) {
          console.warn('No items available for recipe suggestions.');
          return;
        }

        const ingredients = items.join(',');

        const APP_ID = '33aa3478';
        const APP_KEY = 'db611df34c3ec88e67c1212dca7c9c1a';

        const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${ingredients}&app_id=${APP_ID}&app_key=${APP_KEY}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.hits && data.hits.length > 0) {
          setSuggestions(data.hits);
        } else {
          console.error('No recipes found or invalid API response:', data);
        }
      } catch (error) {
        console.error('Error fetching recipe suggestions:', error);
      }
    };

    if (items.length > 0) {
      getSuggestions();
    }
  }, [items]);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = suggestions.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="recipe-suggestions-page">
      <nav className="navbar">
        <div className="navbar-container">
          <a href="#" className="navbar-logo" onClick={() => navigate('/login')}>Pantry TrackerPlus</a>
          <div className="navbar-links">
            <Link to="/about">About</Link>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
      <div className="content">
        <h2>Recipe Suggestions</h2>
        {currentRecipes.length > 0 ? (
          <div className="recipe-suggestions-container">
            {currentRecipes.map((suggestion, index) => (
              <div key={index} className="recipe-card">
                <h3>{suggestion.recipe.label}</h3>
                <p><strong>Ingredients:</strong> {suggestion.recipe.ingredientLines.join(', ')}</p>
                <p><strong>Instructions:</strong> <a href={suggestion.recipe.url} target="_blank" rel="noopener noreferrer">View Full Recipe</a></p>
              </div>
            ))}
          </div>
        ) : (
          <p>No recipe suggestions available.</p>
        )}
        <div className="pagination">
          {Array.from({ length: Math.ceil(suggestions.length / recipesPerPage) }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeSuggestionsPage;
