import cookie from 'cookie'

export async function handle({ event, resolve }) {
	if (!event.url.pathname.includes('callback')) {
		const response = await resolve(event)
		return response
	}

	const cookies = cookie.parse(event.request.headers.cookie || '')

	console.log('\nGoing in hooks.ts')
	console.log('request in hooks', event.url.pathname, '\n')

	// code here happends before the endpoint or page is called
	event.request.locals.user = cookies.user
	console.log({ user: event.request.locals.user })

	const response = await resolve(event)

	// code here happens after the endpoint or page is called
	response.headers['set-cookie'] = `user=${event.request.locals.user || ''}; Path=/; HttpOnly`

	return response
}

export async function getSession(event) {
	return {
		user: event.locals.user
	}
}
