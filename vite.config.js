import { defineConfig } from 'vite';
import { resolve } from 'path';
import path from 'path';

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
			},
		},
	},
	css: {
		preprocessorOptions: {
			scss: {},
		},
	},
	publicDir: 'public',
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
