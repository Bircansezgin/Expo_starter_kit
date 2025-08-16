import React, { useContext, useEffect, useRef } from 'react';
import { Animated, Platform, StatusBar, Text, View } from 'react-native';
import { NetworkContext } from '../contexts/NetworkContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';

const NoNetworkBanner = () => {
  const { isConnected } = useContext(NetworkContext);
  const { t } = useTranslation();
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isConnected) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: Platform.OS === 'android' ? StatusBar.currentHeight || 40 : 40,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isConnected]);

  if (isConnected) return null;

  return (
    <Animated.View
      className="absolute left-4 right-4 z-50"
      style={{
        transform: [{ translateY }],
        opacity,
      }}>
      <LinearGradient
        colors={['#EF4444', '#DC2626']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="mt-10 flex-row items-center justify-between rounded-2xl px-4 py-4 shadow-lg">
        <View className="flex-1 flex-row items-center">
          <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-white/20">
            <Ionicons name="wifi-outline" size={18} color="white" />
          </View>
          <Text className="flex-1 text-base font-semibold text-white">{t('noNetwork')}</Text>
        </View>

        <View className="ml-2">
          <Ionicons name="alert-circle" size={24} color="white" />
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

export default NoNetworkBanner;
