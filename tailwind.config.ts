import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      'LINESeedSansTH_W_Bd': ['LINESeedSansTH_W_Bd', 'sans-serif'],
      'LINESeedSansTH_W_He': ['LINESeedSansTH_W_He', 'sans-serif'],
      'LINESeedSansTH_W_Rg': ['LINESeedSansTH_W_Rg', 'sans-serif'],
      'LINESeedSansTH_W_Th': ['LINESeedSansTH_W_Th', 'sans-serif'],
      'LINESeedSansTH_W_XBd': ['LINESeedSansTH_W_XBd', 'sans-serif'], 
    },
    extend: {
    },
  },
  plugins: [],
};
export default config;
