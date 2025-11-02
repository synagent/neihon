/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"] },
      colors: {
        brand: {
          bg: "var(--brand-bg)",
          panel: "var(--brand-panel)",
          ring: "var(--brand-ring)",
          text: "var(--brand-text)",
          mute: "var(--brand-mute)",
          gold: "var(--brand-gold)"
        }
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.06) inset, 0 0 0 1px rgba(255,255,255,0.06) inset, 0 10px 30px rgba(0,0,0,0.45)"
      },
      borderRadius: { "3xl": "1.25rem" }
    }
  },
  plugins: []
};
