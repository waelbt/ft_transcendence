/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'custom-image': "url('../background_image.svg')",
                'custom-blue': 'rgba(113, 199, 216, 0.8)'
            },
            colors: {
                pink: '#f20553',
                'dark-pink': '#9a234b',
                blue: '#304194',
                yellow: '#ffec47'
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
    plugins: []
};
