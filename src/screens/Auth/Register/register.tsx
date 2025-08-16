'use client';

import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts/ThemeContext';
import { validateRegisterForm, RegisterFormData } from './register-schema';

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const { t } = useTranslation();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { isDark } = useTheme();

  const validateForm = async (): Promise<boolean> => {
    const formData: RegisterFormData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password
    }

    const { isValid, errors } = await validateRegisterForm(formData)
    setErrors(errors)
    return isValid
  };

  const handleRegister = async () => {
    const isValid = await validateForm()
    if (!isValid) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert(
        'Success!',
        'Account created successfully. You can now login.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login' as never),
          },
        ]
      );
    } catch {
      Alert.alert('Error', 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900">
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={isDark ? "#111827" : "#FFFFFF"} />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: insets.top + 20,
            paddingBottom: insets.bottom + 20,
            paddingHorizontal: 24,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View className="items-center mb-10">
            <View className="w-20 h-20 bg-black dark:bg-white rounded-3xl items-center justify-center mb-6 shadow-lg">
              <Ionicons name="person-add" size={40} color={isDark ? "#000000" : "white"} />
            </View>

            <Text className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">
              {t('register.createAccount')}
            </Text>

            <Text className="text-base font-medium text-gray-600 dark:text-gray-400 text-center leading-6">
              {t('register.joinUs')}
            </Text>
          </View>

          {/* Form Container */}
          <View className="bg-white dark:bg-neutral-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            {/* First Name Input */}
            <View className="mb-5">
              <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                First Name
              </Text>
              <View className={`flex-row items-center border-2 rounded-2xl bg-white dark:bg-neutral-700 px-4 py-1 ${
                errors.firstName 
                  ? 'border-red-500' 
                  : focusedField === 'firstName' 
                    ? 'border-black dark:border-white' 
                    : 'border-gray-200 dark:border-gray-600'
              }`}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={errors.firstName ? '#EF4444' : focusedField === 'firstName' ? (isDark ? '#FFFFFF' : '#000000') : '#9CA3AF'}
                  className="mr-3"
                />
                <TextInput
                  value={firstName}
                  onChangeText={(text) => {
                    setFirstName(text);
                    clearError('firstName');
                  }}
                  placeholder={t('register.enterYourFirstName')}
                  placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
                  autoCapitalize="words"
                  onFocus={() => setFocusedField('firstName')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    flex: 1,
                    fontSize: 16,
                    fontWeight: "500",
                    color: isDark ? "#F9FAFB" : "#1F2937",
                    paddingVertical: 16,
                  }}
                />
              </View>
              {errors.firstName && (
                <Text className="text-xs text-red-500 dark:text-red-400 mt-1 font-medium">
                  {errors.firstName}
                </Text>
              )}
            </View>

            {/* Last Name Input */}
            <View className="mb-5">
              <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Last Name
              </Text>
              <View className={`flex-row items-center border-2 rounded-2xl bg-white dark:bg-neutral-700 px-4 py-1 ${
                errors.lastName 
                  ? 'border-red-500' 
                  : focusedField === 'lastName' 
                    ? 'border-black dark:border-white' 
                    : 'border-gray-200 dark:border-gray-600'
              }`}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={errors.lastName ? '#EF4444' : focusedField === 'lastName' ? (isDark ? '#FFFFFF' : '#000000') : '#9CA3AF'}
                  className="mr-3"
                />
                <TextInput
                  value={lastName}
                  onChangeText={(text) => {
                    setLastName(text);
                    clearError('lastName');
                  }}
                  placeholder={t('register.enterYourLastName')}
                  placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
                  autoCapitalize="words"
                  onFocus={() => setFocusedField('lastName')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    flex: 1,
                    fontSize: 16,
                    fontWeight: "500",
                    color: isDark ? "#F9FAFB" : "#1F2937",
                    paddingVertical: 16,
                  }}
                />
              </View>
              {errors.lastName && (
                <Text className="text-xs text-red-500 dark:text-red-400 mt-1 font-medium">
                  {errors.lastName}
                </Text>
              )}
            </View>

            {/* Email Input */}
            <View className="mb-5">
              <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </Text>
              <View className={`flex-row items-center border-2 rounded-2xl bg-white dark:bg-neutral-700 px-4 py-1 ${
                errors.email 
                  ? 'border-red-500' 
                  : focusedField === 'email' 
                    ? 'border-black dark:border-white' 
                    : 'border-gray-200 dark:border-gray-600'
              }`}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={errors.email ? '#EF4444' : focusedField === 'email' ? (isDark ? '#FFFFFF' : '#000000') : '#9CA3AF'}
                  className="mr-3"
                />
                <TextInput
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    clearError('email');
                  }}
                  placeholder={t('register.enterYourEmail')}
                  placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    flex: 1,
                    fontSize: 16,
                    fontWeight: "500",
                    color: isDark ? "#F9FAFB" : "#1F2937",
                    paddingVertical: 16,
                  }}
                />
              </View>
              {errors.email && (
                <Text className="text-xs text-red-500 dark:text-red-400 mt-1 font-medium">
                  {errors.email}
                </Text>
              )}
            </View>

            {/* Password Input */}
            <View className="mb-6">
              <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Password
              </Text>
              <View className={`flex-row items-center border-2 rounded-2xl bg-white dark:bg-neutral-700 px-4 py-1 ${
                errors.password 
                  ? 'border-red-500' 
                  : focusedField === 'password' 
                    ? 'border-black dark:border-white' 
                    : 'border-gray-200 dark:border-gray-600'
              }`}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={errors.password ? '#EF4444' : focusedField === 'password' ? (isDark ? '#FFFFFF' : '#000000') : '#9CA3AF'}
                  className="mr-3"
                />
                <TextInput
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    clearError('password');
                  }}
                  placeholder={t('register.enterYourPassword')}
                  placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
                  secureTextEntry={!showPassword}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    flex: 1,
                    fontSize: 16,
                    fontWeight: "500",
                    color: isDark ? "#F9FAFB" : "#1F2937",
                    paddingVertical: 16,
                  }}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="p-1">
                  <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text className="text-xs text-red-500 dark:text-red-400 mt-1 font-medium">
                  {errors.password}
                </Text>
              )}
            </View>

            {/* Register Button */}
            <TouchableOpacity onPress={handleRegister} disabled={isLoading} className="mb-4">
              <View className={`flex-row justify-center items-center py-4 rounded-2xl shadow-lg ${
                isLoading ? 'opacity-70' : ''
              } bg-black dark:bg-white`}>
                {isLoading ? (
                  <Text className="text-base font-bold text-white dark:text-black">
                    Creating Account...
                  </Text>
                ) : (
                  <>
                    <Ionicons
                      name="person-add-outline"
                      size={20}
                      color={isDark ? "#000000" : "white"}
                      className="mr-2"
                    />
                    <Text className="text-base font-bold text-white dark:text-black">
                      {t('register.createAccount')}
                    </Text>
                  </>
                )}
              </View>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity 
              onPress={() => navigation.navigate('Login' as never)} 
              className="mt-4"
            >
              <View className="flex-row justify-center items-center py-4 rounded-2xl border-2 border-black dark:border-white bg-transparent">
                <Ionicons
                  name="log-in-outline"
                  size={20}
                  color={isDark ? "#FFFFFF" : "#000000"}
                  className="mr-2"
                />
                <Text className="text-base font-bold text-black dark:text-white">
                  {t('register.alreadyHaveAccount')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-700 items-center">
            <Text className="text-xs text-gray-500 dark:text-gray-400 text-center leading-5">
              By continuing, you agree to our Terms of Service{'\n'}
              and acknowledge our Privacy Policy{'\n\n'}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
