# React Native Expo Template Starter

A comprehensive, production-ready React Native template built with Expo, featuring modern architecture, authentication system, internationalization, and beautiful UI components.

## 🚀 Features

### Core Features
- **Authentication System** - Complete login/register flow with secure token management
- **Navigation** - React Navigation with bottom tabs and stack navigation
- **Internationalization** - Multi-language support (English/Turkish) with i18n
- **Theme Support** - Light/Dark mode with system theme detection
- **Network Management** - Real-time network status monitoring
- **State Management** - Context API with TypeScript support

### UI/UX Features
- **Modern Design** - Tailwind CSS with NativeWind for styling
- **Custom Components** - Reusable UI components with TypeScript
- **Loading States** - Smooth loading indicators
- **Error Handling** - Comprehensive error management
- **Responsive Design** - Optimized for different screen sizes

### Development Features
- **TypeScript** - Full TypeScript support with strict typing
- **ESLint & Prettier** - Code quality and formatting
- **Expo SDK** - Latest Expo features and APIs
- **Hot Reload** - Fast development with live reloading
- **Cross-platform** - iOS and Android support

## 📱 Screenshots

<div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; margin: 20px 0;">
  <img width="280" height="560" alt="Screenshot 1" src="https://github.com/user-attachments/assets/8c53c7e2-c5b8-4d6c-b4a7-1b6d5008566c" />
  <img width="280" height="560" alt="Screenshot 2" src="https://github.com/user-attachments/assets/48f12939-30f0-45d3-a4fb-290cf8b87141" />
  <img width="280" height="560" alt="Screenshot 3" src="https://github.com/user-attachments/assets/7ca4abc2-7f58-46df-8c15-fd208c17504e" />
</div>

## 🛠 Tech Stack

### Core Technologies
- **React Native** - 0.79.3
- **Expo** - 53.0.11
- **TypeScript** - 5.8.3
- **React Navigation** - 7.x

### UI & Styling
- **NativeWind** - Tailwind CSS for React Native
- **React Native Vector Icons** - Icon library
- **Expo Linear Gradient** - Gradient components
- **Expo Blur** - Blur effects

### State & Data
- **Context API** - State management
- **AsyncStorage** - Local data persistence
- **Axios** - HTTP client

### Navigation & Gestures
- **React Navigation** - Navigation library
- **React Native Gesture Handler** - Gesture recognition
- **React Native Reanimated** - Animations

### Internationalization
- **i18n-js** - Internationalization
- **react-i18next** - React i18n framework
- **Expo Localization** - Device locale detection

### Notifications & Media
- **Expo Notifications** - Push notifications
- **Expo AV** - Audio/Video playback
- **Expo Audio** - Audio recording

## 📁 Project Structure

```
TEMPLATE_MOBILE/
├── src/
│   ├── components/          # Reusable UI components
│   ├── contexts/           # React Context providers
│   ├── hooks/              # Custom React hooks
│   ├── navigation/         # Navigation configuration
│   ├── providers/          # App providers
│   ├── screens/            # Screen components
│   │   ├── Auth/          # Authentication screens
│   │   ├── Home/          # Home screen
│   │   └── Profile/       # Profile screens
│   ├── services/           # API services
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── localization/           # i18n translations
├── assets/                 # Images, icons, sounds
└── config/                 # Configuration files
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TEMPLATE_MOBILE
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on device/simulator**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start Expo development server |
| `npm run ios` | Run on iOS simulator |
| `npm run android` | Run on Android emulator |
| `npm run web` | Run on web browser |
| `npm run lint` | Run ESLint and Prettier check |
| `npm run format` | Format code with ESLint and Prettier |
| `npm run clean` | Clear Expo cache |
| `npm run build:android` | Build Android APK |
| `npm run build:ios` | Build iOS app |

## 🔧 Configuration

### Environment Setup
The app uses Expo's configuration system. Key configurations are in:
- `app.json` - Expo app configuration
- `package.json` - Dependencies and scripts
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration

### Authentication
The app includes a complete authentication system with:
- Login/Register screens
- Token-based authentication
- Secure storage with AsyncStorage
- Mock authentication for development

### Internationalization
Multi-language support with:
- English and Turkish translations
- Dynamic language switching
- Device locale detection
- RTL support ready

## 🎨 Customization

### Styling
The app uses Tailwind CSS with NativeWind. Customize styles in:
- `global.css` - Global styles
- `tailwind.config.js` - Tailwind configuration
- Component-specific styles

### Theme
Theme system supports:
- Light/Dark mode
- System theme detection
- Custom color schemes
- Dynamic theme switching

### Navigation
Customize navigation in:
- `src/navigation/` - Navigation configuration
- `src/screens/` - Screen components
- Tab bar customization

## 📱 Building for Production

### Android
```bash
npm run build:android
```

### iOS
```bash
npm run build:ios
```

## 🔒 Security Features

- Secure token storage
- Network request encryption
- Input validation
- Error boundary implementation
- Secure navigation handling

## 🧪 Testing

The template is ready for testing with:
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Error boundaries for crash prevention

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

## 🔄 Updates

This template is regularly updated with:
- Latest React Native versions
- Security patches
- New features and improvements
- Bug fixes

---

**Built with ❤️ using React Native and Expo - Bircan Sezgin**
# expo-mobile-app-boilerplate
# Expo_starter_kit
# Expo_starter_kit
