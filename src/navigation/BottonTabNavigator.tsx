import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { TabBar } from './Tabbar';
import { HomeNavigation } from './HomeNavigation';
import { ProfileNavigation } from './ProfileNavigation';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          tabBarLabel: t('HomeTab'),
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialCommunityIcons
              name={focused ? 'home-variant' : 'home-variant-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />

<Tab.Screen
        name="Profile"
        component={ProfileNavigation}
        options={{
          tabBarLabel: t('ProfileTab'),
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialCommunityIcons
              name={focused ? 'account' : 'account-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />

<Tab.Screen
        name="Profilec"
        component={ProfileNavigation}
        options={{
          tabBarLabel: t('ProfileTab'),
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialCommunityIcons
              name={focused ? 'account' : 'account-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />

<Tab.Screen
        name="Profilb"
        component={ProfileNavigation}
        options={{
          tabBarLabel: t('ProfileTab'),
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialCommunityIcons
              name={focused ? 'account' : 'account-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />

<Tab.Screen
        name="Profilea"
        component={ProfileNavigation}
        options={{
          tabBarLabel: t('ProfileTab'),
          tabBarIcon: ({ color, focused, size }) => (
            <MaterialCommunityIcons
              name={focused ? 'account' : 'account-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />


    
    </Tab.Navigator>
  );
};
