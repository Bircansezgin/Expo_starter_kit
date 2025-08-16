import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '@/screens/Auth/Login/login';
import { useAuth } from '../contexts/AuthContext';
import { BottomTabNavigator } from './BottonTabNavigator';
import Register from '@/screens/Auth/Register/register';
import Onboarding from '../screens/Auth/Onboarding';

const Stack = createNativeStackNavigator();

export const AuthNavigation = () => {
  const { user } = useAuth();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      ) : (
        <>
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
};
