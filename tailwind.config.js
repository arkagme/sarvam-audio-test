/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Dark Mode Theme (Grey/Blue)
        background: {
          primary: "#0f1419",
          secondary: "#1a1f2e",
          tertiary: "#252d3d",
          hover: "#2d3548",
        },
        border: {
          DEFAULT: "#394150",
          light: "#4a5568",
        },
        text: {
          primary: "#e8eaed",
          secondary: "#a0a6b1",
          tertiary: "#6c7380",
        },
        accent: {
          primary: "#4a9eff",
          hover: "#3d8ce7",
          active: "#2e7ad3",
        },
        success: "#00d4aa",
        warning: "#ffb020",
        error: "#ff4d4f",
        info: "#5b9fff",
      },
      spacing: {
        xxxs: "2px",
        xxs: "4px",
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "40px",
        "3xl": "48px",
        "4xl": "64px",
        "5xl": "80px",
        "6xl": "96px",
      },
      borderRadius: {
        xs: "2px",
        sm: "4px",
        md: "6px",
        lg: "8px",
        xl: "12px",
        "2xl": "16px",
        "3xl": "24px",
      },
    },
  },
  plugins: [],
};
