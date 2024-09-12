import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        ".wrapper-container": {
          "@apply max-w-screen-2xl mx-auto w-full": {},
        },
      });
    }),
  ],
};
export default config;
