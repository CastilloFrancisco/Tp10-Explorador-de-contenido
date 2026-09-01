import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Post, { MealItem } from './post';

type ListaPostProps = {
  data: MealItem[];
  favoriteIds: Array<string | number>;
  onToggleFavorite: (id: string | number) => void;
  emptyMessage?: string;
};

export default function ListaPost({
  data,
  favoriteIds,
  onToggleFavorite,
  emptyMessage = 'No encontramos resultados.',
}: ListaPostProps) {
  if (!data.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <Post
          item={item}
          isFavorite={favoriteIds.includes(item.id)}
          onToggleFavorite={onToggleFavorite}
        />
      )}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
});
