import React from 'react';

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Buscar receta...',
}) {
  return (
    <div style={styles.container}>
      <span style={styles.icon}>🔎</span>
      <input
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
        placeholder={placeholder}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect="off"
      />
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f2f0',
    borderRadius: 16,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 10,
    paddingBottom: 10,
    border: '1px solid #e4e1de',
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#1b1b1b',
    fontSize: 16,
    border: 'none',
    outline: 'none',
    background: 'transparent',
  },
};
