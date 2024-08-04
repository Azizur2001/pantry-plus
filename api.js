import axios from 'axios';

const APP_ID = '33aa3478';
const APP_KEY = 'db611df34c3ec88e67c1212dca7c9c1a	—'
;

export const fetchRecipes = async (ingredients) => {
  try {
    const response = await axios.get('https://api.edamam.com/search', {
      params: {
        q: ingredients.join(','),
        app_id: APP_ID,
        app_key: APP_KEY
      }
    });
    return response.data.hits;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return [];
  }
};
