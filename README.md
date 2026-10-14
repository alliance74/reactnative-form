# React Native Form App

A comprehensive React Native form application with all form elements including image picker, camera, color picker, date picker, and more.

## 📁 Project Structure

```
FormApp/
├── src/
│   ├── components/          # Reusable components
│   │   ├── FormInput.js     # Text input component
│   │   ├── RatingStars.js   # Star rating component
│   │   ├── ColorPicker.js   # Color selection component
│   │   ├── ImagePickerField.js  # Image upload & camera
│   │   ├── RadioGroup.js    # Radio button group
│   │   └── index.js         # Component exports
│   ├── screens/
│   │   └── FormScreen.js    # Main form screen
│   ├── styles/
│   │   └── styles.js        # Global styles
│   └── constants/
│       └── colors.js        # Color constants
├── App.js                   # App entry point
├── package.json
└── README.md
```

## ✨ Features

### Form Elements
- ✅ Text Inputs (First Name, Last Name, Email, Password, Phone)
- ✅ Multiline Text Area (Bio)
- ✅ Date Picker (Birth Date)
- ✅ Dropdown/Select (Country)
- ✅ Radio Buttons (Gender)
- ✅ Slider (Age 18-100)
- ✅ Star Rating (1-5 stars)
- ✅ Color Picker (6 color options)
- ✅ Image Picker (Gallery & Camera)
- ✅ Checkbox (Terms agreement)
- ✅ Switch (Newsletter subscription)

### Design Features
- 🎨 Modern, clean UI design
- 📱 Responsive layout
- 🌈 Consistent color scheme
- ✨ Smooth animations
- 📸 Image preview with remove option

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start the app
npx expo start
```

### Running the App

- **Mobile**: Scan the QR code with Expo Go app
- **Web**: Press `w` to open in browser
- **Android**: Press `a` to run on Android emulator
- **iOS**: Press `i` to run on iOS simulator (Mac only)

## 📦 Dependencies

- `expo` - Expo framework
- `react-native` - React Native framework
- `expo-image-picker` - Image and camera access
- `expo-checkbox` - Native checkbox component
- `@react-native-community/slider` - Slider component
- `@react-native-community/datetimepicker` - Date picker

## 🏗️ Architecture

### Components
Reusable UI components that can be used across the app:
- **FormInput**: Handles all text input types
- **RatingStars**: Interactive star rating system
- **ColorPicker**: Color selection with preview
- **ImagePickerField**: Image upload from gallery or camera
- **RadioGroup**: Custom radio button implementation

### Screens
Main app screens:
- **FormScreen**: Complete form with all elements

### Styles
Centralized styling:
- **styles.js**: Global StyleSheet definitions
- **colors.js**: Color constants for consistent theming

## 📝 Form Submission

When the form is submitted, all data is logged to the console in JSON format:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "bio": "Sample bio text",
  "country": "USA",
  "gender": "Male",
  "age": 25,
  "rating": 4,
  "color": "#3498db",
  "birthDate": "2000-01-01T00:00:00.000Z",
  "image": "file://...",
  "terms": true,
  "subscribe": true
}
```

## 🎯 Usage Example

```javascript
import { FormInput } from './src/components';

<FormInput
  label="Email"
  placeholder="Enter email"
  value={email}
  onChangeText={setEmail}
  keyboardType="email-address"
/>
```

## 📄 License

This project is open source and available under the MIT License.

## 👥 Contributing

Pull requests are welcome! Feel free to fork this repo and submit your improvements.
