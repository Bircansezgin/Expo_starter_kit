"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native"
import * as Haptics from 'expo-haptics';
import { Ionicons } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useAuth } from "../../../contexts/AuthContext"
import { useNavigation } from "@react-navigation/native"
import { useTranslation } from "react-i18next"
import { useTheme } from '@/contexts/ThemeContext'
import { validateLoginForm, LoginFormData } from './login-schema'

interface FormErrors {
  email?: string
  password?: string
  general?: string
}

export default function ModernLoginScreen() {
  // State
  const [email, setEmail] = useState("test@test.com")
  const [password, setPassword] = useState("12301230")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [errors, setErrors] = useState<FormErrors>({})

  // Hooks
  const { t } = useTranslation()
  const { login } = useAuth()
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const { isDark } = useTheme()

  // Validation function using Yup
  const validateForm = async (): Promise<boolean> => {
    const formData: LoginFormData = {
      email: email.trim(),
      password
    }

    const { isValid, errors } = await validateLoginForm(formData)
    setErrors(errors)
    return isValid
  }

  // Clear errors when user types
  const clearError = (field: keyof FormErrors) => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      })
    }
  }

  // Handle form submission
  const handleSubmit = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    const isValid = await validateForm()
    if (!isValid) return

    setIsLoading(true)
    setErrors({})

    try {
      const success = await login({ email: email.trim(), password })
      if (!success) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setErrors({ general: t('login.invalidEmailOrPassword') })
      }
    } catch {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setErrors({ general: t('login.somethingWentWrong') })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900">
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={isDark ? "#111827" : "#FFFFFF"} />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
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
            {/* Logo */}
            <View className="w-20 h-20 bg-black dark:bg-white rounded-3xl items-center justify-center mb-6 shadow-lg">
              <Ionicons name="log-in" size={40} color={isDark ? "#000000" : "white"} />
            </View>

            {/* Title */}
            <Text className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">
              {t('login.welcomeBack')}
            </Text>

            {/* Subtitle */}
            <Text className="text-base font-medium text-gray-600 dark:text-gray-400 text-center leading-6">
              {t('login.signInToContinue')}
            </Text>
          </View>

          {/* Form Container */}
          <View className="bg-white dark:bg-neutral-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            {/* Error Message */}
            {errors.general && (
              <View className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6 flex-row items-center">
                <View className="w-5 h-5 bg-red-500 rounded-full items-center justify-center mr-3">
                  <Ionicons name="alert" size={12} color="white" />
                </View>
                <Text className="flex-1 text-sm text-red-600 dark:text-red-400 font-medium">
                  {errors.general}
                </Text>
              </View>
            )}

            {/* Email Input */}
            <View className="mb-5">
              <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </Text>
              <View className={`flex-row items-center border-2 rounded-2xl bg-white dark:bg-neutral-700 px-4 py-1 ${
                errors.email 
                  ? 'border-red-500' 
                  : focusedField === "email" 
                    ? 'border-black dark:border-white' 
                    : 'border-gray-200 dark:border-gray-600'
              }`}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={errors.email ? "#EF4444" : focusedField === "email" ? (isDark ? "#FFFFFF" : "#000000") : "#9CA3AF"}
                  className="mr-3"
                />
                <TextInput
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text)
                    clearError("email")
                  }}
                  placeholder={t('login.enterYourEmail')}
                  placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    flex: 1,
                    fontSize: 16,
                    fontWeight: "500",
                    color: isDark ? "#F9FAFB" : "#1F2937",
                    paddingVertical: 16,
                  }}
                />
                {email.length > 0 && !errors.email && (
                  <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                )}
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
                  : focusedField === "password" 
                    ? 'border-black dark:border-white' 
                    : 'border-gray-200 dark:border-gray-600'
              }`}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={errors.password ? "#EF4444" : focusedField === "password" ? (isDark ? "#FFFFFF" : "#000000") : "#9CA3AF"}
                  className="mr-3"
                />
                <TextInput
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text)
                    clearError("password")
                  }}
                  placeholder={t('login.enterYourPassword')}
                  placeholderTextColor={isDark ? "#6B7280" : "#9CA3AF"}
                  secureTextEntry={!showPassword}
                  onFocus={() => setFocusedField("password")}
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
                  <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#9CA3AF" />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text className="text-xs text-red-500 dark:text-red-400 mt-1 font-medium">
                  {errors.password}
                </Text>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity onPress={handleSubmit} disabled={isLoading} className="mb-4">
              <View className={`flex-row justify-center items-center py-4 rounded-2xl shadow-lg ${
                isLoading ? 'opacity-70' : ''
              } bg-black dark:bg-white`}>
                {isLoading ? (
                  <ActivityIndicator size="small" color={isDark ? "#000000" : "white"} />
                ) : (
                  <>
                    <Ionicons
                      name="log-in-outline"
                      size={20}
                      color={isDark ? "#000000" : "white"}
                      className="mr-2"
                    />
                    <Text className="text-base font-bold text-white dark:text-black">
                      {t('login.signIn')}
                    </Text>
                  </>
                )}
              </View>
            </TouchableOpacity>

            {/* Register Button */}
            <TouchableOpacity 
              onPress={() => navigation.navigate('Register' as never)} 
              className="mt-4"
            >
              <View className="flex-row justify-center items-center py-4 rounded-2xl border-2 border-black dark:border-white bg-transparent">
                <Ionicons
                  name="person-add-outline"
                  size={20}
                  color={isDark ? "#FFFFFF" : "#000000"}
                  className="mr-2"
                />
                <Text className="text-base font-bold text-black dark:text-white">
                  {t('login.createAccount')}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-700 items-center">
            <Text className="text-xs text-gray-500 dark:text-gray-400 text-center leading-5">
              By continuing, you agree to our Terms of Service{"\n"}
              and acknowledge our Privacy Policy{"\n\n"}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}
