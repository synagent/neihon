/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "1.5rem",
        lg: "2rem"
      }
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"],
        heading: ["var(--font-poppins)", "Poppins", "ui-sans-serif", "system-ui"]
      },
      colors: {
        brand: {
          night: "#0A0A0A",
          navy: "#001F3F",
          gold: "#FFD700",
          silver: "#C0C0C0",
          text: "#FFFFFF",
          slate: "#ABB1C5"
        }
      },
      boxShadow: {
        card: "0 35px 120px rgba(0, 15, 25, 0.55)",
        glow: "0 0 50px rgba(255, 215, 0, 0.25)"
      },
      borderRadius: { "4xl": "2.5rem" },
      backgroundImage: {
        "grid-light": "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,0.03) 1px, transparent 1px)"
      },
      backgroundSize: {
        "grid-size": "60px 60px"
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" }
        }
      },
      animation: {
        shimmer: "shimmer 2.4s linear infinite"
      }
    }
  },
  plugins: []
};
