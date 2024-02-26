import { create } from 'zustand';
import io, { Socket } from 'socket.io-client';
import { NotificationDto } from '../../../shared/types';

type ChatState = {
    socket: Socket | null;
    notifications: NotificationDto[];
    // ! notificaitons []
};

type ChatMethod = {
    pushNotification: (notif: NotificationDto) => void;
    unpushNotification: (id: number) => void;
    initializeNotifSocket: (token: string | null) => void;
    disconnectSocket: () => void;
};

export const useNotificationStore = create<ChatState & ChatMethod>(
    (set, get) => ({
        socket: null,
        notifications: [],
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
        },
        pushNotification: (notif) => {
            const { notifications } = get();

            // Check if a notification with the same ID already exists
            const existingNotification = notifications.find(
                (n) => n.id === notif.id
            );

            // If no existing notification is found, add the new notification
            if (!existingNotification) {
                const newNotification = [...notifications, notif];
                set({ notifications: newNotification });
            }
        },
        unpushNotification: (id) => {
            const { notifications } = get();
            const filteredRooms = notifications.filter(
                (notif) => notif.id !== id
            );
            set({ notifications: filteredRooms });
        },
        disconnectSocket: () => {
            const { socket } = get();
            if (socket) {
                socket.disconnect();
                set({ socket: null });
            }
        }
    })
);
