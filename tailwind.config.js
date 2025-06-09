/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}", // App Router kullanıyorsan
        "./pages/**/*.{js,ts,jsx,tsx}", // Pages Router varsa
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-poppins)', 'sans-serif'],
            },
        },
    },
    
    darkMode: "class",
    plugins: [],
};
