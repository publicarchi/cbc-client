export const load = ({ cookies, isDataRequest }) => {
	const initalRequest = !isDataRequest;

	const cache = initalRequest ? +new Date() : cookies.get('cbc-content-cache');
	if (initalRequest && cache) {
		cookies.set('cbc-content-cache', cache, { path: '/', httpOnly: false });
	} else {
		console.log('cookies have not been set on initialRequest');
	}
	return {
		cacheBust: cache
	};
};
