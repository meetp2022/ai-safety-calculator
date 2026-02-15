import type { Config } from "tailwindcss";

const config: Config = {
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
                "neon-cyan": "#00f3ff",
                "neon-pink": "#f0f",
                "neon-green": "#39ff14",
                "neon-yellow": "#fff01f",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
            },
            animation: {
                "aurora": "aurora 20s linear infinite",
                "fade-in": "fade-in 1s ease-out forwards",
                "slide-up": "slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
            keyframes: {
                aurora: {
                    "0%, 100%": { transform: "translate(0, 0) scale(1)" },
                    "25%": { transform: "translate(10%, 10%) scale(1.1)" },
                    "50%": { transform: "translate(-5%, 20%) scale(0.9)" },
                    "75%": { transform: "translate(-15%, -10%) scale(1.05)" },
                },
                "fade-in": {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                "slide-up": {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
