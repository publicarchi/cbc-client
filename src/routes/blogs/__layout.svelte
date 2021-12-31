<script context="module" lang="ts">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch }) {
		const post = await fetch(`${page.path}.json`).then((res: Response) => res.json());
		if (!post || !post.published) {
			return {
				status: 404,
				error: new Error('Post could not be found')
			};
		}
		return {
			props: {
				post
			}
		};
	}
</script>

<slot />
