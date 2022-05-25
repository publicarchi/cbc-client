import path from 'path';
import preprocess from 'svelte-preprocess';
// import { sveltePreprocess } from 'svelte-preprocess/dist/autoProcess';

import { mdsvex } from 'mdsvex';

import { optimizeImports, elements } from 'carbon-preprocess-svelte';

import adapter from '@sveltejs/adapter-auto';
// import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	extensions: ['.svelte', '.md'],
	preprocess: [
		preprocess(),
		mdsvex({
			extensions: ['.md'],
			layout: './src/routes/_markdown_layout.svelte'
		}),
		optimizeImports(),
		elements()

		// Auto-preprocess mode - no need for specifying standlone SCSS preprocesors, etc.
		// https://github.com/sveltejs/svelte-preprocess/blob/main/docs/preprocessing.md#auto-preprocessing
		// sveltePreprocess()

		// Standalone preprocessors go here for customized configurations.
		// https://github.com/sveltejs/svelte-preprocess/blob/main/docs/preprocessing.md#stand-alone-processors
		// scss(),
	],

	kit: {
		adapter: adapter(),

		// This is the node adapter
		//adapter: node(),

		vite: {
			resolve: {
				alias: {
					$posts: path.resolve('./src/posts'),
					$components: path.resolve('./src/components'),
					$stores: path.resolve('./src/stores')
				}
			}
		}
	}
};

export default config;
