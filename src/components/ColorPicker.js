import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export const ColorPicker = ({ selectedColor, onColorSelect }) => {
  return (
    <View>
      <View style={styles.colorPickerContainer}>
        {COLORS.colorOptions.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorOption,
              { backgroundColor: color },
              selectedColor === color && styles.colorSelected,
            ]}
            onPress={() => onColorSelect(color)}
          />
        ))}
      </View>
      <View style={[styles.colorPreview, { backgroundColor: selectedColor }]}>
        <Text style={styles.colorText}>Selected: {selectedColor}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  colorPickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  colorSelected: {
    borderColor: COLORS.textPrimary,
    transform: [{ scale: 1.1 }],
  },
  colorPreview: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  colorText: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
