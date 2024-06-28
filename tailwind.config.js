/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            keyframes: {
                spin: {
                    from: { transform: 'rotate(0deg)' },
                    to: { transform: 'rotate(-360deg)' },
                },
            },
            fontSize: {
                '4xl': '32px',
            },
            colors: {
                'b-light': '#CED2D6',
                primary: {
                    DEFAULT: '#FF5500',
                    hover: '#E94E00',
                },
                secondary: '#333333',
                bg: '#EDEDED',
                font: {
                    secondary: '#ABABAB',
                    primary: '#1B1F23',
                },
            },
        },
    },
    plugins: [],
};
