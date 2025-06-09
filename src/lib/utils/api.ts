export const get: { [name: string]: () => Promise<Response> } = {
	files: () => fetch('/api/files'),
	deliberations: () => fetch('/api/deliberations'),
	meetings: () => fetch('/api/meetings'),
	buildings: () => fetch('/api/buildings')
};

export const apiProxy = new Proxy(get, {});
