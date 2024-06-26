/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
	define: {
		'import.meta.vitest': 'undefined',
	},
	test: {
		include: ['tests/unit/**/*.test.ts'],
		setupFiles: './tests/setup.ts',
		environment: 'happy-dom',
	},
	server: {
		port: 4000,
	},
});
