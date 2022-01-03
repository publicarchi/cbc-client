import path from 'path';
import preprocess from 'svelte-preprocess';
// import { sveltePreprocess } from 'svelte-preprocess/dist/autoProcess';

import { mdsvex } from 'mdsvex';

import { optimizeImports } from 'carbon-preprocess-svelte';
import { elements } from "carbon-preprocess-svelte";
import { icons } from "carbon-preprocess-svelte";
import { pictograms } from "carbon-preprocess-svelte";

import adapter from '@sveltejs/adapter-auto';
// import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	extensions: ['.svelte', '.md'],
	preprocess: [
		mdsvex({
      extensions: ['.md']
    }),
		optimizeImports(), elements(), icons(), pictograms(),
		// Auto-preprocess mode - no need for specifying standlone SCSS preprocesors, etc.
		// https://github.com/sveltejs/svelte-preprocess/blob/main/docs/preprocessing.md#auto-preprocessing
		// sveltePreprocess()
		preprocess({
 			scss: {
				// We can use a path relative to the root because svelte-preprocess automatically adds
				// it to `includePaths` if none is defined.
				// This allows us to use the variables in our components - don't turn on unless really need it
				// prependData: `@import 'src/styles/_variables.scss';`,

				// Docs say renderSync is faster for Dart Sass which I am using
				// https://github.com/sveltejs/svelte-preprocess/blob/main/docs/preprocessing.md#scss-sass
				renderSync: true,

				// Dart Sass recognizes 'expanded' and 'compressed'
				outputStyle: 'expanded',

				prependData: `@import './src/app.scss';`
			}
		})
		// Standalone preprocessors go here for customized configurations.
		// https://github.com/sveltejs/svelte-preprocess/blob/main/docs/preprocessing.md#stand-alone-processors
		// scss(),
	],

	kit: {
		adapter: adapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		// This is the node adapter
		//adapter: node(),

		vite: {
		 	resolve: {
		 		alias: {
		 			// $carbone: path.resolve('./node_modules/carbon-components-svelte/css')
				  $posts: path.resolve('./src/posts')
		 		}
		 	}
		}
	}
};

export default config;