/**
 * @descr:
 * @author: Tony
 * */

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'star-twinkle': 'twinkle 8s infinite ease-in-out',
                'nebula-float': 'float 20s infinite linear',
            },
            keyframes: {
                twinkle: {
                    '0%, 100%': { opacity: '0.6' },
                    '50%': { opacity: '1' },
                },
                float: {
                    '0%': { transform: 'translate(0, 0)' },
                    '50%': { transform: 'translate(-20px, -20px)' },
                    '100%': { transform: 'translate(0, 0)' },
                },
            },
        },
    },
    plugins: [],
}