const tokenURL = 'https://github.com/login/oauth/access_token'

const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID
const secret = import.meta.env.VITE_GITHUB_CLIENT_SECRET
const userURL = 'https://api.github.com/user'

export async function get(event): Promise<{ status: number; headers: { location: string } }> {
	// console.log('\n[ + ] Callback', event);
	const code = event.url.searchParams.get('code')
	const accessToken = await getAccessToken(code)
	const user = await getUser(accessToken)

	// console.log('code:', code);
	// console.log('accessToken:', accessToken);
	// console.log('user:', user);

	// this mutates the locals object on the request
	// and will be read by the hooks/handle function
	// after the resolve
	event.locals.user = {
		name: user.name,
		login: user.login,
		id: user.id,
		provider: 'github'
	}

	return {
		status: 302,
		headers: {
			location: '/'
		}
	}
}

function getAccessToken(code) {
	return fetch(tokenURL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
		body: JSON.stringify({
			client_id: clientId,
			client_secret: secret,
			code
		})
	})
		.then((r) => r.json())
		.then((r) => {
			// console.log('\n[ + ] getAccesToken json response', r);
			return r.access_token
		})
}

function getUser(accessToken) {
	return fetch(userURL, {
		headers: {
			Accept: 'application/json',
			Authorization: `Bearer ${accessToken}`
		}
	}).then((r) => r.json())
}
