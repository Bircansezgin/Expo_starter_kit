import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';


interface AboutModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function AboutModal({ visible, onClose }: AboutModalProps) {
  const { isDark } = useTheme();

  const appInfo = {
    name: 'Template Mobile App',
    version: '1.0.0',
    description: 'A comprehensive React Native template with authentication, navigation, and modern UI components built with Expo and TypeScript.',
    features: [
      'Authentication System',
      'Modern UI Components',
      'Dark Mode Support',
      'Internationalization',
      'Network Management',
      'TypeScript Support',
      'State Management',
      'Local Storage',
      'Audio Support',
      'Image Handling',
      'Haptic Feedback'
    ],
    techStack: [
      'React Native 0.79.3',
      'Expo 53.0.11',
      'TypeScript 5.8.3',
      'React Navigation 7.x',
      'Tailwind CSS 3.3.2',
      'AsyncStorage 2.2.0',
      'Axios 1.9.0',
      'i18n 4.5.1'
    ]
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View 
        className="flex-1 bg-white dark:bg-neutral-900"
      >
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
        
        {/* Header */}
        <View className="bg-white dark:bg-neutral-900 px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-bold text-gray-900 dark:text-white">
              About App
            </Text>
            <TouchableOpacity 
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700"
              onPress={onClose}
            >
              <Ionicons 
                name="close" 
                size={24} 
                color={isDark ? "#9CA3AF" : "#374151"} 
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView 
          className="flex-1" 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* App Icon and Name */}
          <View className="items-center py-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <View className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl items-center justify-center mb-4 shadow-lg">
              <Ionicons name="phone-portrait" size={48} color="white" />
            </View>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {appInfo.name}
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              Version {appInfo.version}
            </Text>
          </View>

          {/* Description */}
          <View className="px-4 py-6 bg-white dark:bg-neutral-800">
            <Text className="text-base text-gray-700 dark:text-gray-300 leading-6">
              {appInfo.description}
            </Text>
          </View>

          {/* Features */}
          <View className="px-4 py-6 bg-white dark:bg-neutral-800">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Features
            </Text>
            <View className="space-y-3">
              {appInfo.features.map((feature, index) => (
                <View key={index} className="flex-row items-center">
                  <View className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  <Text className="text-gray-700 dark:text-gray-300 flex-1">
                    {feature}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Tech Stack */}
          <View className="px-4 py-6 bg-white dark:bg-neutral-800">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Tech Stack
            </Text>
            <View className="space-y-3">
              {appInfo.techStack.map((tech, index) => (
                <View key={index} className="flex-row items-center">
                  <View className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  <Text className="text-gray-700 dark:text-gray-300 flex-1">
                    {tech}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Contact Info */}
          <View className="px-4 py-6 bg-white dark:bg-neutral-800">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Contact & Support
            </Text>
            <View className="space-y-4">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full items-center justify-center mr-3">
                  <Ionicons name="mail-outline" size={20} color="#3B82F6" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-medium text-gray-900 dark:text-white">
                    Email Support
                  </Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">
                    support@templateapp.com
                  </Text>
                </View>
              </View>
              
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full items-center justify-center mr-3">
                  <Ionicons name="globe-outline" size={20} color="#10B981" />
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-medium text-gray-900 dark:text-white">
                    Website
                  </Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">
                    www.templateapp.com
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Footer */}
          <View className="px-4 py-8 bg-gray-50 dark:bg-neutral-900">
            <Text className="text-center text-sm text-gray-500 dark:text-gray-400">
              © 2024 Template Mobile App. All rights reserved.
            </Text>
            <Text className="text-center text-xs text-gray-400 dark:text-gray-500 mt-2">
              Built with ❤️ using React Native & Expo
            </Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
