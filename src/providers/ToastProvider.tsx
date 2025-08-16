import React from 'react';
import ToastManager from 'toastify-react-native';

const ToastProvider = () => {
  return (
    <ToastManager
      width="90%"
      minHeight={70}
      theme="light"
      position="top"
      duration={3000}
      animationStyle="slide"
      icons={{
        success: 'checkmark-circle',
        error: 'close-circle',
        info: 'information-circle',
        warn: 'warning',
        default: 'notifications',
      }}
      iconFamily="Ionicons"
      iconSize={24}
      style={{
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
      }}
    />
  );
};

export default ToastProvider;
