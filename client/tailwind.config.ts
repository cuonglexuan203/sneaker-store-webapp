import type { Config } from "tailwindcss";

const colors = require("tailwindcss/colors")

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {

        },
        colors: {
            ...colors,
            primary: colors.blue,
            secondary: colors.gray
        },

    },
    plugins: [require('@tailwindcss/forms')],
};
export default config;
