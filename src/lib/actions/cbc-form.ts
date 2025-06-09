import type { Actions } from '@sveltejs/kit';

export const create = {
	createDeliberation: async ({ request, cookies }) => {
		const formData = await request.formData();

		// API stuff
		console.log('form submit received by action');

		cookies.set('cbc-content-cache', Date.now().toString(), { path: '/', httpOnly: false });
		return { success: true };
	}
} satisfies Actions;
