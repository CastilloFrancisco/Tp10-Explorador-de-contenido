import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import Header from '../componentesP/header';
import ListaPost from '../componentesP/listaPost';
import { MealItem } from '../componentesP/post';

const FAVORITES_KEY = 'favoriteMeals';

export default function FavouritesPage() {
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
    } catch (error) {
      setFavorites([]);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleToggleFavorite = async (mealId: string | number) => {
    const updated = favorites.filter((meal) => String(meal.id) !== String(mealId));
    setFavorites(updated);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Favoritos" subtitle="Tus recetas guardadas" />

      <View style={styles.content}>
        {favorites.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Todavía no guardaste recetas.</Text>
            <Text style={styles.emptyText}>Agregá tus favoritas desde la pantalla principal.</Text>
          </View>
        ) : (
          <ListaPost
            data={favorites}
            favoriteIds={favorites.map((meal) => meal.id)}
            onToggleFavorite={handleToggleFavorite}
            emptyMessage="No hay favoritos guardados."
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1f1f1f',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
