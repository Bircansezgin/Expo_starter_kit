/* eslint-disable import/prefer-default-export */
import { createContext } from 'react';

interface NetworkContextType {
  isConnected: boolean;
}

export const NetworkContext = createContext<NetworkContextType>({
  isConnected: true,
});
