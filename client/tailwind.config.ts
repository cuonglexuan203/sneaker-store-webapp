import type { Config } from "tailwindcss";

const colors = require("tailwindcss/colors")

const config: Config = {
    content: [
        "node_modules/flowbite-react/lib/esm/**/*.js",
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            
        },
        colors:{
          ...colors,
          primary: colors.black,
          secondary: colors.gray
        },

    },
    plugins: [require('flowbite/plugin')],
};
export default config;
