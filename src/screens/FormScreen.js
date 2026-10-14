import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  Switch,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Checkbox from 'expo-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FormInput, RatingStars, ColorPicker, ImagePickerField, RadioGroup } from '../components';
import { styles } from '../styles/styles';
import { COLORS } from '../constants/colors';

export default function FormScreen() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    bio: '',
    country: 'USA',
    age: 25,
    subscribe: false,
    terms: false,
    rating: 3,
    color: COLORS.primary,
    birthDate: new Date(),
    image: null,
    gender: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    console.log('Form Submitted!');
    console.log(JSON.stringify({
      ...formData,
      birthDate: formData.birthDate.toISOString(),
    }, null, 2));
    Alert.alert('Success', 'Form submitted! Check console for data.');
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData({ ...formData, birthDate: selectedDate });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Complete Form Demo</Text>

        {/* Text Inputs */}
        <FormInput
          label="First Name"
          placeholder="Enter first name"
          value={formData.firstName}
          onChangeText={(text) => setFormData({ ...formData, firstName: text })}
        />

        <FormInput
          label="Last Name"
          placeholder="Enter last name"
          value={formData.lastName}
          onChangeText={(text) => setFormData({ ...formData, lastName: text })}
        />

        <FormInput
          label="Email"
          placeholder="Enter email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
        />

        <FormInput
          label="Password"
          placeholder="Enter password"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          secureTextEntry={true}
        />

        <FormInput
          label="Phone"
          placeholder="Enter phone"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          keyboardType="phone-pad"
        />

        <FormInput
          label="Bio"
          placeholder="Tell us about yourself"
          value={formData.bio}
          onChangeText={(text) => setFormData({ ...formData, bio: text })}
          multiline={true}
          numberOfLines={4}
        />

        {/* Date Picker */}
        <Text style={styles.label}>Birth Date</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateText}>
            {formData.birthDate.toLocaleDateString()}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={formData.birthDate}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        {/* Country Dropdown */}
        <Text style={styles.label}>Country</Text>
        <View style={styles.pickerContainer}>
          {Platform.OS === 'web' ? (
            <select
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              style={{ padding: 12, fontSize: 16, border: 'none', width: '100%' }}
            >
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="UK">UK</option>
              <option value="India">India</option>
            </select>
          ) : (
            <View style={styles.pickerButtons}>
              {['USA', 'Canada', 'UK', 'India'].map((country) => (
                <TouchableOpacity
                  key={country}
                  style={[
                    styles.pickerButton,
                    formData.country === country && styles.pickerButtonActive,
                  ]}
                  onPress={() => setFormData({ ...formData, country })}
                >
                  <Text
                    style={[
                      styles.pickerButtonText,
                      formData.country === country && styles.pickerButtonTextActive,
                    ]}
                  >
                    {country}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Radio Buttons - Gender */}
        <Text style={styles.label}>Gender</Text>
        <RadioGroup
          options={['Male', 'Female', 'Other']}
          selectedValue={formData.gender}
          onSelect={(gender) => setFormData({ ...formData, gender })}
        />

        {/* Slider - Age */}
        <Text style={styles.label}>Age: {Math.round(formData.age)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={18}
          maximumValue={100}
          value={formData.age}
          onValueChange={(value) => setFormData({ ...formData, age: value })}
          minimumTrackTintColor={COLORS.primary}
          maximumTrackTintColor={COLORS.border}
          thumbTintColor={COLORS.primary}
        />

        {/* Rating Stars */}
        <Text style={styles.label}>Rating: {Math.round(formData.rating)} / 5</Text>
        <RatingStars
          rating={formData.rating}
          onRate={(rating) => setFormData({ ...formData, rating })}
        />

        {/* Color Picker */}
        <Text style={styles.label}>Favorite Color</Text>
        <ColorPicker
          selectedColor={formData.color}
          onColorSelect={(color) => setFormData({ ...formData, color })}
        />

        {/* Image Picker */}
        <Text style={styles.label}>Profile Picture</Text>
        <ImagePickerField
          image={formData.image}
          onImageSelected={(image) => setFormData({ ...formData, image })}
        />

        {/* Checkbox */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={formData.terms}
            onValueChange={(value) => setFormData({ ...formData, terms: value })}
            color={formData.terms ? COLORS.primary : undefined}
          />
          <Text style={styles.checkboxLabel}>I agree to terms and conditions</Text>
        </View>

        {/* Switch */}
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Subscribe to newsletter</Text>
          <Switch
            value={formData.subscribe}
            onValueChange={(value) => setFormData({ ...formData, subscribe: value })}
            trackColor={{ false: COLORS.border, true: COLORS.primary }}
            thumbColor={formData.subscribe ? COLORS.primaryDark : '#f4f3f4'}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Form</Text>
        </TouchableOpacity>

        <View style={styles.spacer} />
      </View>
    </ScrollView>
  );
}
