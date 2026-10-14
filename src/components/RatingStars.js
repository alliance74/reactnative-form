import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

export const RatingStars = ({ rating, onRate, maxStars = 5 }) => {
  return (
    <View style={styles.starsContainer}>
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <TouchableOpacity key={starValue} onPress={() => onRate(starValue)}>
            <Text style={styles.star}>
              {starValue <= rating ? '★' : '☆'}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  star: {
    fontSize: 40,
    marginRight: 8,
    color: COLORS.star,
  },
});
