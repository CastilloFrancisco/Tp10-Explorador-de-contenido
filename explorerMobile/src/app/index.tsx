import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import CategoryToggle from '../componentesP/categoryToggle';
import Header from '../componentesP/header';
import ListaPost from '../componentesP/listaPost';
import SearchBar from '../componentesP/searchBar';
import { MealItem } from '../componentesP/post';

const FAVORITES_KEY = 'favoriteMeals';
const DEFAULT_QUERY = 'chicken';

type MealApiItem = {
  idMeal?: string;
  strMeal?: string;
  strMealThumb?: string;
  strCategory?: string;
  strArea?: string;
};

type MealApiResponse = {
  meals?: MealApiItem[] | null;
};

const normalizeMeal = (item: MealApiItem): MealItem => ({
  id: item.idMeal ?? Math.random().toString(),
  name: item.strMeal ?? 'Receta sin título',
  image: item.strMealThumb,
  category: item.strCategory,
  area: item.strArea,
});

export default function HomePage() {
  const [meals, setMeals] = useState<MealItem[]>([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState<MealItem[]>([]);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (!stored) {
        setFavorites([]);
        return;
      }

      const parsed = JSON.parse(stored) as MealItem[];
      setFavorites(Array.isArray(parsed) ? parsed : []);
    } catch (e) {
      setFavorites([]);
    }
  };

  const loadMeals = async (query: string) => {
    setLoading(true);
    setError('');

    try {
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query || DEFAULT_QUERY)}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Error en la petición');
      }

      const data: MealApiResponse = await response.json();
      const normalized = (data.meals ?? []).map(normalizeMeal);
      setMeals(normalized);
    } catch (e) {
      setMeals([]);
      setError('No fue posible obtener la información.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFavorites();
    loadMeals(DEFAULT_QUERY);
  }, []);

  useEffect(() => {
    if (!searchText.trim()) {
      loadMeals(DEFAULT_QUERY);
      return;
    }

    const timer = setTimeout(() => {
      loadMeals(searchText.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  const categories = useMemo(() => {
    const list = meals
      .map((meal) => meal.category)
      .filter((category): category is string => Boolean(category));

    return ['All', ...Array.from(new Set(list))];
  }, [meals]);

  const filteredMeals = useMemo(() => {
    const text = searchText.trim().toLowerCase();

    return meals.filter((meal) => {
      const matchesCategory = selectedCategory === 'All' || meal.category === selectedCategory;
      const matchesText =
        !text ||
        meal.name.toLowerCase().includes(text) ||
        (meal.area ?? '').toLowerCase().includes(text);

      return matchesCategory && matchesText;
    });
  }, [meals, selectedCategory, searchText]);

  const toggleFavorite = async (mealId: string | number) => {
    const mealToSave = meals.find((meal) => String(meal.id) === String(mealId));
    if (!mealToSave) {
      return;
    }

    const exists = favorites.some((meal) => String(meal.id) === String(mealId));

    const updated = exists
      ? favorites.filter((meal) => String(meal.id) !== String(mealId))
      : [...favorites, mealToSave];

    setFavorites(updated);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Explorador" subtitle="Recetas del mundo" />

      <View style={styles.content}>
        <SearchBar value={searchText} onChangeText={setSearchText} />

        {categories.length > 1 && (
          <CategoryToggle
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        )}

        {loading ? (
          <View style={styles.statusContainer}>
            <ActivityIndicator size="large" color="#1d5f3d" />
            <Text style={styles.statusText}>Cargando información...</Text>
          </View>
        ) : error ? (
          <View style={styles.statusContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : (
          <ListaPost
            data={filteredMeals}
            favoriteIds={favorites.map((favorite) => favorite.id)}
            onToggleFavorite={toggleFavorite}
            emptyMessage="No encontramos resultados."
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f3f1',
  },
  content: {
    flex: 1,
    paddingTop: 18,
  },
  statusContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
  },
  statusText: {
    marginTop: 12,
    fontSize: 16,
    color: '#3a3a3a',
  },
  errorText: {
    fontSize: 16,
    color: '#9d1d1d',
    textAlign: 'center',
    paddingHorizontal: 18,
  },
});
