import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

export const RadioGroup = ({ options, selectedValue, onSelect }) => {
  return (
    <View style={styles.radioGroup}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={styles.radioButton}
          onPress={() => onSelect(option)}
        >
          <View style={styles.radioCircle}>
            {selectedValue === option && <View style={styles.radioSelected} />}
          </View>
          <Text style={styles.radioText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
