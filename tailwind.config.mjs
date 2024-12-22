/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			bangla: [
  				'bangla',
  				'sans-serif'
  			],
  			code: [
  				'monaspace-code',
  				'sans-serif'
  			]
  		}
  	}
  },
  plugins: [],
};
