/* eslint-disable */
import React, { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { NetworkContext } from '../contexts/NetworkContext';

export const NetworkProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected || false);
    });

    // Return the function to unsubscribe
    return () => unsubscribe();
  }, []);

  return <NetworkContext.Provider value={{ isConnected }}>{children}</NetworkContext.Provider>;
};
