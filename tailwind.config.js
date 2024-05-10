/** @type {import('tailwindcss').Config} */
//Change default sizes to use rem (rem is 1px = 1rem)
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Axiforma", "sans-serif"],
      },
      fontSize: {
        xs: "12rem",
        sm: "14rem",
        base: "16rem",
        lg: "18rem",
        xl: "20rem",
        "2xl": "24rem",
        "3xl": "30rem",
        "4xl": "36rem",
        "5xl": "48rem",
        "6xl": "64rem",
        "7xl": "80rem",
        "8xl": "96rem",
        "9xl": "128rem",
      },
      spacing: {
        0: "0rem",
        1: "4rem",
        2: "8rem",
        3: "12rem",
        4: "16rem",
        5: "20rem",
        6: "24rem",
        7: "28rem",
        8: "32rem",
        9: "36rem",
        10: "40rem",
        11: "44rem",
        12: "48rem",
        14: "56rem",
        16: "64rem",
        20: "80rem",
        24: "96rem",
        28: "112rem",
        32: "128rem",
        36: "144rem",
        40: "160rem",
        44: "176rem",
        48: "192rem",
        52: "208rem",
        56: "224rem",
        60: "240rem",
        64: "256rem",
        72: "288rem",
        80: "320rem",
        96: "384rem",
      },
      borderRadius: {
        none: "0rem",
        sm: "2rem",
        DEFAULT: "4rem",
        md: "6rem",
        lg: "8rem",
        full: "9999rem",
        large: "12rem",
      },
    },
  },
  plugins: [],
};
