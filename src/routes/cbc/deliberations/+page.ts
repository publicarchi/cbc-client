import type { LoadEvent } from '@sveltejs/kit';
import type { CbcResponse } from '$lib/types/types';
import { getCurrentCookieValue } from '$lib/utils/cache';

export const load = async ({
	fetch,
	parent,
	url,
	setHeaders
}: LoadEvent) => {
	const parentData = await parent();
	console.log(parentData);
	const cacheBust =
		getCurrentCookieValue('cbc-content-cache') || parentData.cacheBust;

	const response = await fetch(
		'/api/deliberations' + url.search + '?cache=' + cacheBust
	);
	const data = (await response.json()) as CbcResponse;
	return {
		...data
	};
};
