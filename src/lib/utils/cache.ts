// https://css-tricks.com/caching-data-in-sveltekit/

export const MAX_AGE = 600;

export function getCookieLookup() {
	if (typeof document !== 'object') {
		return {};
	}

	return document.cookie.split('; ').reduce((lookup: { [name: string]: string }, v) => {
		const parts = v.split('=');
		lookup[parts[0]] = parts[1];

		return lookup;
	}, {});
}

export const getCurrentCookieValue = (name: string) => {
	const cookies = getCookieLookup();
	return cookies[name] ?? '';
};
