import { HiLogout } from 'react-icons/hi';
import { IoMdSettings } from 'react-icons/io';

export const DEFAULT_PATH = './src/assets/images/default';

export const NAV_LINKS = ['Home', 'Profile', 'Chat', 'Rooms', 'Game'];

export const MENU_FIELDS = [
    {
        name: 'Setting & privacy',
        icon: IoMdSettings,
        path: '/profile/setting'
    },
    {
        name: 'logout',
        icon: HiLogout,
        path: '/'
    }
];
