/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'auth-sidebar-image': "url('../auth-sidebar-image.jpg')",
                'footer-image': "url('../footer-image.jpg')"
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
                'sans-italic': ['Open Sans Italic'],
            }
        }
    },
    plugins: []
};

// /** @type {import('tailwindcss').Config} */

// module.exports = {
//     content: ['./src/**/*.{js,jsx,ts,tsx}'],
//     theme: {
//         extend: {
//             backgroundImage: {
//                 primary: "url('../primary.svg')",
//                 secondary: "url('../secondary.jpeg')",
//                 'sidebar-img1': "url('./src/assets/sidebarImage1.png')",
//                 'sidebar-img2': "url('./src/assets/sidebarImage2.png')"
//             },
//             backgroundColor: { 'blue-opacity-70': 'rgba(113, 199, 216, 0.7)' },
//             colors: {
//                 pink: '#f20553',
//                 'dark-pink': '#9a234b',
//                 'primary-blue': '#304194',
//                 yellow: '#ffec47',
//                 'primary-blue-40': 'rgba(var(--primary-blue), 0.4)',
//                 'blue-opacity-80': 'rgba(113, 199, 216, 0.8)',
//                 'dark-blue': '#171E30',
//                 'teal-blue': '#008D90'
//             },
//             fontFamily: {
//                 BombSound: ['The Bomb Sound', 'sans-serif'],
//                 Acme: ['Acme', 'sans-serif'],
//                 Inter: ['Inter', 'sans-serif']
//             },
//             boxShadow: {
//                 custom: '0.625rem 1.25rem 0.5rem 0rem rgba(0, 0, 0, 0.2)'
//             },
//             // spacing: {
//             //     4.5: '18px' // Add custom spacing for 18px
//             // },
//             borderRadius: {
//                 custom: '2.9375rem'
//             },
//             width: {
//                 7.5: '1.875rem'
//             },
//             strokeWidth: {
//                 2: '2'
//             }
//         }
//     },
//     // require('daisyui')
//     plugins: [textShadowPlugin]
// };
