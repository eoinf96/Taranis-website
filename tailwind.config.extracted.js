/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
      "primary": {},
      "secondary": {},
      "neutral": {
            "100": "rgb(33, 37, 41)",
            "200": "rgb(255, 255, 255)",
            "300": "rgb(222, 135, 63)",
            "400": "rgba(0, 0, 0, 0.55)",
            "500": "rgb(0, 0, 0)",
            "600": "rgb(220, 53, 69)",
            "700": "rgb(108, 117, 125)",
            "800": "rgba(0, 0, 0, 0.6)",
            "900": "rgb(151, 163, 170)",
            "1000": "rgba(255, 255, 255, 0.6)",
            "1100": "rgb(211, 211, 211)",
            "1200": "rgb(229, 227, 223)",
            "1300": "rgba(0, 0, 0, 0.59)",
            "1400": "rgb(13, 110, 253)",
            "1500": "rgb(245, 245, 245)",
            "1600": "rgb(249, 249, 249)",
            "1700": "rgb(248, 249, 250)",
            "1800": "rgb(248, 248, 248)"
      },
      "semantic": {
            "success": "#10b981",
            "warning": "#f59e0b",
            "error": "#ef4444",
            "info": "#3b82f6"
      }
},
      fontFamily: {
      "sans": "Inter, Arial, sans-serif",
      "serif": "Georgia, serif",
      "mono": "Monaco, monospace"
},
      fontSize: {
      "xs": "10px",
      "sm": "11px",
      "base": "11.2px",
      "lg": "12.8px",
      "xl": "14px",
      "2xl": "18px",
      "3xl": "19.2px",
      "4xl": "20px",
      "5xl": "22px",
      "6xl": "25px",
      "11xl": "32px",
      "12xl": "46px"
},
      fontWeight: {
      "normal": "400",
      "medium": "500",
      "semibold": "600",
      "bold": "700"
},
      lineHeight: {
      "tight": "1.25",
      "normal": "1.5",
      "loose": "1.75"
},
      spacing: {
      "1": "0.0625rem",
      "2": "0.1875rem",
      "3": "0.21875rem",
      "4": "0.25rem",
      "5": "0.3125rem",
      "6": "0.375rem",
      "7": "0.5rem",
      "8": "0.625rem",
      "9": "0.75rem",
      "10": "0.9375rem",
      "11": "1rem",
      "12": "1.25rem",
      "13": "1.5rem",
      "14": "1.75rem",
      "15": "2rem",
      "16": "3rem",
      "17": "3.375rem",
      "18": "4.375rem",
      "19": "5.89550625rem",
      "20": "7rem"
},
      borderRadius: {
      "none": "0px",
      "sm": "0.125rem",
      "md": "0.375rem",
      "lg": "0.5rem",
      "xl": "0.75rem",
      "full": "9999px"
},
      boxShadow: {
      "sm": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      "md": "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      "lg": "0 10px 15px -3px rgb(0 0 0 / 0.1)",
      "xl": "0 20px 25px -5px rgb(0 0 0 / 0.1)"
}
    },
  },
  plugins: [],
}