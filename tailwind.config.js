/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite-react/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        img1: "url('./src/imgs/img1.png')",
        img2: "url('./src/imgs/img2.png')",
        img3: "url('./src/imgs/img3.png')",
        img4: "url('./src/imgs/img4.png')",
      },
      colors: {
        primary: {
          "50": "#eff6ff",
          "100": "#dbeafe",
          "200": "#bfdbfe",
          "300": "#93c5fd",
          "400": "#60a5fa",
          "500": "#3b82f6",
          "600": "#2563eb",
          "700": "#1d4ed8",
          "800": "#1e40af",
          "900": "#1e3a8a"
        },
        primary2: "#25aae1",
        secondary: "#c10006",
        info: "#096df3",
        success: "#25e182",
        warning: "#eabb2d",
        error: "#eb5757",
        black: "#1d1d1d",
        background: { bg: 'rgb(249 250 251 / 1)' }
      },
      width: {
        width20: '20%',
        width40: '40%'
      }
    },
  },
    // List your classes here, or you can even use RegExp
    safelist: [/^w-/],
  plugins: [
    require('flowbite/plugin'),
    //require('@tailwindcss/forms')
  ],
}
