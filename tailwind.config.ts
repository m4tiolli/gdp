import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        azul: "#38457a",
        vermelho: "#d84c4c"
      },
      backgroundImage: {
        'pattern': "url('/pattern.svg')"
      },
    },
  },
  plugins: [],
};
export default config;
