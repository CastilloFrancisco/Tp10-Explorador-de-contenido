import React, { useState } from 'react';

export default function FavButton({ isFavorite, onPress, label }) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      type="button"
      onClick={onPress}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      style={{
        ...styles.button,
        ...(isFavorite ? styles.buttonActive : {}),
        ...(pressed ? styles.buttonPressed : {}),
      }}
    >
      <span style={styles.icon}>{isFavorite ? '♥' : '♡'}</span>
      {label ? (
        <span style={{ ...styles.label, ...(isFavorite ? styles.labelActive : {}) }}>
          {label}
        </span>
      ) : null}
    </button>
  );
}

const styles = {
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 999,
    backgroundColor: '#f4f1ee',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    border: '1px solid #e8e0db',
    cursor: 'pointer',
  },
  buttonActive: {
    backgroundColor: '#ffe4e6',
    borderColor: '#f5b2b8',
  },
  buttonPressed: {
    opacity: 0.85,
  },
  icon: {
    fontSize: 16,
    color: '#1f1f1f',
  },
  label: {
    fontSize: 12,
    fontWeight: 700,
    color: '#2d2d2d',
  },
  labelActive: {
    color: '#a3202d',
  },
};
