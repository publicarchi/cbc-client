export const load = async ({ params, fetch }) => {
	const response = await fetch('/api/deliberations/' + params.id);
	const data = await response.json();
	return { ...data };
};
