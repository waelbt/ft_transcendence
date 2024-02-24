import { create } from 'zustand';
import io, { Socket } from 'socket.io-client';

type ChatState = {
    socket: Socket | null;
		// ! notificaitons []
};

type ChatMethod = {
	initializeNotifSocket: (token: string | null) => void;
};

export const useNotificationStore = create<ChatState & ChatMethod>(
    (set, get) => ({
        socket: null,
        initializeNotifSocket: (token) => {
            const { socket } = get();
            if (token && !socket) {
                const newSocket = io(
                    `${import.meta.env.VITE_BASE_URL}/notification`,
                    {
                        path: '/socket.io',
                        transports: ['websocket'],
                        secure: true,
                        auth: { token: token }
                    }
                );
                set({ socket: newSocket });
            }
        }
    })
);
