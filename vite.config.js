import { defineConfig } from 'vite';
import { resolve } from 'path';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [tsconfigPaths()],
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
