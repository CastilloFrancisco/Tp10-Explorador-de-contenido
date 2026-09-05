import React, { useState } from 'react';

export default function Post({ item, isFavorite, onToggleFavorite }) {
  const [pressed, setPressed] = useState(false);

  return (
    <div style={styles.card}>
      {item.image ? (
        <img src={item.image} alt={item.name} style={styles.image} />
      ) : (
        <div style={styles.imagePlaceholder}>
          <span style={styles.imagePlaceholderText}>🍽️</span>
        </div>
      )}

      <div style={styles.content}>
        <h2 style={styles.title}>{item.name}</h2>

        <div style={styles.metaContainer}>
          {item.category ? <span style={styles.meta}>#{item.category}</span> : null}
          {item.area ? <span style={styles.meta}>📍 {item.area}</span> : null}
        </div>

        <button
          type="button"
          onClick={() => onToggleFavorite(item.id)}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          onMouseLeave={() => setPressed(false)}
          style={{
            ...styles.favoriteButton,
            ...(isFavorite ? styles.favoriteButtonActive : {}),
            ...(pressed ? styles.favoriteButtonPressed : {}),
          }}
        >
          {isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    width: 'min(100%, 860px)',
    margin: '0 auto 14px',
    border: '1px solid #f0ebea',
    boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
  },
  image: {
    width: '100%',
    height: 500,
    objectFit: 'cover',
    display: 'block',
  },
  imagePlaceholder: {
    width: '100%',
    height: 500,
    backgroundColor: '#f0ebe8',
    display: 'flex',
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
    margin: 0,
    fontSize: 20,
    fontWeight: 700,
    color: '#1b1b1b',
    marginBottom: 10,
  },
  metaContainer: {
    display: 'flex',
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
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
  },
  favoriteButton: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: '#f3f0ee',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 9,
    paddingBottom: 9,
    border: '1px solid #eadfdb',
    cursor: 'pointer',
    color: '#1d1d1d',
    fontSize: 12,
    fontWeight: 700,
  },
  favoriteButtonActive: {
    backgroundColor: '#ffe5ea',
    borderColor: '#f1bcc6',
  },
  favoriteButtonPressed: {
    opacity: 0.82,
  },
};
