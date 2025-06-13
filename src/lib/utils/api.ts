export const get: {
	[name: string]: (params: string) => Promise<Response>;
} = {
	files: (params: string) => fetch('/api/files' + params),
	deliberations: (params: string) => fetch('/api/deliberations' + params),
	meetings: (params: string) => fetch('/api/meetings' + params),
	buildings: (params: string) => fetch('/api/buildings' + params)
};
