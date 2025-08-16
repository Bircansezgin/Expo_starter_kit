import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'nativewind';
import { StorageService } from '@/hooks/storage';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>('system');
  const colorScheme = useColorScheme(); 
  useEffect(() => {
    const loadSavedTheme = async () => {
      try {
        const savedTheme = await StorageService.getItem('theme') as Theme;
        if (savedTheme) {
          setThemeState(savedTheme);
          // NativeWind colorScheme ayarla
          if (savedTheme === 'system') {
            colorScheme.setColorScheme('system');
          } else {
            colorScheme.setColorScheme(savedTheme);
          }
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };
    
    loadSavedTheme();
  }, []);

  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme);
    
    // NativeWind colorScheme güncelle
    if (newTheme === 'system') {
      colorScheme.setColorScheme('system');
    } else {
      colorScheme.setColorScheme(newTheme);
    }

    try {
      await StorageService.setItem('theme', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // NativeWind'in colorScheme kullanıyoruz, bu yüzden isDark artık gerekmeyebilir
  // Ama uyumluluk için tutuyoruz
  const isDark = colorScheme.colorScheme === 'dark';

  const value: ThemeContextType = {
    theme,
    isDark,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
