import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type FavButtonProps = {
  isFavorite: boolean;
  onPress: () => void;
  label?: string;
};

export default function FavButton({ isFavorite, onPress, label }: FavButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.button,
        isFavorite && styles.buttonActive,
        pressed && styles.buttonPressed,
      ]}
    >
      <Text style={styles.icon}>{isFavorite ? '♥' : '♡'}</Text>
      {label ? <Text style={[styles.label, isFavorite && styles.labelActive]}>{label}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 999,
    backgroundColor: '#f4f1ee',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e8e0db',
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
    fontWeight: '700',
    color: '#2d2d2d',
  },
  labelActive: {
    color: '#a3202d',
  },
});
