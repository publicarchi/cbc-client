/** @type {import('@sveltejs/kit').RequestHandler} */
export async function deliberation({ params }) {
	const { slug } = params;
	const response = await fetch('https://localhost:8984/deliberations/' + slug);
  	return await response.json();
};

