/** @type {import('tailwindcss').Config} */

const textShadowPlugin = function ({ addUtilities }) {
    const newUtilities = {
        '.text-shadow-custom': {
            textShadow:
                '0rem 0rem 0rem #f4ebff, 0rem 0.0625rem 0.125rem rgba(16, 24, 40, 0.05)'
        }
    };
    addUtilities(newUtilities, ['responsive', 'hover']);
};

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'custom-image': "url('../background_image.svg')"
            },
            backgroundColor: { 'blue-opacity-80': 'rgba(113, 199, 216, 0.7)' },
            colors: {
                pink: '#f20553',
                darkPink: '#9a234b',
                PrimaryBlue: '#304194',
                yellow: '#ffec47',
                'primary-blue-40': 'rgba(var(--primary-blue), 0.4)'
            },
            fontFamily: {
                BombSound: ['The Bomb Sound', 'sans-serif'],
                Acme: ['Acme', 'sans-serif'],
                Inter: ['Inter', 'sans-serif']
            },
            boxShadow: {
                custom: '0.625rem 1.25rem 0.5rem 0rem rgba(0, 0, 0, 0.2)'
            },
            // spacing: {
            //     'custom-gap': '0.625rem'
            // },
            borderRadius: {
                custom: '2.9375rem'
            },
            width: {
                7.5: '1.875rem'
            }
        }
    },
    plugins: [textShadowPlugin]
};
