import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:4000/chat');

const WebSocket = {
  connect: (): void => {
    socket.connect();
  },

  disconnect: (): void => {
    socket.disconnect();
  },

  sendMessage: (message: string): void => {
    socket.emit('send_message', message);
  },

  onMessage: (callback: (message: string) => void): void => {
    socket.on('receive_message', callback);
  },
};

export default WebSocket;