'use client';

import { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { TabBarButton } from './TabBarButton';
import { useTabBarVisibility } from '../providers/TabBarVisibilityContext';

export const TabBar = ({
  state,
  descriptors,
  navigation,
}: {
  state: any;
  descriptors: any;
  navigation: any;
}) => {
  const { isVisible } = useTabBarVisibility();
  const [fadeAnim] = useState(new Animated.Value(isVisible ? 1 : 0));
  const [translateYAnim] = useState(new Animated.Value(isVisible ? 0 : 100)); // Start off-screen

  useEffect(() => {
    Animated.spring(translateYAnim, {
      toValue: isVisible ? 0 : 100,
      useNativeDriver: true,
      friction: 8,
    }).start();
    Animated.timing(fadeAnim, {
      toValue: isVisible ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isVisible, fadeAnim, translateYAnim]);

  const primaryColor = '#000000';
  const greyColor = '#9E9E9E';

  return (
    <View
      style={[
        styles.container,
        { pointerEvents: isVisible ? 'auto' : 'none' },
      ]}>
      <Animated.View
        style={[
          styles.tabbar,
          {
            opacity: fadeAnim,
            transform: [{ translateY: translateYAnim }],
          },
        ]}>
        {state.routes.map((route: any, index: any) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          if (['_sitemap', '+not-found'].includes(route.name)) return null;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TabBarButton
              key={route.name}
              onPress={onPress}
              onLongPress={onLongPress}
              isFocused={isFocused}
              tabBarIcon={options.tabBarIcon}
              color={isFocused ? primaryColor : greyColor}
              label={label}
            />
          );
        })}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  tabbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginBottom: 0,
    paddingVertical: 0,
    paddingHorizontal: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 5,
    height: 70,
    width: '100%',
  },
});