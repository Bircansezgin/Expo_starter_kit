import { Pressable, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export const TabBarButton = (props: any) => {
  const { isFocused, tabBarIcon, color } = props;

  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, {
      damping: 12,
      stiffness: 90,
    });
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.1]);
    const top = interpolate(scale.value, [0, 1], [0, -5]);

    return {
      transform: [{ scale: scaleValue }],
      top,
    };
  });

  const animatedCircleStyle = useAnimatedStyle(() => {
    const circleScale = interpolate(scale.value, [0, 1], [0, 1]);
    const opacity = interpolate(scale.value, [0, 1], [0, 1]);

    return {
      transform: [{ scale: circleScale }],
      opacity,
    };
  });

  return (
    <Pressable {...props} style={styles.container}>
      <Animated.View style={[styles.focusCircle, animatedCircleStyle]}>
        <LinearGradient
          colors={['#333333', '#000000']}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
      </Animated.View>
      <Animated.View style={animatedIconStyle}>
        {tabBarIcon &&
          tabBarIcon({
            color: isFocused ? 'white' : color,
            focused: isFocused,
            size: 26,
          })}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  focusCircle: {
    position: 'absolute',
    width: 50,
    height: 50,

    alignItems: 'center',
    top: -15,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  gradient: {
    width: '100%',
    height: '100%',
    borderRadius: 27.5,
  },
});
