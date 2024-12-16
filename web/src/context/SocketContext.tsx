import React, { createContext, useContext, useEffect } from 'react';
import { socketService } from '@/services/socket';

const SocketContext = createContext(null);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Connect the socket when the provider mounts
    socketService.connect();

    return () => {
      // Disconnect the socket when the provider unmounts
      socketService.disconnect();
    };
  }, []);
  return (
    <SocketContext.Provider value={socketService as any}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => {
  return useContext(SocketContext);
};
