import { HiLogout } from 'react-icons/hi';
import { IoMdSettings } from 'react-icons/io';

export const DEFAULT_PATH = './src/assets/images/default';

export const NAV_LINKS = ['Home', 'Chat', 'Rooms'];

export const MODES = ['classic', 'crazy', 'IA'];

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
        label: '',
        type: 'text',
        name: 'nickName',
        placeholder:
            'Choose something fun and creative that people can call you by',
        validation: {
            required: 'Nickname is required!',
            maxLength: {
                value: 15,
                message: 'Nickname must be less than 15 characters'
            },
            minLength: {
                value: 5,
                message: 'Nickname must be at least 5 characters'
            }
        }
    }
];

// export const ACTIONS_ENDPOINTS: { [key: string]: string } = {
//     'Remove Friend': '/friends/removeFriend/',
//     'Block User': '/users/blockUser/',
//     'Send Request': '/friends/sendFriendRequest/',
//     'Cancel Request': '/users/unblockUser/',
//     'Accept Request': '/friends/acceptFriendRequest/',
//     'Decline Request': '/friends/rejectFriendRequest/'
// };
