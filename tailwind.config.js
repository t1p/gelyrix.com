/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				paper: '#f6fbf8',
				ink: '#0b1f1a',
				moss: '#2f7c6d',
				evergreen: '#0f766e',
				clay: '#c7d7d0',
				mist: '#e1eeea',
				sun: '#be3455',
				tide: '#155e75'
			},
			fontFamily: {
				sans: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				serif: ['"Spectral"', 'ui-serif', 'Georgia', 'serif']
			},
			boxShadow: {
				soft: '0 24px 60px -36px rgba(15, 23, 42, 0.45)',
				lift: '0 28px 70px -38px rgba(15, 23, 42, 0.58)'
			},
			keyframes: {
				'fade-up': {
					'0%': { opacity: '0', transform: 'translateY(16px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'float-slow': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				}
			},
			animation: {
				'fade-up': 'fade-up 0.6s ease-out both',
				'float-slow': 'float-slow 7s ease-in-out infinite'
			}
		}
	},
	plugins: []
};
