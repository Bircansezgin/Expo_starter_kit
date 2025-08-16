'use client';

import { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { setLanguage } from '../../../localization/i18n';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'tr'>('tr');
  const { t } = useTranslation();

  const onboardingData = [
    {
      id: 0,
      title: t('onboarding.languageSelection.title'),
      subtitle: t('onboarding.languageSelection.subtitle'),
      description: t('onboarding.languageSelection.description'),
      emoji: '🌍',
      gradient: ['#000000', '#374151'] as const,
      features: [
        {
          icon: 'language' as const,
          label: t('onboarding.languageSelection.features.english'),
          value: 'en',
        },
        {
          icon: 'language' as const,
          label: t('onboarding.languageSelection.features.turkish'),
          value: 'tr',
        },
        {
          icon: 'globe' as const,
          label: t('onboarding.languageSelection.features.global'),
          value: 'tr',
        },
      ],
      isLanguageSelection: true,
    },
  ];

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();


  const handleLanguageSelect = async (language: 'en' | 'tr') => {
    setSelectedLanguage(language);
    await setLanguage(language);
    // Navigate to Login after language selection
    navigation.navigate('Login' as never);
  };

  const handleSkip = () => {
    navigation.navigate('Login' as never);
  };

  const currentSlide = onboardingData[0];

  return (
    <View className="flex-1 bg-white" >


      {/* Header */}
      <View
        className="flex-row justify-between items-center px-6 pb-4"
        style={{ paddingTop: insets.top }}>
        <View className="h-12 w-12" />

        <Text className="text-base font-semibold text-black">
          1 / 1
        </Text>

        <TouchableOpacity onPress={handleSkip} className="px-4 py-2 rounded-2xl bg-black/20">
          <Text className="font-semibold text-white">
            {t('onboarding.skip')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <Animated.View
        style={[
          {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 32,
          },
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}>
        {/* Emoji Container */}
        <Animated.View
          style={[
            {
              width: 120,
              height: 120,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 60,
              marginBottom: 32,
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.3,
              shadowRadius: 20,
              elevation: 15,
              backgroundColor: 'rgba(255,255,255,0.9)',
              shadowColor: currentSlide.gradient[0],
            },
            {
              transform: [
                {
                  rotate: rotateAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '10deg'],
                  }),
                },
              ],
            },
          ]}>
          <Text className="text-6xl">{currentSlide.emoji}</Text>
        </Animated.View>

        {/* Title */}
        <Animated.Text
          style={[
            {
              fontSize: 32,
              fontWeight: 'bold',
              textAlign: 'center',
              marginBottom: 12,
              color: currentSlide.gradient[0],
            },
            {
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}>
          {currentSlide.title}
        </Animated.Text>

        {/* Subtitle */}
        <Animated.Text
          style={[
            {
              fontSize: 20,
              fontWeight: '600',
              textAlign: 'center',
              marginBottom: 24,
              color: currentSlide.gradient[1],
            },
            {
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  }),
                },
              ],
            },
          ]}>
          {currentSlide.subtitle}
        </Animated.Text>

        {/* Description */}
        <Animated.Text
          style={[
            {
              fontSize: 16,
              textAlign: 'center',
              color: '#6B7280',
              lineHeight: 24,
              marginBottom: 48,
            },
            {
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [40, 0],
                  }),
                },
              ],
            },
          ]}>
          {currentSlide.description}
        </Animated.Text>

        {/* Language Selection */}
        <View className="flex-row justify-around w-full">
          {currentSlide.features.map((feature, index) => (
            <Animated.View
              key={feature.label}
              style={[
                {
                  alignItems: 'center',
                },
                {
                  opacity: fadeAnim,
                  transform: [
                    {
                      translateY: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [50 + index * 10, 0],
                      }),
                    },
                  ],
                },
              ]}>
              <TouchableOpacity
                onPress={() => handleLanguageSelect((feature as any).value as 'en' | 'tr')}
                                 className={`mb-2 h-16 w-20 items-center justify-center rounded-2xl border-2 ${
                   selectedLanguage === (feature as any).value
                     ? 'border-black bg-gray-100'
                     : 'border-gray-300 bg-white'
                 }`}>
                 <Ionicons
                   name={feature.icon}
                   size={24}
                   color={selectedLanguage === (feature as any).value ? '#000000' : '#6B7280'}
                />
                <Text
                                     className={`mt-1 text-xs font-semibold ${
                     selectedLanguage === (feature as any).value
                       ? 'text-black'
                       : 'text-gray-600'
                   }`}>
                  {feature.label}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </Animated.View>

      {/* Bottom Section */}
      <View className="px-8" style={{ paddingBottom: insets.bottom  }}>
        {/* Dot Indicator */}
        <View className="flex-row justify-center items-center mb-8">
          <View
            style={{
              height: 8,
              width: 32,
              borderRadius: 4,
              backgroundColor: '#4F46E5',
            }}
          />
        </View>

        {/* Action Button */}
        <TouchableOpacity
          onPress={() => handleLanguageSelect(selectedLanguage)}
          disabled={!selectedLanguage}
          className={`mb-4 rounded-3xl shadow-xl ${!selectedLanguage ? 'opacity-70' : ''}`}
          style={{
            shadowColor: '#4F46E5',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.4,
            shadowRadius: 16,
            elevation: 12,
          }}>
          <View
            className="items-center py-4 rounded-3xl"
            style={{ backgroundColor: currentSlide.gradient[0] }}>
            <View className="flex-row items-center">
              <Text className="mr-2 text-lg font-bold text-white">
                {t('onboarding.continue')}
              </Text>
              <Ionicons
                name="arrow-forward"
                size={20}
                color="white"
              />
            </View>
          </View>
        </TouchableOpacity>

      </View>
    </View>
  );
}
