/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          blue: "#0a192f",      // Deepest blue background
          navy: "#172a45",      // Intermediate navy card background
          lightNavy: "#30475e", // Lighter slate navy
          orange: "#f97316",    // Accent orange
          orangeHover: "#ea580c",
          textNavy: "#0f172a"
        }
      },
    },
  },
  plugins: [],
};
