export async function get(): Promise<{
	status: number;
	headers: { location: string };
}> {
	// https://blog.hyper.io/sveltekit-authentication/

	console.log('this is login endpoint !');

	const ghAuthURL = 'https://github.com/login/oauth/authorize';
	const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
	const sessionId = '1234'; // getSessionID()

	return {
		status: 302,
		headers: {
			location: `${ghAuthURL}?client_id=${clientId}&state=${sessionId}`
		}
	};
}
