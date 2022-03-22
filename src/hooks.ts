/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	// if (!event.url.pathname.includes('callback')) {
	// 	const response = await resolve(event);
	// 	return response;
	// }

	console.log('[ + ] url in hooks', event.url.pathname);
	console.log('[ + ] event from hooks', event);

	// code here happends before the endpoint or page is called
	// event.locals.user = eve;
	console.log('[ + ] user from handle locals', event.locals);

	const response = await resolve(event);
	return response;
}

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession(event) {
	return {
		user: event.locals.user
	};
}
