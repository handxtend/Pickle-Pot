
import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0e1628',
        lime: '#b6d43c'
      },
      borderRadius: { '2xl': '1rem' }
    }
  },
  plugins: []
}
export default config
