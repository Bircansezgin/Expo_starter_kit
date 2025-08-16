import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StatusBar, ScrollView } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { StorageService } from '@/hooks/storage';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import AboutModal from '@/components/AboutModal';
import { API_BASE_URL } from '@env';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { isDark, theme, setTheme } = useTheme();
  const [aboutModalVisible, setAboutModalVisible] = useState(false);

  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const [firstName] = (user?.name || '').split(' ');

  useEffect(() => {
    console.log('API_BASE_URL', API_BASE_URL);
  }, []);

  const handleLogout = () => {
    Alert.alert(t('profile.logout.title'), t('profile.logout.message'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('profile.logout.confirm'),
        style: 'destructive',
        onPress: async () => {
          await StorageService.clear();
          await logout();
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      t('profile.deleteAccount'),
      t('profile.deleteConfirmDesc'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('profile.deleteConfirm'),
          style: 'destructive',
          onPress: async () => {
            await StorageService.clear();
            await logout();
          },
        },
      ]
    );
  };

  const menuItems = [
    {
      icon: 'person-outline',
      title: t('profile.menuItems.editProfile.title'),
      subtitle: t('profile.menuItems.editProfile.subtitle'),
      onPress: () => {},
    },
    {
      icon: 'notifications-outline',
      title: t('settings.notifications.title'),
      subtitle: t('settings.notifications.subtitle'),
      onPress: () => {},
    },
    {
      icon: 'lock-closed-outline',
      title: t('settings.privacy.privacyPolicy'),
      subtitle: t('settings.privacy.privacyPolicySubtitle'),
      onPress: () => {},
    },
    {
      icon: 'help-circle-outline',
      title: t('settings.support.help'),
      subtitle: t('settings.support.helpSubtitle'),
      onPress: () => {},
    },
    {
      icon: 'information-circle-outline',
      title: t('settings.support.about'),
      subtitle: t('settings.support.aboutSubtitle'),
      onPress: () => setAboutModalVisible(true),
    },
  ];

  const themeOptions = [
    { value: 'light', label: t('settings.appearance.lightMode'), icon: 'sunny-outline' },
    { value: 'dark', label: t('settings.appearance.darkMode'), icon: 'moon-outline' },
    { value: 'system', label: t('settings.appearance.systemMode'), icon: 'settings-outline' },
  ];

  const languageOptions = [
    { value: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    { value: 'en', label: 'English', flag: '🇺🇸' },
  ];

  const handleLanguageChange = async (lang: string) => {
    // Mevcut i18n sistemiyle dil değiştirme
    const { changeLanguage } = await import('i18next');
    await changeLanguage(lang);
  };

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900" style={{ paddingTop: insets.top }}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Header */}
      <View className="bg-white dark:bg-neutral-900 px-4 py-3 border-b border-gray-100 dark:border-gray-700">
        <View className="flex-row items-center justify-between">
          <Text className="text-xl font-bold text-gray-900 dark:text-white">
            {t('profile.title')}
          </Text>
          <TouchableOpacity className="p-2">
            <Ionicons name="settings-outline" size={24} color={isDark ? "#9CA3AF" : "#374151"} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Profile Header */}
        <View className="bg-white dark:bg-neutral-800 p-6 border-b border-gray-100 dark:border-gray-700">
          <View className="flex-row items-center mb-6">
            <View className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full items-center justify-center mr-4">
              <Text className="text-white text-2xl font-bold">
                {firstName?.charAt(0)?.toUpperCase() || 'U'}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                {user?.name || t('profile.user.defaultName')}
              </Text>
              <Text className="text-sm mb-2 text-gray-500 dark:text-gray-400">
                {user?.email || 'kullanici@email.com'}
              </Text>
              <TouchableOpacity className="rounded-lg px-3 py-1 self-start bg-gray-100 dark:bg-gray-700">
                <Text className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  {t('profile.menuItems.editProfile.title')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats */}
          <View className="flex-row justify-around py-4 border-t border-gray-100 dark:border-gray-700">
            <View className="items-center">
              <Text className="text-xl font-bold text-gray-900 dark:text-white">0</Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400">{t('profile.stats.posts')}</Text>
            </View>
            <View className="items-center">
              <Text className="text-xl font-bold text-gray-900 dark:text-white">0</Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400">{t('profile.stats.followers')}</Text>
            </View>
            <View className="items-center">
              <Text className="text-xl font-bold text-gray-900 dark:text-white">0</Text>
              <Text className="text-xs text-gray-500 dark:text-gray-400">{t('profile.stats.following')}</Text>
            </View>
          </View>
        </View>

        {/* Theme Settings */}
        <View className="bg-white dark:bg-neutral-800 mt-2">
          <View className="px-4 py-3 border-b border-gray-50 dark:border-gray-700">
            <Text className="font-medium text-gray-900 dark:text-white">
              {t('settings.appearance.theme')}
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              {t('settings.appearance.darkModeSubtitle')}
            </Text>
          </View>
          {themeOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              className="flex-row items-center px-4 py-3 border-b border-gray-50 dark:border-gray-700"
              onPress={() => setTheme(option.value as any)}
            >
              <View className="w-8 h-8 rounded-lg items-center justify-center mr-3 bg-gray-100 dark:bg-gray-700">
                <Ionicons name={option.icon as any} size={18} color={isDark ? "#9CA3AF" : "#6B7280"} />
              </View>
              <View className="flex-1">
                <Text className="font-medium text-gray-900 dark:text-white">
                  {option.label}
                </Text>
              </View>
              {theme === option.value && (
                <Ionicons name="checkmark" size={20} color="#10B981" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Language Settings */}
        <View className="bg-white dark:bg-neutral-800 mt-2">
          <View className="px-4 py-3 border-b border-gray-50 dark:border-gray-700">
            <Text className="font-medium text-gray-900 dark:text-white">
              {t('settings.appearance.language')}
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              {t('languageSettings.subtitle')}
            </Text>
          </View>
          {languageOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              className="flex-row items-center px-4 py-3 border-b border-gray-50 dark:border-gray-700"
              onPress={() => handleLanguageChange(option.value)}
            >
              <View className="w-8 h-8 rounded-lg items-center justify-center mr-3 bg-gray-100 dark:bg-gray-700">
                <Text className="text-lg">{option.flag}</Text>
              </View>
              <View className="flex-1">
                <Text className="font-medium text-gray-900 dark:text-white">
                  {option.label}
                </Text>
              </View>
              {option.value === 'tr' && (
                <Ionicons name="checkmark" size={20} color="#10B981" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Menu Items */}
        <View className="bg-white dark:bg-neutral-800 mt-2">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center px-4 py-4 border-b border-gray-50 dark:border-gray-700"
              onPress={item.onPress}
            >
              <View className="w-8 h-8 rounded-lg items-center justify-center mr-3 bg-gray-100 dark:bg-gray-700">
                <Ionicons name={item.icon as any} size={18} color={isDark ? "#9CA3AF" : "#6B7280"} />
              </View>
              <View className="flex-1">
                <Text className="font-medium text-gray-900 dark:text-white">{item.title}</Text>
                <Text className="text-sm text-gray-500 dark:text-gray-400">{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={isDark ? "#9CA3AF" : "#6B7280"} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Account Actions */}
        <View className="bg-white dark:bg-neutral-800 mt-2 mb-6">
          <TouchableOpacity
            className="flex-row items-center px-4 py-4 border-b border-gray-50 dark:border-gray-700"
            onPress={handleLogout}
          >
            <View className="w-8 h-8 bg-red-50 rounded-lg items-center justify-center mr-3">
              <Ionicons name="exit-outline" size={18} color="#EF4444" />
            </View>
            <View className="flex-1">
              <Text className="text-red-600 font-medium">{t('profile.logout.title')}</Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                {t('profile.logoutDesc')}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={isDark ? "#9CA3AF" : "#6B7280"} />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center px-4 py-4"
            onPress={handleDeleteAccount}
          >
            <View className="w-8 h-8 bg-red-50 rounded-lg items-center justify-center mr-3">
              <Ionicons name="trash-outline" size={18} color="#EF4444" />
            </View>
            <View className="flex-1">
              <Text className="text-red-600 font-medium">{t('profile.deleteAccount')}</Text>
              <Text className="text-sm text-gray-500 dark:text-gray-400">
                {t('profile.deleteAccountDesc')}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={isDark ? "#9CA3AF" : "#6B7280"} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      {/* About Modal */}
      <AboutModal 
        visible={aboutModalVisible}
        onClose={() => setAboutModalVisible(false)}
      />
    </View>
  );
}
