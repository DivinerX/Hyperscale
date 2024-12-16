import WebSocket from 'ws'; // Import WebSocket

const API_URL = import.meta.env.VITE_BYBIT_API_URL;

const bybitService = {
  async getCoinPrice(symbol: string) {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(`${API_URL}?symbol=${symbol}USD`); // Use native WebSocket

      ws.onopen = () => {
        console.log('WebSocket connection opened');
      };

      ws.onmessage = (event) => {
        const response = JSON.parse(event.data as string);
        if (response.retCode === 0) {
          resolve(response.result.lastPrice); // Resolve with last price
        } else {
          reject(new Error(response.retMsg));
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        reject(error);
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
      };
    });
  },
};

export default bybitService; 