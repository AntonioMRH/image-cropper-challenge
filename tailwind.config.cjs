/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,tsx,ts}", "./index.html"],
	theme: {
		extend: {
			fontFamily: {
				inter: ["inter", "serif"],
			},
		},
		colors: {
			white: "#FFFFFF",
			gray: "#677489",
			"gray-100": "#F2F5F8",
			"gray-200": "#C7CDD3",
			"gray-300": "#C3CBD5",
			"orange-error": "#C64D32",
			"blue-600": "#495567",
			"blue-700": "#3D485F",
		},
	},
	plugins: [],
}
