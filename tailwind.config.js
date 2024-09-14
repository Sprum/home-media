/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            boxShadow:{
                'teal-sd': '0 4px 4px rgba(4, 47, 46, 0.6)'
            }
        },
    },
    plugins: [],
}

