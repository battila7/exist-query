import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

export default [
	{
		input: 'src/index.js',
		output: {
			file: pkg.browser,
			format: 'umd'
		},
		name: 'exist-query',
		plugins: [
			resolve(),
			commonjs()
		]
	},
	{
		input: 'src/index.js',
		external: ['axios'],
		output: [
			{ 
                file: pkg.main, 
                format: 'cjs'
            },
			{ 
                file: pkg.module,
                format: 'es'
            }
		]
	}
];
