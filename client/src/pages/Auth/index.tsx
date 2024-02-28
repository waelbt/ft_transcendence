import { useEffect, useRef } from 'react';
import { GoogleIcon, IntraIcon } from '../../assets/custom-icons';
import useAuthPopup from '../../hooks/authPopupHook';
import { useChatLayoutStore } from '../../stores/chatLayoutStore';
import useGameStore from '../../stores/gameStore';
import { useNotificationStore } from '../../stores/notiSocketfStore';

export const Auth = () => {
    const popupRef = useRef<Window | null>(null);
    // const { socket: chatSocket } = useChatLayoutStore();
    // const { socket: gameSocket } = useGameStore();
    // const { socket } = useNotificationStore();
    const openPopup = (url: string) => {
        popupRef.current = window.open(
            url,
            'authPopup',
            'width=600,height=600'
        );
    };
    useAuthPopup();

    // useEffect(() => {
    //     socket?.close();
    //     chatSocket?.close();
    //     gameSocket?.close();
    // }, [socket, chatSocket, gameSocket]);

    return (
        <div className="flex">
            <div className="w-40% lg:w-1/3 h-screen overflow-hidden bg-auth-sidebar-image bg-cover bg-no-repeat"></div>
            <div className="bg-white flex flex-col w-full lg:w-1/2 justify-center items-start m-20 p-4">
                <div className="flex flex-col items-start gap-8 w-full max-w-xs">
                   
                    <div className="py-2 flex flex-col items-center gap-3 w-full">
                        
                        
                        <a
                            className="w-full py-5 bg-white rounded-full cursor-pointer flex justify-center items-center gap-2.5 border border-black hover:opacity-60 transition-opacity hover:bg-gray-100 px-4"
                            onClick={() => {
                                openPopup(
                                    `${import.meta.env.VITE_BASE_URL}/auth/42`
                                );
                            }}
                        >
                            <IntraIcon />
                            <span className="font-mona text-black text-sm font-semibold">
                                Continue with Intra
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
