import type { Request } from '@sveltejs/kit';

// https://blog.hyper.io/sveltekit-authentication/

const ghAuthURL = 'https://github.com/login/oauth/authorize';
const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;

export async function get(): Promise<{ status: number; headers: { location: string } }> {
	console.log('login getting in');
	const sessionId = '1234';
	return {
		status: 302,
		headers: {
			location: `${ghAuthURL}?client_id=${clientId}&state=${sessionId}`
		}
	};
}
