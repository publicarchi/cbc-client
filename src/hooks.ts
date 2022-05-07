import cookie from 'cookie'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	if (!event.url.pathname.includes('callback')) {
		const response = await resolve(event)
		return response
	}

	// console.log('[ + ] url in hooks', event.url.pathname);
	// console.log('[ + ] event from hooks', event);

	const response = await resolve(event)

	// console.log('[ + ] event from hooks (after resolve)', event.locals.user);
	if (event.locals.user) {
		response.headers.set(
			'set-cookie',
			cookie.serialize('user', JSON.stringify(event.locals.user), {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 3600
			})
		)
	}
	// console.log('[ + ] headers after resolve', response.headers);
	return response
}

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession(event) {
	// console.log('[ + ] headers from getSession', event.request.headers);
	// console.log('[ + ] event.locals from getSession', event.locals);
	return event?.locals?.user
		? {
				user: {
					email: event.locals.user.email
				}
		  }
		: {}
}
