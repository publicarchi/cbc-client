import { BASEX_URI } from '$env/static/private';
import { type RequestHandler, json } from '@sveltejs/kit';
import { MAX_AGE } from '$lib/utils/cache';

export const GET: RequestHandler = async ({ setHeaders, params }) => {
    const response = await fetch(BASEX_URI + '/deliberations/' + params.id);
    const data = await response.json();

    setHeaders({
        'cache-control': 'max-age=' + MAX_AGE
    });

    return json(data);
};
