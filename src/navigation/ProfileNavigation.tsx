import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '@/screens/Profile/Profile';

const Stack = createNativeStackNavigator();

export const ProfileNavigation = () => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};
