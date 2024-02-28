import { FC, useEffect, useState } from 'react';
import { IoMdImages } from 'react-icons/io';
import { CiImageOff } from 'react-icons/ci';
import { useNotificationStore } from '../stores/notiSocketfStore';
import useGameStore from '../stores/gameStore';
import { useUserStore } from '../stores/userStore';

export type UserStatus = 'online' | 'offline' | 'inGame';

interface AvatarProps {
    imageUrl: string | null | undefined;
    userStatus?: 'online' | 'offline' | 'inGame';
    avatarUserId?: string;
    style?: string;
    isloading?: boolean;
    error?: boolean;
}

const Avatar: FC<AvatarProps> = ({
    imageUrl,
    userStatus,
    style,
    avatarUserId,
    isloading,
    error
}) => {
    const statusColor = {
        online: 'bg-green-500',
        offline: 'bg-gray-500',
        inGame: 'bg-orange-500'
    };
    const {id} = useUserStore()
    const { socket } = useNotificationStore();
    const { socket: gameSocket } = useGameStore();
    const [currentState, setCurrentState] = useState<
        'online' | 'offline' | 'inGame' | undefined
    >(userStatus);
    useEffect(() => {
        if (currentState && id !== avatarUserId ) {
            if (!socket) return;
            if (!gameSocket) return;

            const stateListenner = ({
                userId,
                status
            }: {
                userId: string;
                status: 'online' | 'offline' | 'inGame';
            }) => {
                if (userId === avatarUserId) setCurrentState(status);
            };
            socket.on('userStatusChange', stateListenner);
            gameSocket.on('userStatusChange', stateListenner);
            return () => {
                gameSocket.off('userStatusChange', stateListenner);
                socket.off('userStatusChange', stateListenner);
            };
        }
    }, []);

    return (
        <div
            className={`relative inline-block rounded-full cursor-pointer ${style} ${
                imageUrl
                    ? 'border-none'
                    : 'border-2 border-dashed border-gray-400'
            }`}
            style={
                imageUrl
                    ? {
                          backgroundImage: `url(${imageUrl})`,
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat'
                      }
                    : {}
            }
        >
            {!imageUrl ? (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {!error ? (
                        <IoMdImages className="text-stone-600" size={28} />
                    ) : (
                        <CiImageOff className="text-stone-600" size={28} />
                    )}
                </div>
            ) : (
                currentState && (
                    <span
                        className={`absolute bottom-[10%] right-[10%] block rounded-full ${(id !== avatarUserId) ? statusColor[currentState] : ''} shadow-solid `}
                        style={{
                            width: '23%',
                            height: '23%',
                            transform: 'translate(50%, 50%)'
                        }}
                    ></span>
                )
            )}
            {isloading && <div className="loading-overlay"></div>}
        </div>
    );
};

export default Avatar;
