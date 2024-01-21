/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'auth-sidebar-image': "url('../auth-sidebar-image.jpg')",
                'footer-image': "url('../footer-image.jpg')",
                'pong-table-image': "url('../PongTable.png')"
            },
            boxShadow: {
                custom: '0 0 80px rgba(0, 0, 0, 1)' // Custom shadow with blur 80
            },
            fontSize: {
                custom: [
                    '24px',
                    {
                        lineHeight: '29px'
                    }
                ]
            },
            fontFamily: {
                mona: [
                    '"Mona Sans"',
                    'Helvetica Neue',
                    'Helvetica',
                    'Arial',
                    'sans-serif'
                ],
                lemonada: ["'Lemonada'"],
                sans: ['Open Sans'],
                'sans-italic': ['Open Sans Italic']
            },
            colors: {
                'primary-pink': '#f20553',
                'primary-white': '#F9F9F9'
            }
        }
    },
    plugins: []
};
