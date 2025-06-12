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
        sans: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        foreground: "#ccd6f6",
        background: rgb(15, 23, 42),
        secondary: "#8892b0",
        accent: "#5eead4",
        border: "#233554",
      },
    },
  },

  darkMode: "class",
  plugins: [],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};
