import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import json from '@rollup/plugin-json';

import pkg from './package.json';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/index.js',
	output: [
		{
			file: pkg.module,
			format: 'es',
			globals: {
				'XMLHttpRequest': 'XMLHttpRequest',
				'date-fns/formatDistanceStrict': 'formatDistanceStrict',
				'date-fns/format': 'format',
				'axios': 'axios',
				'remark-parse': 'markdown',
				'unist-util-is/convert': 'convert$1',
				'unified': 'unified',
			},
			inlineDynamicImports: true,
		},
		{
			file: pkg.main,
			format: 'umd',
			name: pkg.name,
			globals: {
				'XMLHttpRequest': 'XMLHttpRequest',
				'date-fns/formatDistanceStrict': 'formatDistanceStrict',
				'date-fns/format': 'format',
				'axios': 'axios',
				'remark-parse': 'markdown',
				'unist-util-is/convert': 'convert$1',
				'unified': 'unified',
			},
			inlineDynamicImports: true,
		},
	],
	context: 'this',
	external: ['XMLHttpRequest', 'axios', 'unified', 'remark-parse', 'date-fns/format', 'date-fns/formatDistanceStrict', 'unist-util-is/convert'],
	plugins: [
		svelte({
			preprocess: sveltePreprocess({
				sourceMap: !production,
				sass: {
					includePaths: ['src', 'node_modules'],
				}
			}),
			emitCss: false,
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production,
				generate: "ssr",
				preserveWhitespace: true,
			},
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		json(),
		commonjs(),
		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
