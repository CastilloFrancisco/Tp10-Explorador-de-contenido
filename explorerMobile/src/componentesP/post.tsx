import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export type MealItem = {
  id: string | number;
  name: string;
  image?: string;
  category?: string;
  area?: string;
};

type PostProps = {
  item: MealItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string | number) => void;
};

export default function Post({ item, isFavorite, onToggleFavorite }: PostProps) {
  return (
    <View style={styles.card}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>🍽️</Text>
        </View>
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{item.name}</Text>

        <View style={styles.metaContainer}>
          {item.category ? <Text style={styles.meta}>#{item.category}</Text> : null}
          {item.area ? <Text style={styles.meta}>📍 {item.area}</Text> : null}
        </View>

        <Pressable
          onPress={() => onToggleFavorite(item.id)}
          style={({ pressed }) => [
            styles.favoriteButton,
            isFavorite && styles.favoriteButtonActive,
            pressed && styles.favoriteButtonPressed,
          ]}
        >
          <Text style={styles.favoriteText}>{isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#f0ebea',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
  },
  imagePlaceholder: {
    width: '100%',
    height: 180,
    backgroundColor: '#f0ebe8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePlaceholderText: {
    fontSize: 44,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1b1b1b',
    marginBottom: 10,
  },
  metaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  meta: {
    fontSize: 12,
    color: '#5d5d5d',
    backgroundColor: '#f5f3f2',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  favoriteButton: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: '#f3f0ee',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: '#eadfdb',
  },
  favoriteButtonActive: {
    backgroundColor: '#ffe5ea',
    borderColor: '#f1bcc6',
  },
  favoriteButtonPressed: {
    opacity: 0.82,
  },
  favoriteText: {
    color: '#1d1d1d',
    fontSize: 12,
    fontWeight: '700',
  },
});
