// TabBarVisibilityContext.js
import React, { createContext, useContext, useState } from 'react';

interface TabBarVisibilityContextType {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

const TabBarVisibilityContext = createContext<TabBarVisibilityContextType>({
  isVisible: true,
  setIsVisible: () => {},
});

export const useTabBarVisibility = () => useContext(TabBarVisibilityContext);

export const TabBarVisibilityProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <TabBarVisibilityContext.Provider value={{ isVisible, setIsVisible }}>
      {children}
    </TabBarVisibilityContext.Provider>
  );
};
