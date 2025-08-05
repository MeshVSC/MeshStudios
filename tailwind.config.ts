import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Cube-specific theme colors
				cube: {
					blue: {
						DEFAULT: 'hsl(var(--cube-blue))',
						muted: 'hsl(var(--cube-blue-muted))'
					},
					green: {
						DEFAULT: 'hsl(var(--cube-green))',
						muted: 'hsl(var(--cube-green-muted))'
					},
					purple: {
						DEFAULT: 'hsl(var(--cube-purple))',
						muted: 'hsl(var(--cube-purple-muted))'
					}
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				// Mesh Studios cube animations
				'glitch': {
					'0%': { transform: 'translate(0)', opacity: '1' },
					'10%': { transform: 'translate(-2px, 2px)', opacity: '0.8' },
					'20%': { transform: 'translate(-1px, -1px)', opacity: '0.9' },
					'30%': { transform: 'translate(1px, 2px)', opacity: '0.7' },
					'40%': { transform: 'translate(1px, -1px)', opacity: '0.8' },
					'50%': { transform: 'translate(-1px, 2px)', opacity: '0.6' },
					'60%': { transform: 'translate(-1px, 1px)', opacity: '0.9' },
					'70%': { transform: 'translate(1px, 1px)', opacity: '0.8' },
					'80%': { transform: 'translate(-1px, -1px)', opacity: '0.7' },
					'90%': { transform: 'translate(2px, 1px)', opacity: '0.9' },
					'100%': { transform: 'translate(0)', opacity: '1' }
				},
				'cube-rotate-x': {
					from: { transform: 'rotateX(0deg)' },
					to: { transform: 'rotateX(90deg)' }
				},
				'cube-rotate-y': {
					from: { transform: 'rotateY(0deg)' },
					to: { transform: 'rotateY(90deg)' }
				},
				'cube-float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glitch': 'glitch 0.3s ease-in-out',
				'cube-x': 'cube-rotate-x 1s cubic-bezier(0.4, 0, 0.2, 1)',
				'cube-y': 'cube-rotate-y 1s cubic-bezier(0.4, 0, 0.2, 1)',
				'cube-float': 'cube-float 3s ease-in-out infinite'
			},
			fontFamily: {
				'mono': ['SF Mono', 'Monaco', 'Consolas', 'Roboto Mono', 'monospace'],
				'sans': ['Inter', 'system-ui', 'sans-serif'],
				DEFAULT: ['Inter', 'system-ui', 'sans-serif']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
