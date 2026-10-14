import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { styles } from '../styles/styles';

export const FormInput = ({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  multiline = false,
  numberOfLines,
  keyboardType,
  secureTextEntry = false,
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.textArea]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};
