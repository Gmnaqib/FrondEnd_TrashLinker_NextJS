import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: "#253745", // Warna biru khusus
        customGray: "#F2F2F2", // Warna abu-abu khusus
        customGreen: "#32C36C", // Warna hijau khusus
      },
    },
  },
  plugins: [],
} satisfies Config;
