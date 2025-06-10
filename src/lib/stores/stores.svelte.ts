import { page } from '$app/state';

let routeStrMap: { [name: string]: string } = {
	'': 'Accueil',
	insitution: "L'institution",
	base: 'Base',
	fiche: 'Fiche',
	a: 'A',
	b: 'B'
};

export function getPrettyRoute() {
	const prettyRouteItems = $derived.by(() => {
		const splitted = [...new Set(page.url.pathname.split('/'))];
		const res = splitted.map((v, i) => {
			const h = splitted.slice(0, i + 1).join('/');
			return {
				item: v in routeStrMap ? routeStrMap[v] : v,
				href: h === '' ? '/' : h
			};
		});
		return res;
	});
	return prettyRouteItems;
}
