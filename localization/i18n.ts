import i18n, { changeLanguage } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import translation files
import en from './en.json';
import tr from './tr.json';

const langStorageKey = '@:language';

const resources = {
  en: {
    translation: en,
  },
  tr: {
    translation: tr,
  },
};

// Set the locale once at the beginning of your app
const deviceLocale = getLocales()[0]?.languageCode || 'en';

export const setLanguage = async (lng: string) => {
  await AsyncStorage.setItem('language', lng);
  await changeLanguage(lng);
};

export const loadLanguage = async () => {
  const language = await AsyncStorage.getItem('language');
  if (language) {
    await changeLanguage(language);
  }
  console.log('language', language);
};

export const persistLanguage = async (language: string) => {
  try {
    await AsyncStorage.setItem(langStorageKey, language);
  } catch (error) {
    console.error('Error saving language:', error);
  }
};

export const loadPersistedLanguage = async () => {
  try {
    const language = await AsyncStorage.getItem(langStorageKey);
    return language || 'tr'; // Default language if not found
  } catch (error) {
    console.error('Error loading language:', error);
    return 'tr'; // Default language on error
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: deviceLocale,
  fallbackLng: 'en',
  compatibilityJSON: 'v4', // To make it compatible with Android
  interpolation: {
    escapeValue: false, // Not needed for react as it escapes by default
    prefix: '%{',
    suffix: '}',
  },
});

export default i18n;
