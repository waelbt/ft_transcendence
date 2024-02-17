import { HiLogout } from 'react-icons/hi';
import { IoMdSettings } from 'react-icons/io';

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

export const MAX_MESSAGE_LENGTH = 280;

export const VISIBILTYOPTIONS = ['PRIVATE', 'PUBLIC', 'PROTECTED'];

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
                value: 10,
                message: 'Nickname must be less than 10 characters'
            },
            minLength: {
                value: 3,
                message: 'Nickname must be at least 3 characters'
            }
        }
    }
];

export const ACTIONS_ENDPOINTS: { [key: string]: string } = {
    'Remove Friend': `/friends/removeFriend/`,
    'Block User': `/users/blockUser/`,
    'Send Request': `/friends/sendFriendRequest/`,
    'Cancel Request': `/friends/removeSentFriendRequest/`,
    'Accept Request': `/friends/acceptFriendRequest/`,
    'Decline Request': `/friends/rejectFriendRequest/`
};

export const ACTION_TO_KNOW_RELATION: { [key: string]: string } = {
    'Remove Friend': 'not friend',
    'Block User': 'blocked',
    'Send Request': 'invitation sender',
    'Cancel Request': 'not friend',
    'Accept Request': 'friend',
    'Decline Request': 'not friend'
};
