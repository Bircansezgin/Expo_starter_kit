import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home/Home';

const Stack = createNativeStackNavigator();

export const HomeNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
