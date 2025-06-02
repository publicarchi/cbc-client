import { BASEX_URI } from '$env/static/private';
import { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const response = await fetch(BASEX_URI + '/files' + url.search);
	const data = await response.json();

	return new Response(JSON.stringify(data), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
