/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        img1: "url('./src/imgs/img1.png')",
        img2: "url('./src/imgs/img2.png')",
        img3: "url('./src/imgs/img3.png')",
        img4: "url('./src/imgs/img4.png')",
      },
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        customRed: {
          100: "#FFE6E7",
          500: "#E24A33",
        },
        customBlue: {
          100: "#B0E6FA",
          300: "#B0E6FA",
        },
        customSuccess: {
          50: "#25e182",
          100: "#B0F2D9",
          400: "#B0F2D9",
          600: "#007649",
          700: "#007649",
          800: "#007649",
        },
        customError: {
          50: "#eb5757",
          100: "#FBE8E6",
          200: "#FBE8E6",
          300: "#FBE8E6",
          400: "#FBE8E6",
          500: "#E24A33",
          600: "#E24A33",
          700: "#E24A33",
          800: "#E24A33",
        },
        primary2: "#25aae1",
        secondary: "#c10006",
        info: "#096df3",
        warning: {100: "rgb(253 246 178)", 600: "#eabb2d", 700: "#eabb2d"},
        black: "#1d1d1d",
        background: { bg: "rgb(249 250 251 / 1)" },
      },
      width: {
        width20: "20%",
        width40: "40%",
      },
    },
    fontFamily: {
      body: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      sans: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
    },
  },
  // List your classes here, or you can even use RegExp
  //safelist: [/^w-/, "customSuccess", "customError"],
  safelist: [
    {
        pattern: /(bg|text|border)-(red|gray|customSuccess)-300/,
        variants: ['hover'],
    },
    {
      pattern: /(bg|text|border)-(red|green|blue|customSuccess|customError|warning)-(100|200|300|400|500|600|700|800)/,
      variants: ['lg', 'hover', 'focus', 'lg:hover'],
    }
],
  plugins: [
    require("flowbite/plugin"),
    //require('@tailwindcss/forms')
  ],
};
