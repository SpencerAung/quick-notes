/** @type {import('tailwindcss').Config} */

/**
  * NOTE:
  * If you use string interpolation or concatenate partial class names together,
  * Tailwind will not find them and therefore will not generate the corresponding CSS.
  * https://tailwindcss.com/docs/content-configuration#class-detection-in-depth
  * https://tailwindcss.com/docs/content-configuration#dynamic-class-names
  */
const colors = require('tailwindcss/colors');
const colorSafeList = [];

for (const key in colors) {
  [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].forEach(colorValue => {
    colorSafeList.push(`text-${key}-${colorValue}`);
    colorSafeList.push(`bg-${key}-${colorValue}`);
    colorSafeList.push(`border-${key}-${colorValue}`);
  });
}

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: colorSafeList,
  theme: {
    extend: {},
  },
  plugins: [],
}
