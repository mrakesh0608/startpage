import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            colors: {
                tallpoppy: {
                    DEFAULT: "#BB2A2AAA",
                },
                charade: {
                    DEFAULT: "#262432",
                },
                driftwood: {
                    DEFAULT: "#B38C45",
                },
                heather: {
                    DEFAULT: "#B9BFCC",
                },
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;
