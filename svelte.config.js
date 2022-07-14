import path from 'path'
import preprocess from 'svelte-preprocess'
import { mdsvex } from 'mdsvex'

import { optimizeImports } from 'carbon-preprocess-svelte'

import adapter from '@sveltejs/adapter-auto'
// import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	extensions: ['.svelte', '.md', '.svx'],
	preprocess: [
		mdsvex({
			extensions: ['.md']
		}),
		preprocess(),
		optimizeImports()
		// elements()
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
					$helpers: path.resolve('./src/lib/helpers'),
					$stores: path.resolve('./src/stores')
				}
			}
		}
	}
}

export default config
