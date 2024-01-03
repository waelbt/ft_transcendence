import { HiLogout } from 'react-icons/hi';
import { IoMdSettings } from 'react-icons/io';

export const DEFAULT_PATH = './src/assets/images/default';

export const NAV_LINKS = ['Home', 'Chat', 'Rooms', 'Game'];

export const MENU_FIELDS = [
    {
        name: 'Setting & privacy',
        icon: IoMdSettings,
        path: '/profile/me/setting'
    },
    {
        name: 'logout',
        icon: HiLogout,
        path: '/'
    }
];

export const NICKNAME_FIELD = [
    {
        label: 'Nickname',
        type: 'text',
        name: 'nickName',
        validation: {
            required: 'Nickname is required!',
            maxLength: {
                value: 40,
                message: 'Nickname must be less than 40 characters'
            },
            minLength: {
                value: 5,
                message: 'Nickname must be at least 5 characters'
            }
        }
    }
];

// export const SETTING_FIELDS = [
//     {
//         label: 'Nickname',
//         type: 'text',
//         name: 'nickName',
//     },
//     {
//         label: 'Nickname',
//         type: 'text',
//         name: 'nickName',
//     },{
//         label: 'Nickname',
//         type: 'text',
//         name: 'nickName',
//     }
// ];
