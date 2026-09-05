import { useEffect, useState } from 'react';
import './App.css';
import HomePage from './app/index.jsx';
import FavouritesPage from './app/favourites.jsx';


const FAVORITES_KEY = 'favoriteMeals';

function readFavorites() {
  try {
    const stored = window.localStorage.getItem(FAVORITES_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [favorites, setFavorites] = useState(readFavorites);

  useEffect(() => {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const navigate = (nextPath) => {
    window.history.pushState({}, '', nextPath);
    setPath(nextPath);
  };

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const toggleFavorite = (meal) => {
    setFavorites((current) => {
      const exists = current.some((favorite) => String(favorite.id) === String(meal.id));
      return exists
        ? current.filter((favorite) => String(favorite.id) !== String(meal.id))
        : [...current, meal];
    });
  };

  const removeFavorite = (mealId) => {
    setFavorites((current) =>
      current.filter((favorite) => String(favorite.id) !== String(mealId)),
    );
  };

  if (path === '/favourites') {
    return <FavouritesPage favorites={favorites} onRemoveFavorite={removeFavorite} onNavigate={navigate} />;
  }

  return (
    <HomePage
      favorites={favorites}
      onToggleFavorite={toggleFavorite}
      onNavigate={navigate}
    />
  );
}

export default App;
