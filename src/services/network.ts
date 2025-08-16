import NetInfo from '@react-native-community/netinfo';


interface NetworkState {
  isConnected: boolean;
  type: string | null;
  isInternetReachable: boolean;
}

export class NetworkService {
  static async isConnected(): Promise<boolean> {
    try {
      const netInfo = await NetInfo.fetch();
      return netInfo.isConnected ?? false;
    } catch (error) {
      console.error('Error checking network connectivity:', error);
      return false;
    }
  }

  static async getNetworkState(): Promise<NetworkState> {
    try {
      const netInfo = await NetInfo.fetch();
      return {
        isConnected: netInfo.isConnected ?? false,
        type: netInfo.type || null,
        isInternetReachable: netInfo.isInternetReachable ?? true,
      };
    } catch (error) {
      console.error('Error getting network state:', error);
      return {
        isConnected: false,
        type: null,
        isInternetReachable: false,
      };
    }
  }

  static subscribe(callback: (state: NetworkState) => void): () => void {
    const unsubscribe = NetInfo.addEventListener((state) => {
      callback({
        isConnected: state.isConnected ?? false,
        type: state.type || null,
        isInternetReachable: state.isInternetReachable ?? true,
      });
    });

    return unsubscribe;
  }

  static async waitForConnection(timeout: number = 10000): Promise<boolean> {
    return new Promise((resolve) => {
      const timeoutId = setTimeout(() => {
        unsubscribe();
        resolve(false);
      }, timeout);

      const unsubscribe = this.subscribe((state) => {
        if (state.isConnected) {
          clearTimeout(timeoutId);
          unsubscribe();
          resolve(true);
        }
      });
    });
  }
}
