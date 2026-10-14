import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Switch,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Checkbox from 'expo-checkbox';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    country: 'USA',
    age: 25,
    subscribe: false,
    terms: false,
    bio: '',
    rating: 3,
    color: '#3498db',
    birthDate: new Date(),
    image: null,
    gender: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({ ...formData, image: result.assets[0].uri });
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Camera permission is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({ ...formData, image: result.assets[0].uri });
    }
  };

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
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter first name"
          value={formData.firstName}
          onChangeText={(text) => setFormData({ ...formData, firstName: text })}
        />

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter last name"
          value={formData.lastName}
          onChangeText={(text) => setFormData({ ...formData, lastName: text })}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          secureTextEntry
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          keyboardType="phone-pad"
        />

        {/* Multiline Text Area */}
        <Text style={styles.label}>Bio</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Tell us about yourself"
          value={formData.bio}
          onChangeText={(text) => setFormData({ ...formData, bio: text })}
          multiline
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

        {/* Dropdown */}
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
        <View style={styles.radioGroup}>
          {['Male', 'Female', 'Other'].map((gender) => (
            <TouchableOpacity
              key={gender}
              style={styles.radioButton}
              onPress={() => setFormData({ ...formData, gender })}
            >
              <View style={styles.radioCircle}>
                {formData.gender === gender && <View style={styles.radioSelected} />}
              </View>
              <Text style={styles.radioText}>{gender}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Slider - Age */}
        <Text style={styles.label}>Age: {Math.round(formData.age)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={18}
          maximumValue={100}
          value={formData.age}
          onValueChange={(value) => setFormData({ ...formData, age: value })}
          minimumTrackTintColor="#3498db"
          maximumTrackTintColor="#ddd"
          thumbTintColor="#3498db"
        />

        {/* Rating Slider */}
        <Text style={styles.label}>Rating: {Math.round(formData.rating)} / 5</Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => setFormData({ ...formData, rating: star })}
            >
              <Text style={styles.star}>
                {star <= formData.rating ? '★' : '☆'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Color Picker */}
        <Text style={styles.label}>Favorite Color</Text>
        <View style={styles.colorPickerContainer}>
          {['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'].map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorOption,
                { backgroundColor: color },
                formData.color === color && styles.colorSelected,
              ]}
              onPress={() => setFormData({ ...formData, color })}
            />
          ))}
        </View>
        <View style={[styles.colorPreview, { backgroundColor: formData.color }]}>
          <Text style={styles.colorText}>Selected: {formData.color}</Text>
        </View>

        {/* Image Picker */}
        <Text style={styles.label}>Profile Picture</Text>
        <View style={styles.imagePickerContainer}>
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.imageButtonText}>📁 Choose from Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
            <Text style={styles.imageButtonText}>📷 Take Photo</Text>
          </TouchableOpacity>
        </View>

        {formData.image && (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: formData.image }} style={styles.imagePreview} />
            <TouchableOpacity
              style={styles.removeImageButton}
              onPress={() => setFormData({ ...formData, image: null })}
            >
              <Text style={styles.removeImageText}>✕ Remove</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Checkbox */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={formData.terms}
            onValueChange={(value) => setFormData({ ...formData, terms: value })}
            color={formData.terms ? '#3498db' : undefined}
          />
          <Text style={styles.checkboxLabel}>I agree to terms and conditions</Text>
        </View>

        {/* Switch */}
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Subscribe to newsletter</Text>
          <Switch
            value={formData.subscribe}
            onValueChange={(value) => setFormData({ ...formData, subscribe: value })}
            trackColor={{ false: '#ddd', true: '#3498db' }}
            thumbColor={formData.subscribe ? '#2980b9' : '#f4f3f4'}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  content: {
    padding: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#2c3e50',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
    color: '#34495e',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#2c3e50',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
  },
  dateText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
  },
  pickerButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  pickerButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    margin: 4,
    borderRadius: 8,
    backgroundColor: '#ecf0f1',
  },
  pickerButtonActive: {
    backgroundColor: '#3498db',
  },
  pickerButtonText: {
    fontSize: 14,
    color: '#2c3e50',
  },
  pickerButtonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 10,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3498db',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3498db',
  },
  radioText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  star: {
    fontSize: 40,
    marginRight: 8,
    color: '#f39c12',
  },
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
    borderColor: '#2c3e50',
    transform: [{ scale: 1.1 }],
  },
  colorPreview: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  colorText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  imagePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  imageButton: {
    flex: 1,
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  imageButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  removeImageButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  removeImageText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#2c3e50',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  submitButton: {
    backgroundColor: '#2ecc71',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  spacer: {
    height: 40,
  },
});
