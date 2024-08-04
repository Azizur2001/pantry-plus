import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeSuggestions.css'; 

const RecipeSuggestions = ({ items }) => {
  const navigate = useNavigate();

  const handleGetSuggestions = () => {
    navigate('/recipe-suggestions', { state: { items } });
  };

  return (
    <div>
      <button onClick={handleGetSuggestions}>Get Recipe Suggestions</button>
    </div>
  );
};

export default RecipeSuggestions;
