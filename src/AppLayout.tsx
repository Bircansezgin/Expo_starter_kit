import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigation } from '../src/navigation/AuthNavigation';
import { NetworkProvider } from './providers/NetworkProvider';
import { TabBarVisibilityProvider } from './providers/TabBarVisibilityContext';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ToastProvider from './providers/ToastProvider';

import '../localization/i18n';
import NoNetworkBanner from './components/NoNetworkBanner';

export default function AppLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
          <AuthProvider>
            <NetworkProvider>
              <TabBarVisibilityProvider>
                <NoNetworkBanner />
                <NavigationContainer>
                  <AuthNavigation />
                </NavigationContainer>
                <ToastProvider />
              </TabBarVisibilityProvider>
            </NetworkProvider>
          </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
