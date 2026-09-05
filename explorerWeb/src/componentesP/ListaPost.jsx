import React from 'react';
import Post from './Post';

export default function ListaPost({
  data,
  favoriteIds,
  onToggleFavorite,
  emptyMessage = 'No encontramos resultados.',
}) {
  if (!data.length) {
    return (
      <div style={styles.emptyContainer}>
        <p style={styles.emptyText}>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div style={styles.listContent}>
      {data.map((item) => (
        <Post
          key={item.id}
          item={item}
          isFavorite={favoriteIds.includes(item.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

const styles = {
  listContent: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 24,
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
};
