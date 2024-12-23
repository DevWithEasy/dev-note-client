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
		backgroundImage : {
			'paper' : "url('/image/paper_bg.jpg')",
		  },
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
